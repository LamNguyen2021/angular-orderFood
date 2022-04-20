import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css'],
})
export class UpdateUserInfoComponent implements OnInit {
  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor() {}

  updateUserForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
  });

  handleUpdateUser() {
    // nếu form chưa được nhập hoặc nhập không đúng thì không xử lý
    if (this.updateUserForm.invalid) {
      return;
    }
  }

  ngOnInit(): void {}
}
