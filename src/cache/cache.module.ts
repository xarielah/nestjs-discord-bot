import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CalcService } from './calc.service';

@Module({
  providers: [CacheService, CalcService],
  exports: [CacheService, CalcService],
})
export class CacheModule {}
