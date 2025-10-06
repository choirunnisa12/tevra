// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../TevraBot.sol";
import "../MockERC20.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TevraBot contract
        TevraBot tevraBot = new TevraBot();
        
        // Deploy mock tokens for testing
        MockERC20 mockUSDC = new MockERC20("USD Coin", "USDC", 6, 1000000); // 1M USDC
        MockERC20 mockUSDT = new MockERC20("Tether USD", "USDT", 6, 1000000); // 1M USDT

        // Add supported tokens
        tevraBot.addSupportedToken(address(0), 2000 * 1e8); // ETH at $2000
        tevraBot.addSupportedToken(address(mockUSDC), 1 * 1e8); // USDC at $1
        tevraBot.addSupportedToken(address(mockUSDT), 1 * 1e8); // USDT at $1

        vm.stopBroadcast();

        // Log deployed addresses
        console.log("TevraBot deployed at:", address(tevraBot));
        console.log("MockUSDC deployed at:", address(mockUSDC));
        console.log("MockUSDT deployed at:", address(mockUSDT));
    }
}
