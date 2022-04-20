import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loading = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  signUpForm: FormGroup = new FormGroup({
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

  handleSignUp() {
    // nếu form chưa được nhập hoặc nhập không đúng thì không xử lý
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.signup(this.signUpForm.value).subscribe({
      error: (error) => {
        this.loading = true;
        alert('username đã tồn tại');
        this.signUpForm.reset();
      },
      complete: () => {
        this.loading = false;
        this.router.navigateByUrl('/login');
      },
    });
  }

  ngOnInit(): void {}
}
