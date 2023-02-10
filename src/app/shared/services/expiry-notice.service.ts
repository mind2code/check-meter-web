import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    });
  }
}
