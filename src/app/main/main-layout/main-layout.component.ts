import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginResponse } from 'src/app/core/model/auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  currentUser: LoginResponse | null = null;
  currentUserSubscription: Subscription | null = null;
  userId: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    localStorage.removeItem('user');
    this.authService.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  // ham nay dung de lay id cua user
  getUserId() {
    if (this.currentUser) {
      const decoded: any = jwt_decode(this.currentUser.data.token);
      this.userId = decoded.userid;
    }
  }

  ngOnInit(): void {
    // Theo dõi sự thay đổi của currentUser bên trong service bằng cách chuyển nó thành 1 Observable
    // Khi currentUser thay đổi, sẽ tự động chạy vào callback next và nhận được data mới
    this.currentUserSubscription = this.authService.currentUser
      .asObservable()
      .subscribe({
        next: (currentUser) => {
          this.currentUser = currentUser;
        },
      });

    this.getUserId();
  }

  // chạy trước khi component bị hủy
  ngOnDestroy(): void {
    // cần hủy theo dõi currentUser để giải phóng vùng nhớ
    this.currentUserSubscription.unsubscribe();
  }
}
