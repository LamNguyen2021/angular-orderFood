import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListFood } from '../model/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getFoodList(): Observable<ListFood> {
    const url = 'http://localhost:8080/api/v1/food';
    return this.http.get<ListFood>(url);
  }
}
