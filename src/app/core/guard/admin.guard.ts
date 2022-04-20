import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // nếu return về true => cho phép truy cập vào route

    // lấy từ localStorage để kiểm tra mã loại người dùng
    const user = localStorage.getItem('user');

    // chưa đăng nhập
    if (!user) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      const token = JSON.parse(user).data.token;
      const decoded: any = jwt_decode(token);

      if (decoded.roles === 'USER') {
        this.router.navigateByUrl('/');
        return false;
      }

      return true;
    }
  }
}
