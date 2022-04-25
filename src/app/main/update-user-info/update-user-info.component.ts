import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Dùng để lấy params trên url
import { ActivatedRoute } from '@angular/router';
import { GetUserResponse, User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css'],
})
export class UpdateUserInfoComponent implements OnInit {
  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  userInfo: User;
  userId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  updateUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    // username: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(5),
    //   Validators.maxLength(20),
    // ]),
    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(4),
    // ]),
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
    console.log(this.updateUserForm.value);

    // nếu form chưa được nhập hoặc nhập không đúng thì không xử lý
    if (this.updateUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .updateUser(this.updateUserForm.value, this.userId)
      .subscribe({
        error: (error) => {
          this.loading = true;
          alert('Khong the cap nhat user');
          console.log({ ...error });
        },
        complete: () => {
          this.loading = false;
          alert('Cap nhat thong tin user thanh cong');
          this.updateUserForm.reset();
          this.router.navigateByUrl('/');
        },
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.userId = params.userId;
        // lay duoc params, thi goi API
        this.userService.getUserById(params.userId).subscribe((result) => {
          this.updateUserForm.patchValue({
            name: result.data.name,
            // username: result.data.username,
            address: result.data.address,
            phone: result.data.phone,
            email: result.data.email,
          });
        });
      },
    });
  }
}
