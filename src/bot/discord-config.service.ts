import { DiscordModuleOption } from '@discord-nestjs/core';
import { RegisterCommandOptions } from '@discord-nestjs/core/dist/definitions/interfaces/register-command-options';
import { Injectable } from '@nestjs/common';
import {
  ClientOptions,
  GatewayIntentBits,
  WebhookClientData,
} from 'discord.js';

@Injectable()
export class DiscordConfigService implements DiscordModuleOption {
  token: string;
  discordClientOptions: ClientOptions;
  registerCommandOptions?: RegisterCommandOptions[];
  webhook?: WebhookClientData;
  autoLogin?: boolean;
  failOnLogin?: boolean;
  shutdownOnAppDestroy?: boolean;
  isTrowForbiddenException?: boolean;
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: process.env.DISCORD_BOT_TOKEN || '',
      discordClientOptions: {
        intents: [GatewayIntentBits.Guilds],
      },
    };
  }
}
