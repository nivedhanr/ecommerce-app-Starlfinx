import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth/auth.selectors';
import { selectUser } from '../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  loading = signal(false);

  error = signal('');

  ngOnInit(): void {
    this.store.select(selectAuthLoading).subscribe((loading) => {
      this.loading.set(loading);
    });

    this.store.select(selectAuthError).subscribe((error) => {
      this.error.set(error ?? '');
    });

    this.store.select(selectUser).subscribe((user) => {
      if (user) {
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.store.dispatch(
      AuthActions.login({
        username: username ?? '',
        password: password ?? '',
      }),
    );
  }
}
