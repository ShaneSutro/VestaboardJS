import vestaboard from '../src/index';
import { expect } from 'chai';

describe('Board class', (): void => {
  it('instantiates a new class', (): void => {
    const board = new vestaboard.Board('key', 'secret', 'subId');
    expect(board.apiKey).to.equal('key');
    expect(board.apiSecret).to.equal('secret');
    expect(board.subscriptionId).to.equal('subId');
  });
});
