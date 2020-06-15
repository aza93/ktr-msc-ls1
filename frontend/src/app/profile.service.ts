import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Profile }    from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = 'http://localhost:8080/api/profile/';
  profiles: Profile[];

  constructor(private http: HttpClient) { }

  save(profile: Profile): Observable<Profile[]> {
    return this.http.post(`${this.baseUrl}/save`, { data: profile })
      .pipe(map((res) => {
        this.profiles.push(res['data']);
        return this.profiles;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
