// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
error insufficientBalance();

contract Fyp {
    IERC20 usdt;

    address public immutable ownerAddress;
    event TransactionEvent(
        address indexed from,
        address indexed to,
        string dbId,
        uint256 timestamp,
        uint256 amount
    );
    uint256 public totalOrders;
    struct Order {
        uint256 timestamp;
        uint256 amount;
    }

    mapping(address => mapping(string => Order)) public customerOrders;

    constructor(address usdtAddress) {
        usdt = IERC20(usdtAddress);
        ownerAddress = msg.sender;
    }

    function addTransaction(string memory _id, uint256 _amount) external {
        if (usdt.balanceOf(msg.sender) < _amount) {
            revert insufficientBalance();
        } else {
            bool approveSuccess = usdt.approve(msg.sender, _amount);
            require(approveSuccess, "approval failed");
            bool success = usdt.transferFrom(msg.sender, ownerAddress, _amount);
            require(success, "Transfer failed ");
            customerOrders[msg.sender][_id] = Order({
                timestamp: block.timestamp,
                amount: _amount
            });
            totalOrders++;
            emit TransactionEvent(
                msg.sender,
                ownerAddress,
                _id,
                block.timestamp,
                _amount
            );
        }
    }

    function tokenBalance() public view returns (uint256) {
        return usdt.balanceOf(msg.sender);
    }
}
