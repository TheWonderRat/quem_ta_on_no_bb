export default abstract class AppError<ErrorMessageType, ErrorCodeType>{
  public readonly message: ErrorMessageType;
  public readonly code: ErrorCodeType;

  constructor(
    message: ErrorMessageType,
    code: ErrorCodeType
  ){
    this.message = message;
    this.code = code
  }
}
