import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../models/tenant.model';
import { PaginationQuery } from '../requests/pagination.query';
import { pagination } from 'src/environments/environment';
import { ApiPaginatedResponse } from '../models/api-response.interface';
import { PersonService } from './person.service';
import { CreateTenantDto } from '../dto/tenant.dto';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  basePath: string = 'api/v1/locataires';

  constructor(private personService: PersonService) { }

  getAll(params?: PaginationQuery): Observable<ApiPaginatedResponse<Tenant>> {
    return this.personService.getAll(params) as Observable<ApiPaginatedResponse<Tenant>>
  }

  getOneById(id: string): Observable<Tenant> {
    return this.personService.getOneById(id) as Observable<Tenant>;
  }

  create(data: CreateTenantDto): Observable<Tenant> {
    return this.personService.create(data) as Observable<Tenant>;
  }
}
