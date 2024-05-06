import { Injectable } from '@nestjs/common';
import { DataResponse } from './cache.types';

@Injectable()
export class CacheService {
  private _data: any[] = [];
  private _startDate: any = '';
  private _endDate: any = '';

  public getData<T>(): T[] {
    return this._data;
  }

  public setData<T>(data: T[]): void {
    this._data = data;
  }

  public getStartDate(): Date {
    return this._startDate;
  }

  public setStartDate(startDate: string | number): void {
    this._startDate = new Date(startDate).toISOString(); // Avoid aliasing
  }

  public getEndDate(): string {
    return this._endDate;
  }

  public setEndDate(endDate: string | number): void {
    this._endDate = new Date(endDate).toISOString(); // Avoid aliasing
  }

  public toObject<T>(): DataResponse<T> {
    return {
      data: this._data,
      startDate: this._startDate,
      endDate: this._endDate,
    };
  }
}
