import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CalcService } from 'src/cache/calc.service';
import { AuditService } from 'src/database/services/audit.service';
import { RoleplayService } from 'src/roleplay/roleplay.service';

@Injectable()
export class CronService {
  private logger = new Logger('CronService');
  constructor(
    private readonly roleplayService: RoleplayService,
    private readonly auditService: AuditService,
    private readonly calcService: CalcService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async handleCron() {
    this.logger.debug('=== Cron Job Started ===');
    try {
      const sd = await this.roleplayService.getServerDetails();
      const payload = {
        players: sd.players,
        time: Date.now(),
      };
      await this.auditService.addNew(payload);
      // This fetched all records from the database and caches it in the memory.
      const result = await this.auditService.fetchAll();
      // This calcs the average number of players for each hour of the day, and caches the result in memory.
      this.calcService.calcAvgByHourAndCache(result);
      this.logger.debug('=== End of Cron Job ===');
      this.logger.debug('');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
