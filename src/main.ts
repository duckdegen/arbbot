import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { claimAbi } from './claim.abi';
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  const targetBlockNumber = parseInt(process.env.TARGET_BLOCK, 10);
  const erc20TokenAddress = process.env.ARB_TOKEN_ADDRESS;
  const ownAddress = process.env.OWN_ADDRES;
  const ownPrivateKey = process.env.OWN_PRIVKEY;
  const compromisedAddress = process.env.COMPROMISED_ADDRESS;
  const compromisedPrivateKey = process.env.COMPROMISED_KEY;
  const contractAddress = process.env.CLAIM_CONTRACT_ADDRESS;

  const value = 0.0011; // Eth to send for gas

  await appService.waitForL1Block(
    targetBlockNumber,
    erc20TokenAddress,
    ownPrivateKey,
    ownAddress,
    compromisedPrivateKey,
    compromisedAddress,
    value,
    contractAddress,
    claimAbi,
  );
}

bootstrap();
