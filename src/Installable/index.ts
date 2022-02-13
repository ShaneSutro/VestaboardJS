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
  saveCredentials: boolean;
  constructor(apiKey: string, apiSecret: string, saveCredentials = true) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.saveCredentials = saveCredentials;
    if (!this.apiKey || !this.apiSecret || !this.subId) {
      this.readCredentials();
    }
  }

  readCredentials() {
    try {
      const creds = fs.readFileSync(`${__dirname}/credentials.txt`, { encoding: 'utf-8' });
      const [apiKey, apiSecret, subId] = creds.split('\n');
      this.apiKey = apiKey;
      this.apiSecret = apiSecret;
      this.subId = subId;
    } catch (err) {
      console.log(`Error reading credentials: ${err}`);
    }
  }

  async requestSubscription(saveCredentials = true): Promise<string> {
    this.saveCredentials = saveCredentials;
    if (!this.apiKey || !this.apiSecret) {
      throw new Error(
        'There are no keys set and credentials file does not exist. Call Installable() with your installable API key and API secret.',
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
    if (this.subId === subId) {
      console.warn(
        'Successfully got your Subscription ID, but the subId returned from the Vestaboard API matches the one in your credentials file, making this .requestSubscription() call unnecessary. To avoid slowing down your application, call .requestSubscription() only when getting or updating your subscription ID.',
      );
    }
    this.subId = subId;
    if (this.saveCredentials) {
      fs.writeFileSync(
        `${__dirname}/credentials.txt`,
        `${this.apiKey}\n${this.apiSecret}\n${this.subId}`,
      );
    }
    return subId;
  }
}
