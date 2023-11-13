import { authorization } from '../../../types/exporter';

export function checkKey(authHeader: authorization) {
  return Object.prototype.hasOwnProperty.call(authHeader, 'authorization');
}

export function checkNull(authHeader: string | null) {
  return authHeader === null;
}
