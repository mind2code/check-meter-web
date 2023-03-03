import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes: Subject<void> = new Subject<void>();
  itemsPerPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
  firstPageLabel: string;
  lastPageLabel: string;

  constructor(private translate: TranslateService) {
    this.itemsPerPageLabel = this.translate.instant('PAGINATOR.LABEL.ITEMS_PER_PAGE');
    this.nextPageLabel = this.translate.instant('PAGINATOR.LABEL.NEXT_PAGE');
    this.previousPageLabel = this.translate.instant('PAGINATOR.LABEL.PREVIOUS_PAGE');
    this.firstPageLabel = this.translate.instant('PAGINATOR.LABEL.FIRST_PAGE');
    this.lastPageLabel = this.translate.instant('PAGINATOR.LABEL.LAST_PAGE');
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translate.instant('PAGINATOR.LABEL.RANGE', { offset: 0, limit: 0, length: 0 });
    }

    const offset = (page * pageSize) + 1;
    let limit = pageSize * (page+1);
    if (limit > length) {
      limit = length;
    }

    return this.translate.instant('PAGINATOR.LABEL.RANGE', { offset, limit, length });
  }
}
