export default abstract class AbstractService<ParameterType, ReturnType>{

  public abstract execute(parameters: ParameterType): ReturnType;
}
