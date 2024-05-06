import { Global, Module } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { CalcService } from 'src/cache/calc.service';
import { AuditService } from './services/audit.service';

@Global()
@Module({
  providers: [AuditService, CalcService, CacheService],
  exports: [AuditService],
})
export class DatabaseModule {}
