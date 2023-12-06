import { ListRequest, ListResponse } from "./list";
import { LoginRequest, LoginResponse} from "./login";
import { UserRequest, UserResponse } from "./user";

export type ServiceRequestTypes = ListRequest | LoginRequest | UserRequest; 
export type ServiceResponseTypes = ListResponse | LoginResponse | UserResponse; 
