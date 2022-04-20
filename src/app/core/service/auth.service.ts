import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Login, LoginResponse, SignUp, SignUpResponse } from '../model/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Muốn sử dụng biến toàn cục không thể sử dụng 1 property bình thường mà phải sử dụng đối tượng BehaviorSubject

  // currentUser.next(value) => cập nhật giá trị cho biến currentUser
  // currentUser.value => Lấy ra giá trị của biến currentUser
  // currentUser.asObservable() => chuyển currentUser thành 1 Observable => mình có thể subscribe nó => mình có thể theo dõi sự thay đổi của biến này

  currentUser = new BehaviorSubject<LoginResponse | null>(null); // kiếm coi nơi nào cần cập nhật biến này: sau khi đăng nhập thành công -> login.ts

  constructor(private http: HttpClient) {}

  login(values: Login): Observable<LoginResponse> {
    const url = 'http://localhost:8080/api/v1/authen/login';
    return this.http.post<LoginResponse>(url, values);
  }

  signup(values: SignUp): Observable<SignUpResponse> {
    const url = 'http://localhost:8080/api/v1/authen/register';
    return this.http.post<SignUpResponse>(url, values);
  }
}
