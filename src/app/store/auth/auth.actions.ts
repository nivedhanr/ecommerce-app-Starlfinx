import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../models/auth-user.model';

export const login = createAction(
  '[Auth] Login',
  props<{
    username: string;
    password: string;
  }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    user: AuthUser;
  }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{
    error: string;
  }>(),
);

export const logout = createAction('[Auth] Logout');

export const autoLogin = createAction(
  '[Auth] Auto Login',
  props<{
    user: any;
  }>(),
);
