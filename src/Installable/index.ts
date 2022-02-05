import axios from 'axios';
import * as fs from 'fs';

export type InstallableClass = {
  apiKey: string;
  apiSecret: string;
  getSubscription: boolean;
  saveCredentials: boolean;
};

export class Installable {
  apiKey: string;
  apiSecret: string;
  getSubscription?: boolean;
  saveCredentials?: boolean;

  constructor(
    apiKey: string,
    apiSecret: string,
    getSubscription?: boolean,
    saveCredentials?: boolean,
  ) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  private checkGitIgnore(): void {
    console.log(__dirname);
    fs.readFileSync(__dirname);
  }
}
