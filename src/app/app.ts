import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('ecommerce-app');
  private store = inject(Store);

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    const user = JSON.parse(userData);
    console.log('Auto Login User:', user);
    this.store.dispatch(
      AuthActions.autoLogin({
        user,
      }),
    );
  }
}
