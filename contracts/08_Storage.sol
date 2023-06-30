// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

struct AppStorage {
    uint a;
    uint b;
    uint8 c;
    uint8 d;
    address ContractA;
}

// HACK: workaround on storage issues
// Now our AppStorage is always placed in the exact same spot as long as we make this storage call 
// Now if you have any inheritance (e.g. ERC-721) contract that specifies their own data you will not step over them because you are no longer using slot zero, you are using a consistent slot

library Storage {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("my-storage-location");

    function get() internal pure returns (AppStorage storage s) {
        bytes32 k = DIAMOND_STORAGE_POSITION;
        assembly {
            s.slot := k
        }
    }
}
