import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../models/tenant.model';
import { PaginationQuery } from '../requests/pagination.query';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse, ApiOneResponse, TenantApiOneResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  basePath: string = 'api/v1/locataires';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Tenant>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getOneById(id: string): Observable<TenantApiOneResponse> {
    return this.http.get<any>(this.basePath + '/' + String(id));
  }
}
