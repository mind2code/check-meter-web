import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuittanceLoyerService {
  basePath: string = 'api/v1/quittance-loyers';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.basePath, data);
  }
}
