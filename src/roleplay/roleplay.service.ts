import { Injectable } from '@nestjs/common';
import { type RageMpServer } from './roleplay.types';

@Injectable()
export class RoleplayService {
  private readonly _masterRageMp: string = 'https://cdn.rage.mp/master/';
  private readonly _roleplayServer: string = 'play.eclipse-rp.net:22005';

  /**
   * Fetching the current number of players in the roleplay server from RAGEMP JSON.
   * @returns the number of players in the roleplay server
   */
  public async getServerDetails(): Promise<RageMpServer> {
    const result = await fetch(this._masterRageMp).then((res) => res.json());
    return result[this._roleplayServer];
  }
}
