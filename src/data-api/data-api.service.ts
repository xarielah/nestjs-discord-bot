import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CalcByHourDocument } from 'src/cache/calc.types';
import { AuditService } from 'src/database/services/audit.service';
import { DataResponse } from '../cache/cache.types';

@Injectable()
export class DataApiService {
  constructor(private readonly auditService: AuditService) {}

  /**
   * Returns hourly avarage data of players.
   * @returns an array of CalcByHourDocument
   */
  public async getHourlyData(): Promise<DataResponse<CalcByHourDocument>> {
    try {
      return this.auditService.getAverageByHour();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
