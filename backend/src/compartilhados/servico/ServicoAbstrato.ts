
import { ServiceRequestTypes, ServiceResponseTypes } from "src/types/services/service";


export default abstract class ServicoAbstrato< 
  ServiceRequestType extends ServiceRequestTypes, 
  ServiceResponseType extends ServiceResponseTypes 
>{

  public abstract executar(parameters: ServiceRequestType): Promise<ServiceResponseType>;
}
