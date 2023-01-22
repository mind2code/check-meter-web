import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisEcheanceService {
  basePath: string = 'api/v1/avis-echeances';

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.basePath, { params });
  }
}
