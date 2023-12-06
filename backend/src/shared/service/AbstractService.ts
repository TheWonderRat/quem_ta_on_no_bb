
import { ServiceRequestTypes, ServiceResponseTypes } from "src/types/services/service";


export default abstract class AbstractService<ServiceRequestTypes, ServiceResponseTypes>{

  public abstract execute(parameters: ServiceRequestTypes): ServiceResponseTypes;
}
