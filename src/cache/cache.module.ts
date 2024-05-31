import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CalcService } from './calc.service';
import { DaysCacheService } from './days-cache.service';

@Module({
  providers: [CacheService, CalcService, DaysCacheService],
  exports: [CacheService, CalcService],
})
export class CacheModule {}
