import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  isAuthenticated = signal(false);

  ngOnInit(): void {
    this.store.select(selectIsAuthenticated).subscribe((isAuth) => {
      this.isAuthenticated.set(isAuth);
    });
  }

  logout(): void {
    localStorage.removeItem('user');

    this.store.dispatch(AuthActions.logout());

    this.router.navigate(['/login']);
  }
}
