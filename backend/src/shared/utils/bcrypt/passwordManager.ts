// library for hashing and comparing passwords
import bcrypt from 'bcrypt';

// SSOT
import { bcryptConfig } from '../../../SSOT/exporter';

export default class PasswordManager {
  public static async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, bcryptConfig.BCRYPT_SALT_ROUNDS);
  }

  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
