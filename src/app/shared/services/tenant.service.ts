import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated } from '../models/paginated.interface';
import { Tenant } from '../models/tenant.model';
import { PaginationQuery } from '../requests/pagination.query';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  basePath: string = 'api/v1/locataires';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<Paginated<Tenant>> {
    return this.http.get<any>(this.basePath);
  }

  getOneById(id: string): Observable<Tenant> {
    return this.http.get<any>(this.basePath + '/' + String(id));
  }
}
