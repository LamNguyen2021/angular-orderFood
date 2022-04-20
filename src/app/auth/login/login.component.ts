import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    // nếu form chưa được nhập hoặc nhập không đúng thì không xử lý
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (result) => {
        // Cập nhật thông tin user vào biến currentUser trong AuthService
        this.authService.currentUser.next(result);

        // Lưu xuống localStorage
        localStorage.setItem('user', JSON.stringify(result));

        // dựa vào mã loại nguồi dùng để redirect tới trang home hoặc trang admin
        var decoded: any = jwt_decode(result.data.token);

        if (decoded.roles === 'USER') {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('/admin');
        }
      },
      error: (error) => {
        this.loading = true;
        alert('username hoặc mật khẩu không đúng');
        this.loginForm.reset();
      },
    });
  }

  ngOnInit(): void {}
}
