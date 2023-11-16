import { authorization } from '../../../types/exporter';

export function checkKey(authHeader: authorization): boolean {
  return Object.prototype.hasOwnProperty.call(authHeader, 'authorization');
}

export function checkNull(authHeader: string | null): boolean {
  return authHeader === null;
}
