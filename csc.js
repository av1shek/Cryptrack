const rpcUrl = "https://testnet-rpc.coinex.net/";
// const MyContract = {};
const address = "0x6d0575DEb29a270cB648F93E81FB667a56CADe84";
const abi = [
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

const init2 = async () => {
  const web3 = new Web3(rpcUrl);
//   const networkId = await web3.eth.net.getId();
    const networkId = 53;
  const myContract = new web3.eth.Contract(
    abi,
    address
  );
  web3.eth.accounts.wallet.add(process.env.metamask_private_key);

  const tx = myContract.methods.getPrevHash('a');
  const gas = await tx.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const txData = {
    from: address,
    to: myContract.options.address,
    data: data,
    gas,
    gasPrice,
    nonce 
    // chain: 'rinkeby', 
    // hardfork: 'istanbul'
  };

  console.log(`Old data value: ${await myContract.methods.data().call()}`);
  const receipt = await web3.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`New data value: ${await myContract.methods.data().call()}`);
}