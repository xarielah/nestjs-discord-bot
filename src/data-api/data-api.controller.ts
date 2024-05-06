import { Controller, Get } from '@nestjs/common';
import { DataApiService } from './data-api.service';

@Controller('api/data')
export class DataApiController {
  constructor(private readonly dataApiService: DataApiService) {}

  @Get('hourly')
  public async getDataByHour() {
    return await this.dataApiService.getHourlyData();
  }
}
