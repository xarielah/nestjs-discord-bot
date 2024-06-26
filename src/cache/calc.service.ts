import { Injectable, Logger } from '@nestjs/common';
import { AuditDocument } from 'src/database/types/audit.types';
import { CacheService } from './cache.service';
import { CalcByHourDocument } from './calc.types';
import { DaysCacheService } from './days-cache.service';

@Injectable()
export class CalcService {
  private logger = new Logger('CalcService');
  constructor(
    private readonly cacheService: CacheService,
    private readonly daysCacheService: DaysCacheService,
  ) {}
  /**
   * Given an array of audit documents, return the average number of players.
   * @param {AuditDocument[]} data
   * @returns a 24 keyed object with the number of players for each hour of the day.
   */
  public averageByHour(data: AuditDocument[]): CalcByHourDocument[] {
    const averageByHour: CalcByHourDocument[] = [];
    for (let i = 0; i < 24; i++) {
      // Filter the data by the hour of the day.
      const players = data
        .filter((audit) => new Date(audit.time).getHours() === i)
        .map((audit) => audit.players);
      // Calculate the average number of players for each hour of the day.
      const average = players.reduce((a, b) => a + b, 0) / players.length;
      averageByHour.push({
        players: Math.ceil(average),
        hour: i.toString().length === 1 ? `0${i}:00` : `${i}:00`,
      });
    }
    return averageByHour;
  }
  public calcAvgByHourAndCache(data: AuditDocument[]): CalcByHourDocument[] {
    const averageByHour: CalcByHourDocument[] = this.averageByHour(data);
    this.cacheService.setData<CalcByHourDocument>(averageByHour);
    this.cacheService.setStartDate(data[0].time);
    this.cacheService.setEndDate(data[data.length - 1].time);
    this.logger.debug(`Cached average by hour data.`);
    return averageByHour;
  }
  public calcAvgByDayAndCache(data: AuditDocument[]): void {
    for (let i = 0; i < 7; i++) {
      const cachedData = this.daysCacheService.getDataByDay(i);
      if (!cachedData || new Date().getDay() === i) {
        const filteredData = data.filter(
          (audit) => new Date(audit.time).getDay() === i,
        );
        const avgCalc = this.calcAvgByHourAndCache(filteredData);
        this.daysCacheService.setDayData(avgCalc, i);
      }
    }
  }
}
