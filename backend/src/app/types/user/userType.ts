export type UserRegister = {
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

export type UserRequest = {
  pcd: boolean,
  ppp: boolean,
  name: string,
  registry: number
};

export type UserSavedId = { id: string };
