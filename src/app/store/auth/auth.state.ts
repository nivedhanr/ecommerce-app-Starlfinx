import { AuthUser } from "../../models/auth-user.model";
  
  export interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
  }
  
  export const initialAuthState: AuthState = {
    user: null,
    loading: false,
    error: null
  };