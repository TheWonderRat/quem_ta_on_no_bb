
import { ServiceRequestTypes, ServiceResponseTypes } from "src/types/services/service";


export default abstract class AbstractService< ServiceRequestType extends ServiceRequestTypes, ServiceResponseType extends ServiceResponseTypes >{

  public abstract execute(parameters: ServiceRequestType): Promise<ServiceResponseType>;
}
