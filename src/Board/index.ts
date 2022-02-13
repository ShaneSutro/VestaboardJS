import axios from 'axios';
import { Formatter } from '../Formatter';
import { Installable as InstallableConstructor } from '../Installable/index';
import { post as postURL } from '../shared/url';

export class Board {
  apiKey?: string;
  apiSecret?: string;
  subscriptionId?: string;
  Installable?: InstallableConstructor;
  constructor(
    apiKey?: string,
    apiSecret?: string,
    subscriptionId?: string,
    Installable?: InstallableConstructor,
  ) {
    //TODO Check for installable and all that jazz here
    // 1. Check for key/secret
    // 2. if key/secret, check for subId
    // 3. if all three, good to go
    this.Installable = Installable;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.subscriptionId = subscriptionId;

    if (!this.Installable) {
      // Check for missing parameters
      this.Installable = new InstallableConstructor(this.apiKey, this.apiSecret);
      if (!this.apiKey || !this.apiSecret || !this.subscriptionId) {
        // Create a new installable, which will check for saved creds
      }
      this.apiKey = this.Installable?.apiKey;
    }
  }

  post(message: string): void {
    const data = new Formatter()._standard(message);
    const url = postURL(this.subscriptionId);
    const options = {
      method: 'POST',
      url,
      headers: {
        'X-Vestaboard-Api-Key': this.apiKey,
        'X-Vestaboard-Api-Secret': this.apiSecret,
      },
      data,
    } as const;

    console.log('options:', options);
    axios(options)
      .then((res) => console.log('Response:', res))
      .catch((err) => console.error('Error sending post:', err));
  }
}
