import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiOneResponse, ApiPaginatedResponse } from '../models/api-response.interface';
import { Contract } from '../models/contract.model';
import { PaginationQuery } from '../requests/pagination.query';
import {environment, pagination} from 'src/environments/environment';
import { ExpiryNotice } from '../models/expiry-notice.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  basePath: string = environment.apiUrl + 'api/v1/contrats';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Contract>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getOneById(id: string): Observable<ApiOneResponse<Contract>> {
    return this.http.get<any>(this.basePath + '/' + String(id));
  }

  getAllExpiryNoticeById(id: string, params?: PaginationQuery): Observable<ApiPaginatedResponse<ExpiryNotice>> {
    return this.http.get<any>(this.basePath + '/' + String(id) + '/avis-echeances', {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  create(data: any): Observable<Contract> {
    return this.http.post<any>(this.basePath, data);
  }
}
