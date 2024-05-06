import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BotModule } from './bot/bot.module';
import { DiscordConfigService } from './bot/discord-config.service';
import { CronModule } from './cron/cron.module';
import { DataApiModule } from './data-api/data-api.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    CronModule,
    DatabaseModule,
    DataApiModule,
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
    BotModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
