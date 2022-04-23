import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  listUser: User[] = [];
  isEditMode: boolean = false;
  idUser: string = '';

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
    if (this.createUserForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.loading = true;
      this.userService
        .updateUser(this.createUserForm.value, this.idUser)
        .subscribe({
          error: (err) => {
            this.loading = true;
            console.log(err);
            this.createUserForm.reset();
          },
          complete: () => {
            this.loading = false;
            alert('Chỉnh sửa người dùng thành công');
            this.createUserForm.reset();
            this.getListUser();
          },
        });
    } else {
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
  }

  handleEditUser(idUser: string) {
    this.isEditMode = true;
    this.idUser = idUser;

    this.getUserDetail(idUser);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getListUser() {
    this.userService.getAllUsers().subscribe({
      next: (result) => {
        this.listUser = result.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserDetail(idUser: string) {
    this.userService.getUserById(idUser).subscribe({
      next: (result) => {
        this.createUserForm.patchValue({
          name: result.data.name,
          username: result.data.username,
          address: result.data.address,
          phone: result.data.phone,
          email: result.data.email,
        });
      },
    });
  }

  ngOnInit(): void {
    this.getListUser();
    console.log(this.listUser);
  }
}
