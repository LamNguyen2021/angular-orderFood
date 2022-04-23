import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListFood } from '../model/food';
import {
  CreateStoreResponse,
  ListStore,
  Store,
  StoreDetail,
} from '../model/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getStoreList(): Observable<ListStore> {
    const url = 'http://localhost:8080/api/v1/store?page=1&size=8';
    return this.http.get<ListStore>(url);
  }

  getStoreDetail(storeId: string): Observable<StoreDetail> {
    const url = `http://localhost:8080/api/v1/store/${storeId}`;
    return this.http.get<StoreDetail>(url);
  }

  getFoodOfStore(storeId: string): Observable<ListFood> {
    const url = `http://localhost:8080/api/v1/store/${storeId}/foods`;
    return this.http.get<ListFood>(url);
  }

  createStore(values: Store): Observable<CreateStoreResponse> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/store';
    return this.http.post<CreateStoreResponse>(url, values, httpOptions);
  }

  editStore(values: Store, storeId: string) {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = `http://localhost:8080/api/v1/store/${storeId}`;
    return this.http.put(url, values, httpOptions);
  }
}
