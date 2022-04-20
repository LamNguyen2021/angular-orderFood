import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/core/model/store';
import { StoreService } from 'src/app/core/service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  listStore: Store[] = [];

  constructor(private storeService: StoreService) {}

  handleEditStore(storeId: string) {
    console.log('storeid', storeId);
  }

  handleDeleteStore(storeId: string) {
    console.log('storeid', storeId);
  }

  getListStore() {
    this.storeService.getStoreList().subscribe({
      next: (result) => {
        this.listStore = result.data;
      },
    });
  }

  ngOnInit(): void {
    this.getListStore();
  }
}
