const Web3 = require('web3');

let web3;
let accounts;
let contract = "0xef8eed5e1024cd3d121e5d99f808376ddecd57a1";

const init = async () => {
  // Load web3 instance
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    alert('No web3 instance detected. Please install Metamask!');
    return;
  }

  // Load accounts
  accounts = await web3.eth.getAccounts();

  // Load smart contract
  const networkId = await web3.eth.net.getId();
  const networkData = BettingDapp.networks[networkId];
  if (!networkData) {
    alert('Smart contract not deployed to detected network.');
    return;
  }
  contract = new web3.eth.Contract(BettingDapp.abi, networkData.address);
};

const handlePlaceBet = async () => {
  const betAmount = document.getElementById('amount').value;
  const outcome = document.getElementById('outcome').value;
  const result = await contract.methods.placeBet(outcome).send({ value: betAmount, from: accounts[0] });
  console.log(result);
};

const handleWithdraw = async () => {
  const result = await contract.methods.withdraw().send({ from: accounts[0] });
  console.log(result);
};

const handleSetBetAmount = async () => {
  const betAmount = document.getElementById('amount').value;
  const result = await contract.methods.setBetAmount(betAmount).send({ from: accounts[0] });
  console.log(result);
};

const handleGetBetOutcome = async () => {
  const result = await contract.methods.getBetOutcome(accounts[0]).call();
  console.log(result);
};

const handleGetTotalBets = async () => {
  const result = await contract.methods.getTotalBets().call();
  console.log(result);
};

init();

// Add event listeners to buttons
document.getElementById('place-bet').addEventListener('click', handlePlaceBet);
document.getElementById('withdraw').addEventListener('click', handleWithdraw);
document.getElementById('set-bet-amount').addEventListener('click', handleSetBetAmount);
document.getElementById('get-bet-outcome').addEventListener('click', handleGetBetOutcome);
document.getElementById('get-total-bets').addEventListener('click', handleGetTotalBets);
