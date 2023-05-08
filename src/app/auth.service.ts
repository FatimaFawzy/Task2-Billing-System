import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://v2-api-uat.tasdid.net/v1/api/Auth/Login';
  constructor(private http: HttpClient, private router: Router) {}
  navigateToFilterServices() {
    this.router.navigate(['/FilterServices']);
  }

  login(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<JSON>(this.url, data, httpOptions);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
