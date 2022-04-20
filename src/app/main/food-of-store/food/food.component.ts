import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Food } from 'src/app/core/model/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  // @Input('listFood') listFood: Food[] = []; // alias
  @Input() listFood: Food[] = []; // trực tiếp
  @Input() text: string;

  loading = true;

  constructor() {}

  ngOnInit(): void {
    console.log(this.listFood);
    console.log(this.text);
  }
}
