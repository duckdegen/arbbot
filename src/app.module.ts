import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ArbitrumService } from './arbitrum/arbitrum.service';

@Module({
  imports: [],
  providers: [AppService, ArbitrumService],
})
export class AppModule {}
