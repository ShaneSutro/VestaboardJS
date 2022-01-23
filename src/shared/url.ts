export function post(subId: string): string {
  return `https://platform.vestaboard.com/subscriptions/${subId}/message`;
}

export function subscription(): string {
  return 'https://platform.vestaboard.com/subscriptions';
}
