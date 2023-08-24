// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is Ownable, ERC20 {
    constructor() ERC20("Tether USD", "USDT") {}

    function mint(uint256 _amount, address _to) public {
        _mint(_to, _amount * (10 ** uint256(decimals())));
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
