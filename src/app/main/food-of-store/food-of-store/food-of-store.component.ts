import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
// Dùng để lấy params trên url
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/core/model/food';
import { Store, StoreDetail } from 'src/app/core/model/store';

@Component({
  selector: 'app-food-of-store',
  templateUrl: './food-of-store.component.html',
  styleUrls: ['./food-of-store.component.css'],
})
export class FoodOfStoreComponent implements OnInit {
  listFood: Food[] = [];
  storeDetail: Store;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  getFoodOfStore(storeId: string) {
    this.storeService.getFoodOfStore(storeId).subscribe({
      next: (result) => {
        this.listFood = result.data;
        console.log('list food', this.listFood);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getStoreDetail(storeId: string) {
    this.storeService.getStoreDetail(storeId).subscribe({
      next: (result) => {
        this.storeDetail = result.data;
      },
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        // lay duoc params, thi goi API lay tat ca mon an
        this.getFoodOfStore(params.storeId);

        // goi API lay thong tin chi tiet cua hang
        this.getStoreDetail(params.storeId);
      },
    });
  }
}
