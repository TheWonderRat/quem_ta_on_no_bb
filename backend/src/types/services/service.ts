import { 
  ListRequest, ListResponse 
} from "./list";

import { 
  CreateSessionRequest , CreateSessionResponse
} from "./session";

import { 
  ActivateAccountRequest, ActivateAccountResponse,
  UpdatePasswordRequest, UpdatePasswordResponse
} from "./user";

export type ServiceRequestTypes = 
//list request types
  ListRequest | 
//user request types
  UpdatePasswordRequest | ActivateAccountRequest |
//session request types
  CreateSessionRequest;

export type ServiceResponseTypes = 
//list response types
  ListResponse |
//user response types
  UpdatePasswordResponse | ActivateAccountResponse |
//session response types
CreateSessionResponse;
