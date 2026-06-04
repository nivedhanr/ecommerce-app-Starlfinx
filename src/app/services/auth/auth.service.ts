import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../../models/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(username: string,password: string): Observable<AuthUser> {

    return this.http.post<AuthUser>(
      'https://dummyjson.com/auth/login',
      {
        username,
        password
      }
    );
  }

  signup(user: {
    firstName: string;
    password: string;
  }) {
  
    return this.http.post(
      'https://dummyjson.com/users/add',
      user
    );
  
  }
}