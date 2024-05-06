import { Command, Handler } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { RoleplayService } from 'src/roleplay/roleplay.service';

@Command({
  name: 'players',
  description: 'Reply with the current players count on Eclipse RP.',
})
@Injectable()
export class PlayersCommand {
  constructor(private readonly roleplayService: RoleplayService) {}
  @Handler()
  async onPlayers() {
    const sd = await this.roleplayService.getServerDetails();
    return `There are **${sd.players}** players in EclipeRP.`;
  }
}
