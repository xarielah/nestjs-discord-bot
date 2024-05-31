import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';
import { DataResponse } from './cache.types';

@Injectable()
export class DaysCacheService {
  private _data: { [key: number]: any[] } = {};
  constructor(private readonly cacheService: CacheService) {}

  public getDataByDay<T>(day: number): T[] {
    return this._data[day];
  }

  public setDayData<T>(data: T[], day: number): void {
    this._data[day] = data;
  }

  public toObject<T>(day: number): DataResponse<T> {
    return {
      data: this._data[day],
      startDate: this.cacheService.getStartDate(),
      endDate: this.cacheService.getEndDate(),
    };
  }
}
