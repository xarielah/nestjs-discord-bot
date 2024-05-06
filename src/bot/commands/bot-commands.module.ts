import { Module } from '@nestjs/common';
import { RoleplayService } from 'src/roleplay/roleplay.service';
import { PlayersCommand } from './players.command';

@Module({
  providers: [PlayersCommand, RoleplayService],
})
export class BotCommandsModule {}
