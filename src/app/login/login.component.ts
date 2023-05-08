import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  loggedIn = false;
  responseMessage = ''; // new variable to store the response message

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const logoutElement = document.querySelector('.logout') as HTMLElement;
    if (logoutElement) {
      logoutElement.style.display = 'none';
    }
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.loginForm.reset(); // reset the form after successful login

        let data = response.data;
        if (data) {
          localStorage.setItem('token', data.token);
          this.responseMessage = '';
          // redirect to services
          this.authService.navigateToFilterServices();
        } else {
          this.responseMessage = response.error.message;
        }
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
