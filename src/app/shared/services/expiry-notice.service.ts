import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaginationQuery } from '../requests/pagination.query';
import { Paginated } from '../models/paginated.interface';
import { ExpiryNotice } from '../models/expiry-notice.model';
import { pagination } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpiryNoticeService {
  basePath: string = 'api/v1/avis-echeances';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<Paginated<ExpiryNotice>> {
    return this.http.get<Paginated<ExpiryNotice>>(this.basePath, {
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

  getByTenantId(tenantId: string, params?: PaginationQuery): Observable<Paginated<ExpiryNotice>> {
    return this.http.get<Paginated<ExpiryNotice>>(this.basePath + '/locataire/' + tenantId, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getByContractId(contractId: string, params?: PaginationQuery): Observable<Paginated<ExpiryNotice>> {
    return this.http.get<Paginated<ExpiryNotice>>(this.basePath + '/contrat/' + contractId, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }
}
