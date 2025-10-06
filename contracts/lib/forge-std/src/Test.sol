// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.2 <0.9.0;

import "forge-std/console.sol";
import "forge-std/console2.sol";
import "forge-std/StdAssertions.sol";
import "forge-std/StdCheats.sol";
import "forge-std/StdError.sol";
import "forge-std/StdJson.sol";
import "forge-std/StdMath.sol";
import "forge-std/StdStorage.sol";
import "forge-std/StdUtils.sol";
import "forge-std/Vm.sol";

abstract contract Test is StdAssertions, StdCheats, StdUtils {
    Vm private constant vm = Vm(address(bytes20(uint160(uint256(keccak256("hevm cheat code"))))));
}
