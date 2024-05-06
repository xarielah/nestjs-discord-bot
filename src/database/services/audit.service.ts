import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { CalcService } from 'src/cache/calc.service';
import { CalcByHourDocument } from 'src/cache/calc.types';
import { Audit } from '../schemas/audit.schema';
import { AuditDocument, AuditPayload } from '../types/audit.types';

@Injectable()
export class AuditService {
  private _data = [];
  constructor(
    private readonly calcService: CalcService,
    private readonly cacheService: CacheService,
  ) {}
  /**
   * Gets the numbers of players queried, and saves the data into the database.
   * @param {AuditPayload} payload
   */
  public async addNew(payload: AuditPayload): Promise<AuditDocument> {
    const audit = new Audit({ players: payload.players, time: payload.time });
    await audit.save();
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
}
