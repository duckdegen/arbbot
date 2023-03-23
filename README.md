# NestJS Application for Retrieving Arbitrum Airdrop from Compromised Ethereum Wallets

This NestJS application provides a solution for retrieving Arbitrum airdrops from compromised Ethereum wallets. It utilizes the Ethereum blockchain and Web3 library to interact with smart contracts and execute transactions.

## Requirements

- Node.js version 12 or higher
- Safe Ethereum wallet with private key
- Compromised Ethereum wallet with private key
- Arbitrum airdrop contract address and ABI
- ERC20 token contract address and ABI
- RPC node URL

## Getting Started

1. Clone the repository
2. Install dependencies using `yarn install`
3. Update the environment variables in a `.env` file based on the provided `.env.example` file
4. Update the `main.ts` file with the appropriate values for the target block number, $ARB ERC20 token address, own Ethereum wallet address, and private keys for both the own and compromised wallets
5. Run the application using `yarn start`

## Using the arbitrumService

The `ethereum.service.ts` file provides methods for interacting with the Ethereum blockchain and executing transactions. These methods include:

- `getWeb3Instance()`: Returns the current Web3 instance
- `getCurrentBlockNumber()`: Returns the current block number on the Ethereum blockchain
- `executeTransaction()`: Executes a transaction on the Ethereum blockchain using a private key, to address, value, and gas price
- `getERC20TokenContract()`: Returns a contract instance for a given ERC20 token address
- `transferERC20Token()`: Transfers ERC20 tokens from one address to another using a private key, token address, to address, value, and gas price
- `executeContractMethod()`: Executes a method on a smart contract using a private key, contract address, ABI, method name, gas price, and optional method arguments
- `getGasPrice()`: Returns the current gas price on the Ethereum blockchain

## Contributing

Contributions to this project are welcome. Please create a pull request with your changes.

## License

This project is licensed under the MIT license. See the `LICENSE` file for more details.
