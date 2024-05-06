import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { BotCommandsModule } from './commands/bot-commands.module';

@Module({
  imports: [DiscordModule.forFeature(), BotCommandsModule],
  providers: [BotGateway],
})
export class BotModule {}
