// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../TevraBot.sol";
import "../MockERC20.sol";

contract TevraBotTest is Test {
    TevraBot public tevraBot;
    MockERC20 public mockUSDC;
    MockERC20 public mockUSDT;
    
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);
    address public recipient = address(0x4);

    function setUp() public {
        vm.startPrank(owner);
        
        // Deploy contracts
        tevraBot = new TevraBot();
        mockUSDC = new MockERC20("USD Coin", "USDC", 6, 1000000);
        mockUSDT = new MockERC20("Tether USD", "USDT", 6, 1000000);

        // Add supported tokens
        tevraBot.addSupportedToken(address(mockUSDC), 1 * 1e8); // USDC at $1
        tevraBot.addSupportedToken(address(mockUSDT), 1 * 1e8); // USDT at $1

        vm.stopPrank();

        // Give users some tokens
        mockUSDC.mint(user1, 10000 * 10**6); // 10k USDC
        mockUSDC.mint(user2, 10000 * 10**6); // 10k USDC
        mockUSDT.mint(user1, 10000 * 10**6); // 10k USDT
        mockUSDT.mint(user2, 10000 * 10**6); // 10k USDT

        // Give users some ETH
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
        vm.deal(address(tevraBot), 100 ether); // Fund contract
    }

    function testCreateTopupRule() public {
        vm.startPrank(user1);
        
        // Create a top-up rule
        tevraBot.createRule(
            true, // isTopup
            address(0), // ETH
            recipient,
            1 ether, // amount
            0.1 ether, // threshold
            5 ether, // maxBalance
            86400, // daily schedule
            1800 * 1e8, // minPrice
            2200 * 1e8 // maxPrice
        );

        // Check rule was created
        assertEq(tevraBot.getUserRuleCount(user1), 1);
        
        TevraBot.AutomationRule memory rule = tevraBot.getUserRule(user1, 0);
        assertTrue(rule.isTopup);
        assertTrue(rule.isActive);
        assertEq(rule.token, address(0));
        assertEq(rule.recipient, recipient);
        assertEq(rule.amount, 1 ether);
        assertEq(rule.threshold, 0.1 ether);
        assertEq(rule.maxBalance, 5 ether);
        assertEq(rule.schedule, 86400);
        
        // Check user is registered
        assertTrue(tevraBot.isUserRegistered(user1));
        
        vm.stopPrank();
    }

    function testCreateWithdrawRule() public {
        vm.startPrank(user2);
        
        // Create a withdraw rule
        tevraBot.createRule(
            false, // isTopup (withdraw)
            address(mockUSDC),
            recipient,
            1000 * 10**6, // 1000 USDC
            500 * 10**6, // 500 USDC threshold
            2000 * 10**6, // 2000 USDC max balance
            604800, // weekly schedule
            0.95 * 1e8, // minPrice
            1.05 * 1e8 // maxPrice
        );

        // Check rule was created
        assertEq(tevraBot.getUserRuleCount(user2), 1);
        
        TevraBot.AutomationRule memory rule = tevraBot.getUserRule(user2, 0);
        assertFalse(rule.isTopup);
        assertTrue(rule.isActive);
        assertEq(rule.token, address(mockUSDC));
        assertEq(rule.recipient, recipient);
        assertEq(rule.amount, 1000 * 10**6);
        
        vm.stopPrank();
    }

    function testUpdateRule() public {
        vm.startPrank(user1);
        
        // Create a rule
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Update rule status
        tevraBot.updateRule(0, false);
        
        TevraBot.AutomationRule memory rule = tevraBot.getUserRule(user1, 0);
        assertFalse(rule.isActive);
        
        vm.stopPrank();
    }

    function testDeleteRule() public {
        vm.startPrank(user1);
        
        // Create a rule
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Delete rule
        tevraBot.deleteRule(0);
        
        // Check rule was deleted
        assertEq(tevraBot.getUserRuleCount(user1), 0);
        
        vm.stopPrank();
    }

    function testAutoTopupExecution() public {
        vm.startPrank(user1);
        
        // Create a top-up rule
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Fast forward time to trigger execution
        vm.warp(block.timestamp + 86400 + 1);

        // Execute auto top-up
        bool success = tevraBot.autoTopup(0, 1 ether);
        assertTrue(success);
        
        // Check recipient received ETH
        assertEq(recipient.balance, 1 ether);
        
        vm.stopPrank();
    }

    function testAutoWithdrawExecution() public {
        vm.startPrank(user2);
        
        // Create a withdraw rule
        tevraBot.createRule(
            false,
            address(mockUSDC),
            recipient,
            1000 * 10**6,
            500 * 10**6,
            2000 * 10**6,
            604800,
            0.95 * 1e8,
            1.05 * 1e8
        );

        // Fund the contract with USDC
        mockUSDC.transfer(address(tevraBot), 5000 * 10**6);

        // Fast forward time to trigger execution
        vm.warp(block.timestamp + 604800 + 1);

        // Execute auto withdraw
        bool success = tevraBot.autoWithdraw(0, 1000 * 10**6);
        assertTrue(success);
        
        // Check recipient received USDC
        assertEq(mockUSDC.balanceOf(recipient), 1000 * 10**6);
        
        vm.stopPrank();
    }

    function testPriceConditions() public {
        vm.startPrank(user1);
        
        // Create a rule with specific price conditions
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1900 * 1e8, // minPrice $1900
            2100 * 1e8  // maxPrice $2100
        );

        // Fast forward time
        vm.warp(block.timestamp + 86400 + 1);

        // Execution should succeed (ETH price is $2000, within range)
        bool success = tevraBot.autoTopup(0, 1 ether);
        assertTrue(success);
        
        vm.stopPrank();
    }

    function testPriceConditionsFail() public {
        vm.startPrank(owner);
        
        // Update ETH price to be outside range
        tevraBot.updateTokenPrice(address(0), 1800 * 1e8); // $1800 (below min)
        
        vm.stopPrank();
        
        vm.startPrank(user1);
        
        // Create a rule with specific price conditions
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1900 * 1e8, // minPrice $1900
            2100 * 1e8  // maxPrice $2100
        );

        // Fast forward time
        vm.warp(block.timestamp + 86400 + 1);

        // Execution should fail due to price conditions
        vm.expectRevert("Price conditions not met");
        tevraBot.autoTopup(0, 1 ether);
        
        vm.stopPrank();
    }

    function testCheckUpkeep() public {
        vm.startPrank(user1);
        
        // Create a rule
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Initially, upkeep should not be needed
        (bool upkeepNeeded,) = tevraBot.checkUpkeep("");
        assertFalse(upkeepNeeded);

        // Fast forward time
        vm.warp(block.timestamp + 86400 + 1);

        // Now upkeep should be needed
        (upkeepNeeded,) = tevraBot.checkUpkeep("");
        assertTrue(upkeepNeeded);
        
        vm.stopPrank();
    }

    function testPerformUpkeep() public {
        vm.startPrank(user1);
        
        // Create a rule
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        vm.stopPrank();

        // Fast forward time
        vm.warp(block.timestamp + 86400 + 1);

        // Get perform data
        (, bytes memory performData) = tevraBot.checkUpkeep("");

        // Perform upkeep
        tevraBot.performUpkeep(performData);

        // Check recipient received ETH
        assertEq(recipient.balance, 1 ether);
    }

    function testMultipleUsers() public {
        vm.startPrank(user1);
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );
        vm.stopPrank();

        vm.startPrank(user2);
        tevraBot.createRule(
            false,
            address(mockUSDC),
            recipient,
            1000 * 10**6,
            500 * 10**6,
            2000 * 10**6,
            604800,
            0.95 * 1e8,
            1.05 * 1e8
        );
        vm.stopPrank();

        // Check both users are registered
        assertTrue(tevraBot.isUserRegistered(user1));
        assertTrue(tevraBot.isUserRegistered(user2));
        assertEq(tevraBot.getTotalUsers(), 2);
        assertEq(tevraBot.getUserRuleCount(user1), 1);
        assertEq(tevraBot.getUserRuleCount(user2), 1);
    }

    function testInvalidRuleCreation() public {
        vm.startPrank(user1);

        // Test invalid recipient
        vm.expectRevert("Invalid recipient");
        tevraBot.createRule(
            true,
            address(0),
            address(0),
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Test zero amount
        vm.expectRevert("Amount must be positive");
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            0,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Test invalid schedule
        vm.expectRevert("Schedule must be at least 1 hour");
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            3600, // exactly 1 hour should fail
            1800 * 1e8,
            2200 * 1e8
        );

        // Test unsupported token
        vm.expectRevert("Token not supported");
        tevraBot.createRule(
            true,
            address(0x123), // unsupported token
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        vm.stopPrank();
    }

    function testRuleExecutionFailures() public {
        vm.startPrank(user1);
        
        // Create a rule
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Test execution before schedule
        vm.expectRevert("Not time to execute");
        tevraBot.autoTopup(0, 1 ether);

        // Fast forward time
        vm.warp(block.timestamp + 86400 + 1);

        // Test execution of wrong rule type
        vm.expectRevert("Not a top-up rule");
        tevraBot.autoWithdraw(0, 1 ether);

        // Update rule to inactive
        tevraBot.updateRule(0, false);

        // Test execution of inactive rule
        vm.expectRevert("Rule is not active");
        tevraBot.autoTopup(0, 1 ether);

        vm.stopPrank();
    }

    function testDepositAndWithdraw() public {
        // Test ETH deposit
        vm.startPrank(user1);
        tevraBot.depositETH{value: 5 ether}();
        assertEq(address(tevraBot).balance, 105 ether); // 100 + 5
        
        vm.stopPrank();

        // Test token deposit
        vm.startPrank(user1);
        mockUSDC.approve(address(tevraBot), 1000 * 10**6);
        tevraBot.depositToken(address(mockUSDC), 1000 * 10**6);
        assertEq(mockUSDC.balanceOf(address(tevraBot)), 1000 * 10**6);
        
        vm.stopPrank();

        // Test owner withdrawals
        vm.startPrank(owner);
        uint256 ownerBalance = owner.balance;
        tevraBot.withdrawETH(5 ether);
        assertEq(owner.balance, ownerBalance + 5 ether);
        
        tevraBot.withdrawToken(address(mockUSDC), 1000 * 10**6);
        assertEq(mockUSDC.balanceOf(owner), 1000 * 10**6);
        
        vm.stopPrank();
    }

    function testOnlyOwnerFunctions() public {
        vm.startPrank(user1);

        // Test addSupportedToken
        vm.expectRevert();
        tevraBot.addSupportedToken(address(mockUSDC), 1 * 1e8);

        // Test updateTokenPrice
        vm.expectRevert();
        tevraBot.updateTokenPrice(address(0), 3000 * 1e8);

        // Test withdrawETH
        vm.expectRevert();
        tevraBot.withdrawETH(1 ether);

        // Test withdrawToken
        vm.expectRevert();
        tevraBot.withdrawToken(address(mockUSDC), 1000 * 10**6);

        vm.stopPrank();
    }

    function testEvents() public {
        vm.startPrank(user1);

        // Test RuleCreated event
        vm.expectEmit(true, true, false, true);
        emit TevraBot.RuleCreated(
            user1,
            0,
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );
        tevraBot.createRule(
            true,
            address(0),
            recipient,
            1 ether,
            0.1 ether,
            5 ether,
            86400,
            1800 * 1e8,
            2200 * 1e8
        );

        // Test RuleUpdated event
        vm.expectEmit(true, true, false, true);
        emit TevraBot.RuleUpdated(user1, 0, false);
        tevraBot.updateRule(0, false);

        // Test RuleDeleted event
        vm.expectEmit(true, true, false, false);
        emit TevraBot.RuleDeleted(user1, 0);
        tevraBot.deleteRule(0);

        vm.stopPrank();
    }
}