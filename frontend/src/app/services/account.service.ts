import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../objects/User';

@Injectable()
export class AccountService {
  private accountUrl = '/api/user';
  private headers = new Headers({ 'Content-Type' : 'application/json' });

  constructor(private http: Http) { }

  getUser(id: number): Promise<User> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  putUser(user: User): Promise<User> {
    const url = `${this.accountUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), { headers : this.headers })
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  postUser(username: string, email: string, password: string): Promise<User> {
    return this.http
      .post(this.accountUrl, JSON.stringify({
        username : username,
        email : email,
        password : password
      }), { headers : this.headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: number): Promise<void> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.delete(url, { headers : this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error occured', error);
    return Promise.reject(error.message || error);
  }

}
