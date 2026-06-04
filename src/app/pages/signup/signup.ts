import { Component, inject  } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = false;
  successMessage = '';
  errorMessage = '';

  signupForm = this.fb.group(
    {
      name: [
        '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password =
      control.get('password')?.value;

    const confirmPassword =
      control.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : {
        passwordMismatch: true
      };

  }

  onSubmit(): void {

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const formValue =
      this.signupForm.getRawValue();

      const signupPayload = {
        firstName: formValue.name ?? '',
        password: formValue.password ?? ''
      };

    this.authService
      .signup(signupPayload)
      .subscribe({

        next: (response) => {

          console.log(
            'Signup Success',
            response
          );

          this.loading = false;

          this.successMessage =
            'Account created successfully';

          setTimeout(() => {

            this.router.navigate(
              ['/login']
            );

          }, 1500);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            'Signup failed';

        }

      });

  }

  // ngOnDestroy(): void {
  //   console.log('Signup Destroyed');
  // }

}