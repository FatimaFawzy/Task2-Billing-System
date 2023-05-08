import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private apiUrl = 'https://v2-api-uat.tasdid.net/v2/api/';

  constructor(private http: HttpClient) {}
  // function to post request to apiUrl
  getFilteredResults(filters: any, url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<JSON>(this.apiUrl + url, filters, httpOptions);
  }
}
