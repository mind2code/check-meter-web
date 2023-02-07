import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRentReceiptDto } from '../dto/rent-receipt.dto';
import { RentReceipt } from '../models/rent-receipt.model';
import { PaginationQuery } from '../requests/pagination.query';
import { Paginated } from '../models/paginated.interface';
import { pagination } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentReceiptService {
  basePath: string = 'api/v1/quittance-loyers';

  constructor(private http: HttpClient) { }

  getAll(params?: PaginationQuery): Observable<Paginated<RentReceipt>> {
    return this.http.get<Paginated<RentReceipt>>(this.basePath, {
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
