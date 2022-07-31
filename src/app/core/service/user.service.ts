import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../model/token';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginURL = 'http://localhost:8080/api/auth/signin';
  private registerURL = 'http://localhost:8080/api/auth/signup';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<Token> {
    return this.http.post<Token>(this.loginURL , user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerURL , user);
  }

}
