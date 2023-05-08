import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    // Clear any authentication tokens
    localStorage.removeItem('token');
    // Navigate to the login page
    this.router.navigate(['login']);
  }
}
