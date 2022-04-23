import { Component, OnInit } from '@angular/core';
// Dùng để lấy params trên url
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/core/model/food';
import { Store } from 'src/app/core/model/store';
import { StoreService } from 'src/app/core/service/store.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/core/service/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  storeDetail: Store;
  listFood: Food[] = [];
  loading = false;
  idStore: string = '';
  idFood: string = '';
  isEditMode: boolean = false;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService
  ) {}

  createFoodForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', [Validators.required]),
    storeId: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  handleCreateForm() {
    console.log('createFoodForm', this.createFoodForm.value);

    if (this.createFoodForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.loading = true;
      this.foodService
        .editFood(this.createFoodForm.value, this.idFood)
        .subscribe({
          error: (err) => {
            this.loading = true;
            console.log(err);
            this.createFoodForm.reset();
          },
          complete: () => {
            this.loading = false;
            alert('Chỉnh sửa thành công món ăn');
            this.createFoodForm.reset();
            this.getFoodOfStore(this.idStore);
          },
        });
    } else {
      this.loading = true;
      this.foodService.createFood(this.createFoodForm.value).subscribe({
        error: (err) => {
          this.loading = true;
          console.log(err);
          this.createFoodForm.reset();
        },
        complete: () => {
          this.loading = false;
          alert('Tạo thành công món ăn');
          this.createFoodForm.reset();
          this.getFoodOfStore(this.idStore);
        },
      });
    }
  }

  handleEditFood(idFood: string) {
    this.isEditMode = true;
    this.idFood = idFood;

    this.getFoodDetail(idFood);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getFoodOfStore(storeId: string) {
    this.storeService.getFoodOfStore(storeId).subscribe({
      next: (result) => {
        this.listFood = result.data;
        //console.log('list food', this.listFood);
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

  getFoodDetail(idFood: string) {
    this.foodService.getFoodDetail(idFood).subscribe({
      next: (result) => {
        this.createFoodForm.patchValue({
          name: result.data.name,
          description: result.data.description,
          imageUrl: result.data.imageUrl,
          storeId: result.data.storeId,
          price: result.data.price,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.idStore = params.storeId;

        // lay duoc params, thi goi API lay tat ca mon an
        this.getFoodOfStore(params.storeId);

        // goi API lay thong tin chi tiet cua hang
        this.getStoreDetail(params.storeId);
      },
    });

    this.createFoodForm.patchValue({
      storeId: this.idStore,
    });
  }
}
