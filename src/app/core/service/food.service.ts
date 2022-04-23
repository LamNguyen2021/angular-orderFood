import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateFoodResponse,
  Food,
  GetFoodDetailResponse,
  ListFood,
} from '../model/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  createFood(values: Food): Observable<CreateFoodResponse> {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = 'http://localhost:8080/api/v1/food';
    return this.http.post<CreateFoodResponse>(url, values, httpOptions);
  }

  editFood(values: Food, idFood: string) {
    const token = JSON.parse(localStorage.getItem('user')).data.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = `http://localhost:8080/api/v1/food/${idFood}`;
    return this.http.put(url, values, httpOptions);
  }

  getFoodList(): Observable<ListFood> {
    const url = 'http://localhost:8080/api/v1/food';
    return this.http.get<ListFood>(url);
  }

  getFoodDetail(idFood: string): Observable<GetFoodDetailResponse> {
    const url = `http://localhost:8080/api/v1/food/${idFood}`;
    return this.http.get<GetFoodDetailResponse>(url);
  }
}
