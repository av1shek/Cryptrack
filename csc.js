const Web3 = require('Web3');
const rpcUrl = "https://testnet-rpc.coinex.net/";
// const MyContract = {};
const privateKey = "-- add your private key here --";
const myAddress = "-- add your wallet address here --";
const contractAddress = "0x20d4518558c51D9D7CC2A27c634ACa3dEC1dbAc5";
const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "addTimestamp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newIpfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prevIpfsHash",
				"type": "string"
			}
		],
		"name": "updateTimestamp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "s",
				"type": "string"
			}
		],
		"name": "getPrevHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "trackAsset",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


const web3 = new Web3(rpcUrl);
web3.eth.accounts.wallet.add(privateKey);
const myContract = new web3.eth.Contract(abi,contractAddress);

const addTimestamp = async (ipfsHash) => {
	console.log("Creating transaction...");

  	const tx = myContract.methods.addTimestamp(ipfsHash);
 	const gas = await tx.estimateGas({from: myAddress});
	const gasPrice = await web3.eth.getGasPrice();
	const data = tx.encodeABI();
	const nonce = await web3.eth.getTransactionCount(myAddress);

	const txData = {
		from: myAddress,
		to: contractAddress,
		data: data,
		gas,
		gasPrice,
		nonce 
	};

  console.log(`Old data value: ${await myContract.methods.getPrevHash(ipfsHash).call()}`);
  const receipt = await web3.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`New data value: ${await myContract.methods.getPrevHash(ipfsHash).call()}`);
}

addTimestamp('g');
