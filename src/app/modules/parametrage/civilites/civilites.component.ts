import { Component, OnInit } from '@angular/core';
import {CiviliteService} from "./services/civilite.service";
import {Civilite} from "./models/civilite.model";
import {PageInfoService, PageLink} from "../../../_template/layout";

@Component({
  selector: 'app-civilites',
  templateUrl: './civilites.component.html',
  styleUrls: ['./civilites.component.scss']
})
export class CivilitesComponent implements OnInit {

  civilites: Civilite[];

  typePersonne = 'physique';

  currentDemande = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];

  links: Array<PageLink> = [{
    title: 'Tableau de bord',
    path: '/',
    isActive: false,
  }, {
    title: 'Demandes',
    path: '/',
    isActive: false,
  }];
  constructor(private civiliteService: CiviliteService,
              private pageInfo: PageInfoService) {
    pageInfo.updateTitle('Gestion des civilités');
    pageInfo.updateBreadcrumbs(this.links);
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      // @ts-ignore
      params[`title`] = searchTitle;
    }

    if (page) {
      // @ts-ignore
      params[`page`] = page - 1;
    }

    if (pageSize) {
      // @ts-ignore
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveData(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.civiliteService.getAll(params)
      .subscribe(
        response => {
          const { data, recordsTotal } = response;
          this.civilites = data;
          this.count = recordsTotal;
          console.log(this.civilites);
        },
        error => {
          console.log(error);
        });
  }

  // @ts-ignore
  handlePageChange(event): void {
    this.page = event;
    this.retrieveData();
  }

  // @ts-ignore
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveData();
  }


}
