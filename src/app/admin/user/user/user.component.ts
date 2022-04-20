import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  listUser: User[] = [];

  createUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
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

  handleCreateUser() {
    console.log(this.createUserForm.value);

    // nếu form chưa được nhập hoặc nhập không đúng thì không xử lý
    if (this.createUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.signup(this.createUserForm.value).subscribe({
      error: (error) => {
        this.loading = true;
        alert('username đã tồn tại');
        this.createUserForm.reset();
      },
      complete: () => {
        this.loading = false;
        this.createUserForm.reset();
        alert('tạo user thành công');
      },
    });
  }

  ngOnInit(): void {}
}
