import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationQuery } from '../requests/pagination.query';
import { ExpiryNotice } from '../models/expiry-notice.model';
import {environment, pagination} from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpiryNoticeService {
  basePath: string =environment.apiUrl + 'api/v1/avis-echeances';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<ExpiryNotice>> {
    return this.http.get<ApiPaginatedResponse<ExpiryNotice>>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    }).pipe(
      map((value) => {
        if (value === null || typeof value !== 'object') {
          return {
            currentPage: 0,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          }
        }
        return value;
      })
    );
  }

  getAllByTenantId(tenantId: string, params?: PaginationQuery): Observable<ApiPaginatedResponse<ExpiryNotice>> {
    return this.http.get<any>(this.basePath + '/locataire/' + tenantId, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getAllByContractId(contractId: string, params?: PaginationQuery): Observable<ApiPaginatedResponse<ExpiryNotice>> {
    return this.http.get<any>(this.basePath + '/contrat/' + contractId, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }
}
