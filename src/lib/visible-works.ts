import { accountsEnabled } from './account-settings';
// Before the staged migration is enabled, keep the existing read queries unchanged.
export function visibleWorks<T extends { is(column: string, value: null): T }>(query: T): T {
  return accountsEnabled() ? query.is('deleted_at', null) : query;
}
