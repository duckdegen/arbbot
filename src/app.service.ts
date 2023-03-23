// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@nestjs/common';
import { ArbitrumService } from './arbitrum/arbitrum.service';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AppService {
  constructor(private readonly arbitrumService: ArbitrumService) {}

  async waitForL1Block(
    targetBlockNumber: number,
    erc20TokenAddress: string,
    ownPrivateKey: string,
    ownAddress: string,
    compromisedPrivateKey: string,
    compromisedAddress: string,
    value: number,
    contractAddress: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contractAbi: any[],
  ): Promise<void> {
    let active = false;

    // const safeWalletNonce = this.arbitrumService.getWalletNonce(ownAddress);
    const compromisedWalletNonce = await this.arbitrumService.getWalletNonce(
      compromisedAddress,
    );

    const claimValue = await this.arbitrumService.getClaimAmount(
      compromisedAddress,
    );
    console.log('Claim value:', claimValue);

    setInterval(async () => {
      const currentBlockNumber =
        await this.arbitrumService.getCurrentBlockNumber();

      const gasPrice = await this.arbitrumService.getGasPrice();
      if (currentBlockNumber >= targetBlockNumber) {
        if (active) {
          return;
        }
        if (!active) {
          active = true;
        }
        console.log('Target block reached! Executing transactions...');

        console.log('signing tokens from own wallet to compromised wallet');
        // Step 1: Send tokens from own address to the compromised address
        const signedSendEthTx = await this.arbitrumService.executeTransaction(
          ownPrivateKey,
          compromisedAddress,
          value,
          gasPrice,
        );
        console.log('signed tokens from own wallet to compromised wallet.');
        // Step 2: Execute the .claim method using the compromised private key

        console.log('signing claim on compromised wallet');
        const signedClaimTx = await this.arbitrumService.executeContractMethod(
          compromisedPrivateKey,
          contractAddress,
          contractAbi,
          'claim',
          gasPrice,
          compromisedWalletNonce,
        );
        console.log('signed claim on compromised wallet');

        // Step 3: Send ERC20 tokens back to the first address using the compromised private key
        console.log('signing transfer $ARB back to own wallet');
        const signedTransferArbTx =
          await this.arbitrumService.transferERC20Token(
            compromisedPrivateKey,
            erc20TokenAddress,
            ownAddress,
            claimValue,
            gasPrice,
            compromisedWalletNonce + 1,
          );

        console.log(`signed transfer $arb to origin wallet`);

        console.log('All transactions signed.');

        const receipts = await this.arbitrumService.sendTransactions([
          signedSendEthTx,
          signedClaimTx,
          signedTransferArbTx,
        ]);
        console.log('All transactions sent.');

        console.log('sending second set of transactions');

        const secondSignedClaimTx =
          await this.arbitrumService.executeContractMethod(
            compromisedPrivateKey,
            contractAddress,
            contractAbi,
            'claim',
            gasPrice,
            compromisedWalletNonce + 2,
          );
        console.log('signed claim on compromised wallet');

        // Step 3: Send ERC20 tokens back to the first address using the compromised private key
        console.log('signing transfer $ARB back to own wallet');
        const secondSignedTransferArbTx =
          await this.arbitrumService.transferERC20Token(
            compromisedPrivateKey,
            erc20TokenAddress,
            ownAddress,
            claimValue,
            gasPrice,
            compromisedWalletNonce + 3,
          );

        const thirdSignedClaimTx =
          await this.arbitrumService.executeContractMethod(
            compromisedPrivateKey,
            contractAddress,
            contractAbi,
            'claim',
            gasPrice,
            compromisedWalletNonce + 4,
          );
        console.log('signed claim on compromised wallet');

        // Step 3: Send ERC20 tokens back to the first address using the compromised private key
        console.log('signing transfer $ARB back to own wallet');
        const thirdSignedTransferArbTx =
          await this.arbitrumService.transferERC20Token(
            compromisedPrivateKey,
            erc20TokenAddress,
            ownAddress,
            claimValue,
            gasPrice,
            compromisedWalletNonce + 5,
          );

        const fourthSignedClaimTx =
          await this.arbitrumService.executeContractMethod(
            compromisedPrivateKey,
            contractAddress,
            contractAbi,
            'claim',
            gasPrice,
            compromisedWalletNonce + 6,
          );
        console.log('signed claim on compromised wallet');

        // Step 3: Send ERC20 tokens back to the first address using the compromised private key
        console.log('signing transfer $ARB back to own wallet');
        const fourthSignedTransferArbTx =
          await this.arbitrumService.transferERC20Token(
            compromisedPrivateKey,
            erc20TokenAddress,
            ownAddress,
            claimValue,
            gasPrice,
            compromisedWalletNonce + 7,
          );

        const secondBatchReceipts = await this.arbitrumService.sendTransactions(
          [
            secondSignedClaimTx,
            secondSignedTransferArbTx,
            thirdSignedClaimTx,
            thirdSignedTransferArbTx,
            fourthSignedClaimTx,
            fourthSignedTransferArbTx,
          ],
        );
        console.log('All second batch of transactions sent.');

        receipts.map((receipt) => {
          console.log('Receipt:', receipt);
        });

        secondBatchReceipts.map((receipt) => {
          console.log('Receipt:', receipt);
        });

        process.exit(0);
      } else {
        console.log('Current block:', currentBlockNumber);
      }
    }, 200);
  }
}
