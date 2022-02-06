import vestaboard from '../src/index';
import { expect } from 'chai';

describe('Installable class', (): void => {
  it('instantiates a new class', (): void => {
    const installable = new vestaboard.Installable('key', 'secret', false);
    expect(installable.apiKey).to.equal('key');
    expect(installable.apiSecret).to.equal('secret');
  });
});
