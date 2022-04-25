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
  isEditMode: boolean = false;
  storeDetail: Store;
  idStore: string = '';

  createStoreForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    imageUrl: new FormControl('', [Validators.required]),
    location: new FormControl(''),
    quantityFood: new FormControl('', Validators.required),
    donViTinh: new FormControl('', Validators.required),
  });

  handleViewMore(storeid: string) {
    this.router.navigateByUrl(`/admin/store/${storeid}/food`);
  }

  handleEditStore(storeid: string) {
    this.isEditMode = true;
    this.idStore = storeid;

    this.getStoreDetail(storeid);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleCreateForm() {
    console.log('create store form', this.createStoreForm.value);

    if (this.createStoreForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.loading = true;
      this.storeService
        .editStore(this.createStoreForm.value, this.idStore)
        .subscribe({
          error: (err) => {
            this.loading = true;
            console.log(err);
            this.createStoreForm.reset();
          },
          complete: () => {
            this.loading = false;
            alert('Chỉnh sửa cửa hàng thành công');
            this.createStoreForm.reset();
            this.getListStore();
          },
        });
    } else {
      this.loading = true;
      this.storeService.createStore(this.createStoreForm.value).subscribe({
        error: (err) => {
          this.loading = true;
          console.log(err);
          this.createStoreForm.reset();
        },
        complete: () => {
          this.loading = false;
          alert('Tạo thành công cửa hàng');
          this.createStoreForm.reset();
          this.getListStore();
        },
      });
    }
  }

  getListStore() {
    this.storeService.getStoreList().subscribe({
      next: (result) => {
        this.listStore = result.data;
      },
    });
  }

  getStoreDetail(storeId: string) {
    this.storeService.getStoreDetail(storeId).subscribe({
      next: (result) => {
        this.createStoreForm.patchValue({
          name: result.data.name,
          description: result.data.description,
          address: result.data.address,
          imageUrl: result.data.imageUrl,
          location: result.data.location,
        });
      },
    });
  }

  editStore(storeId: string) {
    this.storeService.editStore(this.createStoreForm.value, storeId).subscribe({
      error: (err) => {},
    });
  }

  ngOnInit(): void {
    this.getListStore();
  }
}
