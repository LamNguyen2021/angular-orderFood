import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    // Nếu có key user trong localStorage, lấy ra và cập nhật lại cho biến currentAdmin trong service
    if (user) {
      console.log('user', JSON.parse(user));

      this.authService.currentUser.next(JSON.parse(user));
    }
  }
}
