import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderRequest, UpdateOrderRequest } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order: CreateOrderRequest): Observable<any> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/order';
    return this.http.post<any>(url, order, httpOptions);
  }

  updateOrder(order: UpdateOrderRequest): Observable<any> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = `http://localhost:8080/api/v1/order/${order.id}`;
    return this.http.put<any>(url, order, httpOptions);
  }

  deleteOrder(orderId: string): Observable<any> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = `http://localhost:8080/api/v1/order/${orderId}`;
    return this.http.delete(url, httpOptions);
  }

  getLastOrder(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/order/last-order';
    return this.http.get<any>(url, httpOptions);
  }

  getCart(): Observable<any> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/order/cart';
    return this.http.get<any>(url, httpOptions);
  }

  getStatusOrder() {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/order/user';
    return this.http.get<any>(url, httpOptions);
  }
}
