import { Module } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { DataApiController } from './data-api.controller';
import { DataApiService } from './data-api.service';

@Module({
  controllers: [DataApiController],
  providers: [DataApiService, CacheService],
})
export class DataApiModule {}
