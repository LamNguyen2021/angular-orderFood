import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getUserById(userId:string) {
  //   const url = ``
  // }

  // updateUser(values: User, userId: string) {
  //   const token = JSON.parse(localStorage.getItem('user')).data.token;

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     }),
  //   };
  //   const url = `http://localhost:8080/api/v1/user/${userId}`;
  //   return this.http.put(url, values, httpOptions);
  // }
}
