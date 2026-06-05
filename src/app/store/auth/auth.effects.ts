import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, timer } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),

      switchMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((user) => {
            localStorage.setItem('user', JSON.stringify(user));

            return AuthActions.loginSuccess({
              user,
            });
          }),

          catchError((error) =>
            of(
              AuthActions.loginFailure({
                // error: error.message,
                error: 'Invalid username or password',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  autoLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),

      switchMap(() => {
        console.log('Auto logout timer started');

        return timer(50000).pipe(
          map(() => {
            console.log('Auto Logout Triggered');

            localStorage.removeItem('user');

            return AuthActions.logout();
          }),
        );
      }),
    ),
  );
}
