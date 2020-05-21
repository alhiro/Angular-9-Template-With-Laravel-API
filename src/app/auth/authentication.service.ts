import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private _http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */  
  login(context: LoginContext): Observable<any> {
    return this._http
      .post('/auth/login', {
        email: context.email,
        password: context.password
      })
      .pipe(
        map(response => {
          const result = response as any;
          const data = {
            email: context.email,
            token: result.token
          };
          this.credentialsService.setCredentials(data, context.remember);
          console.log('data', data);
          return of(data);
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  /**
   * Provides a base for get token that used header CRUD.
   */
  private initAuthHeaders(): HttpHeaders {
    const token = this.credentialsService.getCredentials();
    if (token === null) {
      this.logout();
    }

    const getToken = token.token;
    const headers = new HttpHeaders({ Authorization: getToken });
    // const headers: HttpHeaders = new HttpHeaders();
    // headers.append('Authorization', 'Bearer ' + token);
    // headers.append('Content-Type', 'application/json');
    return headers;
  }

  /**
   * Provides a base for CRUD.
   */
  authGet(url: string) {
    const headers = this.initAuthHeaders();
    return this._http.get(url, { headers }).pipe(map(response => response));
  }

  authPost(url: string, body: any): any {
    const headers = this.initAuthHeaders();
    return this._http.post(url, body, { headers }).pipe(map(response => response));
  }

  authPut(url: string, body: any): any {
    const headers = this.initAuthHeaders();
    return this._http.put(url, body, { headers }).pipe(map(response => response));
  }

  authDelete(url: string): any {
    const headers = this.initAuthHeaders();
    return this._http.delete(url, { headers }).pipe(map(response => response));
  }
}
