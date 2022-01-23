import axios from 'axios';
import { Formatter } from '../Formatter';
import { Installable } from '../shared/types';
import { post as postURL } from '../shared/url';

export class Board {
  apiKey: string;
  apiSecret: string;
  subscriptionId: string;
  Installable?: Installable;
  constructor(
    apiKey: string,
    apiSecret: string,
    subscriptionId: string,
    Installable?: Installable,
  ) {
    //TODO Check for installable and all that jazz here
    this.Installable = Installable;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.subscriptionId = subscriptionId;
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
