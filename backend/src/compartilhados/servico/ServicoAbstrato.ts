
import { ServiceRequestTypes, ServiceResponseTypes } from "../../tipos/servicos/servico";


export default abstract class ServicoAbstrato< 
  ServiceRequestType extends ServiceRequestTypes, 
  ServiceResponseType extends ServiceResponseTypes 
>{

  public abstract executar(parameters: ServiceRequestType): Promise<ServiceResponseType>;
}
