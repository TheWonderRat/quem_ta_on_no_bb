// Types
import { User } from '../migrations/User';

type UserPosition = {
  globalPosition: number,
  pcdPosition?: number,
  pppPosition?: number,
};

export type NewUserRecord = Pick<User, 'pcd' | 'ppp' | 'name'
| 'registry' | 'passwordHash' | 'backupRegister'> & UserPosition;

export type NewUserRequest = Omit<NewUserRecord, 'passwordHash'>;

export type NewUserId = { id: string };
