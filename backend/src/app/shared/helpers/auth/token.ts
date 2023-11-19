import { jwtTypes } from '../../../types/exporter';

export function checkKey(authHeader: jwtTypes.authorization): boolean {
  return Object.prototype.hasOwnProperty.call(authHeader, 'authorization');
}

export function checkNull(authHeader: string | null): boolean {
  return authHeader === null;
}
