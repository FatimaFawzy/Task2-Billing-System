import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'billing-system';
  loggedIn = this.authService.isLoggedIn(); //check if logged in

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);

      console.log('loginn' + this.loggedIn);
    }
  }
}
