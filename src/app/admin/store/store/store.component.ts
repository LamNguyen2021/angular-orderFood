import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/app/core/model/store';
import { StoreService } from 'src/app/core/service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(private router: Router, private storeService: StoreService) {}

  loading = false;
  listStore: Store[] = [];

  createStoreForm: FormGroup = new FormGroup({
    tenCuaHang: new FormControl('', Validators.required),
    moTa: new FormControl('', Validators.required),
    diaChi: new FormControl('', Validators.required),
    duongDanHinhAnh: new FormControl('', [Validators.required]),
    location: new FormControl(''),
  });

  handleEditStore(store: string) {
    console.log(store);
  }

  handleCreateForm() {
    // nếu form chưa được nhập hoặc nhập không đúng thì không xử lý
    if (this.createStoreForm.invalid) {
      return;
    }

    this.loading = true;
    this.storeService.createStore(this.createStoreForm.value).subscribe({
      error: (err) => {
        this.loading = true;
        console.log(err);
        this.createStoreForm.reset();
      },
      complete: () => {
        this.loading = false;
        alert('Tạo thành công');
        this.createStoreForm.reset();
      },
    });
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
