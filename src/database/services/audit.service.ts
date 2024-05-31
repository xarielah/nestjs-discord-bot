import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { CalcService } from 'src/cache/calc.service';
import { CalcByHourDocument } from 'src/cache/calc.types';
import { DaysCacheService } from 'src/cache/days-cache.service';
import { DayParam } from 'src/data-api/data-api.controller';
import { Audit } from '../schemas/audit.schema';
import { AuditDocument, AuditPayload } from '../types/audit.types';

@Injectable()
export class AuditService {
  private _data = [];
  private logger = new Logger('AuditService');
  constructor(
    private readonly calcService: CalcService,
    private readonly cacheService: CacheService,
    private readonly daysCacheService: DaysCacheService,
  ) {}
  /**
   * Gets the numbers of players queried, and saves the data into the database.
   * @param {AuditPayload} payload
   */
  public async addNew(payload: AuditPayload): Promise<AuditDocument> {
    const audit = new Audit({ players: payload.players, time: payload.time });
    await audit.save();
    this.logger.debug(`New audit ${audit._id.toString()} record added.`);
    return audit;
  }

  /**
   * Return all audits in the database.
   * @returns audit documents
   */
  private async getAll(): Promise<AuditDocument[]> {
    return Audit.find({}).select({ _id: 0, __v: 0 }).exec();
  }

  /**
   * Fetches all the records and caches it in the memory.
   */
  public async fetchAll(): Promise<any[]> {
    const arr = await this.getAll();
    this._data = arr;
    return arr;
  }

  /**
   * Get all cached records.
   * @returns an array of objects
   */
  public getData<T>(): T[] {
    return this._data;
  }

  /**
   * Returns the average number of players for each hour of the day.
   * If the data is already cached, it will return the cached data, otherwise it recalculates the data.
   * @returns an array of CalcByHourDocument
   */
  public async getAverageByHour(): Promise<any> {
    const cachedData = this.cacheService.getData<CalcByHourDocument>();
    if (cachedData.length > 0)
      return this.cacheService.toObject<CalcByHourDocument>();
    await this.fetchAll();
    this.calcService.calcAvgByHourAndCache(this._data);
    return this.cacheService.toObject<CalcByHourDocument>();
  }

  public async getDataByDay(day: DayParam) {
    const mappedDay = this.mapDays(day);
    const cachedData =
      this.daysCacheService.toObject<CalcByHourDocument>(mappedDay);
    // If the data is already cached, return it
    if (cachedData && cachedData.data) return cachedData;
    // Fetch all records
    const all = await this.fetchAll();
    // Calculate the average by day and cache it
    this.calcService.calcAvgByDayAndCache(all);
    // Retry to fetch cache
    return this.daysCacheService.toObject<CalcByHourDocument>(mappedDay);
  }

  private mapDays(value: string): number {
    switch (value) {
      case 'monday':
        return 1;
      case 'tuesday':
        return 2;
      case 'wednesday':
        return 3;
      case 'thursday':
        return 4;
      case 'friday':
        return 5;
      case 'saturday':
        return 6;
      case 'sunday':
        return 0;
      default:
        return 0;
    }
  }
}
