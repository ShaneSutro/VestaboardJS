import axios from 'axios';
import { subscription } from '../shared/url';
import * as fs from 'fs';
import * as path from 'path';

export type InstallableClass = {
  apiKey: string;
  apiSecret: string;
  getSubscription: boolean;
  saveCredentials: boolean;
};

export class Installable {
  apiKey: string;
  apiSecret: string;
  subId?: string;
  getSubscription?: boolean;
  saveCredentials?: boolean;
  constructor(apiKey: string, apiSecret: string, getSubscription = true, saveCredentials = true) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    // getSubscription && this.requestSubscription();
  }

  async requestSubscription(): Promise<string> {
    if (!this.apiKey || !this.apiSecret) {
      throw new Error(
        'There are no keys set. Call Installable() with your installable API key and API secret.',
      );
    }
    const headers = {
      'X-Vestaboard-Api-Key': this.apiKey,
      'X-Vestaboard-Api-Secret': this.apiSecret,
    };
    const subId = await axios({
      method: 'GET',
      headers,
      url: subscription(),
    })
      .then((res) => {
        const allSubIds = res.data.subscriptions.map(
          (sub: { [key: string]: string; _id: string }) => sub._id,
        );
        console.info(`Subscription ID(s): ${allSubIds}`);
        return allSubIds;
      })
      .then((allSubIds) => {
        if (!allSubIds[0]) {
          throw new Error(
            'The API returned no subscription IDs. Did you remember to install your new application onto at least one board?',
          );
        }
        return allSubIds[0];
      })
      .catch((err) => `Error sending request: ${err}`);

    this.subId = subId;
    return subId;
  }
}
