export default class checkers {
  private static readonly zero: number = 0;
  private static readonly emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  private static readonly numberRegex: RegExp = /^\d+$/;

  public static checkKeys<T>(obj: T, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  public static isEmpty(value: string): boolean {
    return value.length === this.zero;
  }

  public static checkEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  public static checkOnlyNumbers(id: string): boolean {
    return this.numberRegex.test(id);
  }
}
