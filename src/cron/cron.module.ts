import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { CalcService } from 'src/cache/calc.service';
import { DaysCacheService } from 'src/cache/days-cache.service';
import { RoleplayService } from 'src/roleplay/roleplay.service';
import { CronService } from './cron.service';

@Module({
  imports: [CacheModule],
  providers: [CronService, RoleplayService, CalcService, DaysCacheService],
})
export class CronModule {}
