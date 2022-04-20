import { Component, OnInit, Input } from '@angular/core';
import { Store } from 'src/app/core/model/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  @Input() storeDetail: Store;

  constructor() {}

  ngOnInit(): void {}
}
