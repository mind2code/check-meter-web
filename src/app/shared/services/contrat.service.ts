import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  basePath: string = 'api/v1/contrats';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.basePath);
  }

  getOneById(id: string): Observable<any> {
    return this.http.get<any>(this.basePath + '/' + String(id));
  }

  getAllExpiryNoticeById(id: string): Observable<any> {
    return this.http.get<any>(this.basePath + '/' + String(id) + '/avis-echeances');
  }
}
