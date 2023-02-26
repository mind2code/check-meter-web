import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRentReceiptDto } from '../dto/rent-receipt.dto';
import { RentReceipt } from '../models/rent-receipt.model';
import { PaginationQuery } from '../requests/pagination.query';
import {environment, pagination} from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RentReceiptService {
  basePath: string = environment.apiUrl + 'api/v1/quittance-loyers';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<RentReceipt>> {
    return this.http.get<any>(this.basePath, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  getAllByExpiryNoticeId(expiryNoticeId: string, params?: PaginationQuery): Observable<ApiPaginatedResponse<RentReceipt>> {
    return this.http.get<any>(this.basePath + '/avis-echeance/' + expiryNoticeId, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? pagination.perPage ?? 25,
        ...(params?.query || {})
      }
    });
  }

  create(data: CreateRentReceiptDto): Observable<RentReceipt> {
    return this.http.post<RentReceipt>(this.basePath, data);
  }
}
