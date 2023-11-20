export type User = {
  id: string,
  pcd: boolean,
  ppp: boolean,
  name: string,
  registry: number
  passwordHash: string,
  email?: string,
  classId?: number,
  statusId?: number,
  jobLocationId?: number,
};

export type UserMigration = {
  id: string,
  pcd: boolean,
  ppp: boolean,
  name: string,
  registry: number
  passwordHash: string,
  email: string,
  classId: number,
  statusId: number,
  jobLocationId: number,
  createdAt: Date,
  updatedAt: Date,
};
