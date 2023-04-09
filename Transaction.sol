// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BettingDapp {
    address public owner;
    uint256 public betAmount;
    mapping(address => uint256) public bets;
    uint256 public totalBets;

    event NewBet(address indexed from, uint256 amount, uint256 outcome);

    constructor() {
        owner = msg.sender;
    }

    function placeBet(uint256 outcome) external payable {
        require(msg.value == betAmount, "Bet amount must be equal to betAmount.");
        require(outcome > 0 && outcome <= 6, "Outcome must be between 1 and 7.");
        
        bets[msg.sender] = outcome;
        totalBets += msg.value;

        emit NewBet(msg.sender, msg.value, outcome);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw.");
        payable(msg.sender).transfer(totalBets);
        totalBets = 0;
    }

    function setBetAmount(uint256 amount) external {
        require(msg.sender == owner, "Only the owner can set the bet amount.");
        betAmount = amount;
    }

    function getBetOutcome(address user) external view returns (uint256) {
        return bets[user];
    }

    function getTotalBets() external view returns (uint256) {
        return totalBets;
    }

}