import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUserResponse, User, ListUser } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<GetUserResponse> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = `http://localhost:8080/api/v1/user/${userId}`;
    return this.http.get<GetUserResponse>(url, httpOptions);
  }

  getAllUsers(): Observable<ListUser> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/user';
    return this.http.get<ListUser>(url, httpOptions);
  }

  updateUser(values: User, userId: string) {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const url = `http://localhost:8080/api/v1/user/${userId}`;
    return this.http.put(url, values, httpOptions);
  }
}
