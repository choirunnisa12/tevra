// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title KeeperCompatibleInterface
 * @dev Interface for Chainlink Keepers
 */
interface KeeperCompatibleInterface {
    function checkUpkeep(bytes calldata checkData) external view returns (bool upkeepNeeded, bytes memory performData);
    function performUpkeep(bytes calldata performData) external;
}

/**
 * @title TevraBot
 * @dev Smart contract for automated top-up and withdraw operations
 * @notice This contract handles automated token transfers based on user-defined rules
 */
contract TevraBot is ReentrancyGuard, Ownable, KeeperCompatibleInterface {
    
    // Events for frontend notifications
    event AutoTopupExecuted(
        address indexed user,
        address indexed token,
        address indexed recipient,
        uint256 amount,
        uint256 timestamp,
        bool success
    );
    
    event AutoWithdrawExecuted(
        address indexed user,
        address indexed token,
        address indexed recipient,
        uint256 amount,
        uint256 timestamp,
        bool success
    );
    
    event RuleCreated(
        address indexed user,
        uint256 indexed ruleId,
        bool isTopup,
        address token,
        address recipient,
        uint256 amount,
        uint256 threshold,
        uint256 maxBalance,
        uint256 schedule,
        uint256 minPrice,
        uint256 maxPrice
    );
    
    event RuleUpdated(
        address indexed user,
        uint256 indexed ruleId,
        bool isActive
    );
    
    event RuleDeleted(
        address indexed user,
        uint256 indexed ruleId
    );
    
    // Struct to store automation rules
    struct AutomationRule {
        bool isTopup;           // true for top-up, false for withdraw
        bool isActive;          // rule status
        address token;          // token contract address (address(0) for ETH)
        address recipient;      // recipient address
        uint256 amount;         // amount to transfer
        uint256 threshold;      // minimum balance threshold
        uint256 maxBalance;     // maximum balance limit
        uint256 schedule;       // schedule interval in seconds
        uint256 lastExecuted;   // last execution timestamp
        uint256 nextExecution;  // next execution timestamp
        uint256 minPrice;       // minimum token price (in USD * 1e8)
        uint256 maxPrice;       // maximum token price (in USD * 1e8)
    }
    
    // Mapping to store user rules
    mapping(address => mapping(uint256 => AutomationRule)) public userRules;
    mapping(address => uint256) public userRuleCount;
    
    // Array to track all users (for keeper iteration)
    address[] public allUsers;
    mapping(address => bool) public isUserRegistered;
    
    // Supported tokens (for price checking)
    mapping(address => bool) public supportedTokens;
    
    // Price oracle (simplified - in production use Chainlink oracles)
    mapping(address => uint256) public tokenPrices; // price in USD * 1e8
    
    // Constructor
    constructor() {
        // Initialize with common tokens
        supportedTokens[address(0)] = true; // ETH
        tokenPrices[address(0)] = 2000 * 1e8; // $2000 ETH (example)
    }
    
    /**
     * @dev Add or update supported token
     */
    function addSupportedToken(address token, uint256 price) external onlyOwner {
        supportedTokens[token] = true;
        tokenPrices[token] = price;
    }
    
    /**
     * @dev Update token price
     */
    function updateTokenPrice(address token, uint256 price) external onlyOwner {
        tokenPrices[token] = price;
    }
    
    /**
     * @dev Create a new automation rule
     */
    function createRule(
        bool isTopup,
        address token,
        address recipient,
        uint256 amount,
        uint256 threshold,
        uint256 maxBalance,
        uint256 schedule,
        uint256 minPrice,
        uint256 maxPrice
    ) external {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be positive");
        require(schedule >= 3600, "Schedule must be at least 1 hour");
        require(supportedTokens[token], "Token not supported");
        
        // Register user if not already registered
        if (!isUserRegistered[msg.sender]) {
            allUsers.push(msg.sender);
            isUserRegistered[msg.sender] = true;
        }
        
        uint256 ruleId = userRuleCount[msg.sender];
        
        userRules[msg.sender][ruleId] = AutomationRule({
            isTopup: isTopup,
            isActive: true,
            token: token,
            recipient: recipient,
            amount: amount,
            threshold: threshold,
            maxBalance: maxBalance,
            schedule: schedule,
            lastExecuted: 0,
            nextExecution: block.timestamp + schedule,
            minPrice: minPrice,
            maxPrice: maxPrice
        });
        
        userRuleCount[msg.sender]++;
        
        emit RuleCreated(
            msg.sender,
            ruleId,
            isTopup,
            token,
            recipient,
            amount,
            threshold,
            maxBalance,
            schedule,
            minPrice,
            maxPrice
        );
    }
    
    /**
     * @dev Update rule status
     */
    function updateRule(uint256 ruleId, bool isActive) external {
        require(ruleId < userRuleCount[msg.sender], "Rule does not exist");
        
        userRules[msg.sender][ruleId].isActive = isActive;
        
        emit RuleUpdated(msg.sender, ruleId, isActive);
    }
    
    /**
     * @dev Delete a rule
     */
    function deleteRule(uint256 ruleId) external {
        require(ruleId < userRuleCount[msg.sender], "Rule does not exist");
        
        delete userRules[msg.sender][ruleId];
        
        emit RuleDeleted(msg.sender, ruleId);
    }
    
    /**
     * @dev Execute auto top-up
     */
    function autoTopup(
        uint256 ruleId,
        uint256 amount
    ) external nonReentrant returns (bool) {
        AutomationRule storage rule = userRules[msg.sender][ruleId];
        require(rule.isActive, "Rule is not active");
        require(rule.isTopup, "Not a top-up rule");
        require(block.timestamp >= rule.nextExecution, "Not time to execute");
        
        bool success = false;
        
        try this._executeTopup(rule, amount) {
            success = true;
            rule.lastExecuted = block.timestamp;
            rule.nextExecution = block.timestamp + rule.schedule;
        } catch {
            success = false;
        }
        
        emit AutoTopupExecuted(
            msg.sender,
            rule.token,
            rule.recipient,
            amount,
            block.timestamp,
            success
        );
        
        return success;
    }
    
    /**
     * @dev Execute auto withdraw
     */
    function autoWithdraw(
        uint256 ruleId,
        uint256 amount
    ) external nonReentrant returns (bool) {
        AutomationRule storage rule = userRules[msg.sender][ruleId];
        require(rule.isActive, "Rule is not active");
        require(!rule.isTopup, "Not a withdraw rule");
        require(block.timestamp >= rule.nextExecution, "Not time to execute");
        
        bool success = false;
        
        try this._executeWithdraw(rule, amount) {
            success = true;
            rule.lastExecuted = block.timestamp;
            rule.nextExecution = block.timestamp + rule.schedule;
        } catch {
            success = false;
        }
        
        emit AutoWithdrawExecuted(
            msg.sender,
            rule.token,
            rule.recipient,
            amount,
            block.timestamp,
            success
        );
        
        return success;
    }
    
    /**
     * @dev Internal function to execute top-up
     */
    function _executeTopup(AutomationRule memory rule, uint256 amount) external {
        require(msg.sender == address(this), "Only internal calls");
        
        // Check price conditions
        uint256 currentPrice = tokenPrices[rule.token];
        require(currentPrice >= rule.minPrice && currentPrice <= rule.maxPrice, "Price conditions not met");
        
        if (rule.token == address(0)) {
            // ETH transfer
            require(address(this).balance >= amount, "Insufficient ETH balance");
            (bool success, ) = rule.recipient.call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            // ERC20 transfer
            IERC20 token = IERC20(rule.token);
            require(token.balanceOf(address(this)) >= amount, "Insufficient token balance");
            require(token.transfer(rule.recipient, amount), "Token transfer failed");
        }
    }
    
    /**
     * @dev Internal function to execute withdraw
     */
    function _executeWithdraw(AutomationRule memory rule, uint256 amount) external {
        require(msg.sender == address(this), "Only internal calls");
        
        // Check price conditions
        uint256 currentPrice = tokenPrices[rule.token];
        require(currentPrice >= rule.minPrice && currentPrice <= rule.maxPrice, "Price conditions not met");
        
        if (rule.token == address(0)) {
            // ETH transfer
            require(address(this).balance >= amount, "Insufficient ETH balance");
            (bool success, ) = rule.recipient.call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            // ERC20 transfer
            IERC20 token = IERC20(rule.token);
            require(token.balanceOf(address(this)) >= amount, "Insufficient token balance");
            require(token.transfer(rule.recipient, amount), "Token transfer failed");
        }
    }
    
    /**
     * @dev Check if upkeep is needed (for Chainlink Keepers)
     */
    function checkUpkeep(bytes calldata) external view returns (bool upkeepNeeded, bytes memory performData) {
        // Check if any user has rules that need execution
        for (uint256 i = 0; i < allUsers.length; i++) {
            address user = allUsers[i];
            uint256 ruleCount = userRuleCount[user];
            
            for (uint256 j = 0; j < ruleCount; j++) {
                AutomationRule memory rule = userRules[user][j];
                
                if (rule.isActive && 
                    block.timestamp >= rule.nextExecution &&
                    _shouldExecuteRule(rule)) {
                    
                    upkeepNeeded = true;
                    performData = abi.encode(user, j);
                    return (upkeepNeeded, performData);
                }
            }
        }
        
        return (false, "");
    }
    
    /**
     * @dev Perform upkeep (for Chainlink Keepers)
     */
    function performUpkeep(bytes calldata performData) external {
        (address user, uint256 ruleId) = abi.decode(performData, (address, uint256));
        AutomationRule storage rule = userRules[user][ruleId];
        
        if (rule.isActive && 
            block.timestamp >= rule.nextExecution &&
            _shouldExecuteRule(rule)) {
            
            if (rule.isTopup) {
                _executeTopupInternal(rule);
            } else {
                _executeWithdrawInternal(rule);
            }
            
            rule.lastExecuted = block.timestamp;
            rule.nextExecution = block.timestamp + rule.schedule;
        }
    }
    
    /**
     * @dev Check if rule should execute based on conditions
     */
    function _shouldExecuteRule(AutomationRule memory rule) internal view returns (bool) {
        // Check price conditions
        uint256 currentPrice = tokenPrices[rule.token];
        if (currentPrice < rule.minPrice || currentPrice > rule.maxPrice) {
            return false;
        }
        
        return true;
    }
    
    /**
     * @dev Internal function to execute top-up (for keepers)
     */
    function _executeTopupInternal(AutomationRule memory rule) internal {
        uint256 currentPrice = tokenPrices[rule.token];
        require(currentPrice >= rule.minPrice && currentPrice <= rule.maxPrice, "Price conditions not met");
        
        if (rule.token == address(0)) {
            require(address(this).balance >= rule.amount, "Insufficient ETH balance");
            (bool success, ) = rule.recipient.call{value: rule.amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20 token = IERC20(rule.token);
            require(token.balanceOf(address(this)) >= rule.amount, "Insufficient token balance");
            require(token.transfer(rule.recipient, rule.amount), "Token transfer failed");
        }
        
        emit AutoTopupExecuted(
            msg.sender,
            rule.token,
            rule.recipient,
            rule.amount,
            block.timestamp,
            true
        );
    }
    
    /**
     * @dev Internal function to execute withdraw (for keepers)
     */
    function _executeWithdrawInternal(AutomationRule memory rule) internal {
        uint256 currentPrice = tokenPrices[rule.token];
        require(currentPrice >= rule.minPrice && currentPrice <= rule.maxPrice, "Price conditions not met");
        
        if (rule.token == address(0)) {
            require(address(this).balance >= rule.amount, "Insufficient ETH balance");
            (bool success, ) = rule.recipient.call{value: rule.amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20 token = IERC20(rule.token);
            require(token.balanceOf(address(this)) >= rule.amount, "Insufficient token balance");
            require(token.transfer(rule.recipient, rule.amount), "Token transfer failed");
        }
        
        emit AutoWithdrawExecuted(
            msg.sender,
            rule.token,
            rule.recipient,
            rule.amount,
            block.timestamp,
            true
        );
    }
    
    /**
     * @dev Get user rule count
     */
    function getUserRuleCount(address user) external view returns (uint256) {
        return userRuleCount[user];
    }
    
    /**
     * @dev Get user rule details
     */
    function getUserRule(address user, uint256 ruleId) external view returns (AutomationRule memory) {
        require(ruleId < userRuleCount[user], "Rule does not exist");
        return userRules[user][ruleId];
    }
    
    /**
     * @dev Get total number of users
     */
    function getTotalUsers() external view returns (uint256) {
        return allUsers.length;
    }
    
    /**
     * @dev Deposit ETH to contract
     */
    function depositETH() external payable {
        // ETH is automatically deposited
    }
    
    /**
     * @dev Deposit ERC20 tokens to contract
     */
    function depositToken(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }
    
    /**
     * @dev Withdraw ETH from contract (owner only)
     */
    function withdrawETH(uint256 amount) external onlyOwner {
        payable(owner()).transfer(amount);
    }
    
    /**
     * @dev Withdraw ERC20 tokens from contract (owner only)
     */
    function withdrawToken(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
    
    // Receive ETH
    receive() external payable {}
}