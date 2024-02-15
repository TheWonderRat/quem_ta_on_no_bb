export const DEFAULT_SALT_ROUNDS: number = 8;
export const BCRYPT_SALT_ROUNDS: number = Number(process.env.BCRYPT_SALT_ROUNDS)
|| DEFAULT_SALT_ROUNDS;
