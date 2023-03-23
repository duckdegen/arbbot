// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { multicallAbi } from '../multicall.abi';
import { claimAbi } from '../claim.abi';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ArbitrumService {
  private web3: Web3;
  private multicallContract;
  private claimContract;

  constructor() {
    this.web3 = new Web3(process.env.RPC_NODE_URL);
    const typedMulticallAbi: AbiItem[] = multicallAbi;
    this.multicallContract = new this.web3.eth.Contract(
      typedMulticallAbi,
      '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2',
    );
    const typedClaimAbi: AbiItem[] = claimAbi;
    this.claimContract = new this.web3.eth.Contract(
      typedClaimAbi,
      '0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9',
    );
  }

  public getWeb3Instance(): Web3 {
    return this.web3;
  }

  async getCurrentBlockNumber(): Promise<number> {
    const blockNumberString = await this.multicallContract.methods
      .getL1BlockNumber()
      .call();
    return parseInt(blockNumberString, 10);
  }

  async getClaimAmount(wallet): Promise<number> {
    return await this.claimContract.methods.claimableTokens(wallet).call();
  }

  async getWalletNonce(wallet): Promise<number> {
    return await this.web3.eth.getTransactionCount(wallet);
  }

  async executeTransaction(
    privateKey: string,
    to: string,
    value: number,
    gasPrice: string,
  ): Promise<string> {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(account);
    const transaction = {
      from: account.address,
      to: to,
      value: this.web3.utils.toWei(value.toString(), 'ether'),
      chainId: 42161,
      gas: 2000000,
      gasPrice: gasPrice,
    };
    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transaction,
      privateKey,
    );
    return signedTransaction.rawTransaction;
  }

  async getERC20TokenContract(tokenAddress: string): Promise<Contract> {
    const abi: AbiItem[] = [
      // Minimal ERC20 ABI required for transfer
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: 'success', type: 'bool' }],
        type: 'function',
      },
    ];
    return new this.web3.eth.Contract(abi, tokenAddress);
  }

  async transferERC20Token(
    privateKey: string,
    tokenAddress: string,
    to: string,
    value: number,
    gasPrice: string,
    nonce: number,
  ): Promise<string> {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(account);
    const tokenContract = await this.getERC20TokenContract(tokenAddress);

    const transferData = tokenContract.methods
      .transfer(to, this.web3.utils.toWei(value.toString(), 'ether'))
      .encodeABI();

    const transaction = {
      from: account.address,
      to: tokenAddress,
      data: transferData,
      gas: 2000000,
      chainId: 42161,
      nonce: nonce,
      gasPrice: gasPrice,
    };

    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transaction,
      privateKey,
    );
    return signedTransaction.rawTransaction;
  }

  async executeContractMethod(
    privateKey: string,
    contractAddress: string,
    contractAbi: AbiItem[],
    methodName: string,
    gasPrice: string,
    nonce: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methodArgs: any[] = [],
  ): Promise<string> {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(account);
    const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
    const methodData = contract.methods[methodName](...methodArgs).encodeABI();

    const transaction = {
      from: account.address,
      to: contractAddress,
      data: methodData,
      chainId: 42161,
      gas: 2000000, // Adjust the gas limit based on the method complexity
      gasPrice: gasPrice,
      nonce: nonce,
    };

    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transaction,
      privateKey,
    );
    return signedTransaction.rawTransaction;
  }

  async getGasPrice(): Promise<string> {
    return await this.web3.eth.getGasPrice();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async sendTransactions(rawTransactions: string[]): Promise<any[]> {
    const transactionPromises = rawTransactions.map((rawTransaction) => {
      console.log(rawTransaction);
      return this.web3.eth.sendSignedTransaction(rawTransaction).catch((e) => {
        console.log(e);
      });
    });

    return await Promise.all(transactionPromises);
  }
}
