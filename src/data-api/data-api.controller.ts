import { Controller, Get, Param } from '@nestjs/common';
import { DataApiService } from './data-api.service';

@Controller('api/data')
export class DataApiController {
  constructor(private readonly dataApiService: DataApiService) {}

  @Get('hourly')
  public async getDataByHour() {
    return await this.dataApiService.getHourlyData();
  }
  @Get('/:day')
  public async getDataByDay(@Param('day') day: DayParam) {
    return await this.dataApiService.getDataByDay(day);
  }
}

export type DayParam =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
