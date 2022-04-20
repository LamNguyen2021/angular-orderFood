import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/core/model/food';
import { FoodService } from 'src/app/core/service/food.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
export class ListFoodComponent implements OnInit {
  listFood: Food[] = [];

  constructor(private foodService: FoodService) {}

  getListFood() {
    this.foodService.getFoodList().subscribe({
      next: (result) => {
        this.listFood = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getListFood();
  }
}
