import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-main-layout-admin',
  templateUrl: './main-layout-admin.component.html',
  styleUrls: ['./main-layout-admin.component.css'],
})
export class MainLayoutAdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    localStorage.removeItem('user');
    this.authService.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
