import { Global, Module } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { CalcService } from 'src/cache/calc.service';
import { DaysCacheService } from 'src/cache/days-cache.service';
import { AuditService } from './services/audit.service';

@Global()
@Module({
  providers: [AuditService, CalcService, CacheService, DaysCacheService],
  exports: [AuditService],
})
export class DatabaseModule {}
