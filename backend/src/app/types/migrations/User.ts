export type UserMigration = {
  id: string,
  pcd: boolean,
  ppp: boolean,
  name: string,
  registry: number
  passwordHash: string,
  backupRegister: boolean,
  email?: string,
  classId?: number,
  statusId?: number,
  jobLocationId?: number,
  createdAt: Date,
  updatedAt: Date,
};

export type User = Omit<UserMigration, 'createdAt' | 'updatedAt'>;
