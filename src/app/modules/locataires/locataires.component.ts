import { Component, OnDestroy, OnInit } from '@angular/core';
import {LocataireService} from "./services/locataire.service";
import {Locataire} from "./models/locataire.model";
import {Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {PersonneRequest} from "./requests/PersonneRequest";
import {TypePersonne} from "../parametrage/type-personne/model/type-personne.model";
import {PersonnePhysique} from "./models/personne-physique.model";
import {Genre} from "../parametrage/genres/models/genre.model";
import {Civilite} from "../parametrage/civilites/models/civilite.model";
import {SituationMatrimoniale} from "../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';

@Component({
  selector: 'app-locataires',
  templateUrl: './locataires.component.html',
  styleUrls: ['./locataires.component.scss']
})
export class LocatairesComponent implements OnInit, OnDestroy {

  tenants$: Observable<Tenant[]>;

  locataires$: Locataire[];
  currentLocataire = null;
  currentIndex = -1;
  title = '';

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  subscriptions: Array<Subscription> = [];

  constructor(
    private locataireService: LocataireService,
    private toastr: ToastrService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.tenants$ = this.store.select(TenantSelectors.selectAll);
    this.totalRecords$ = this.store.select(TenantSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  trackById(index: number, item: Tenant): string {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(TenantPageActions.loadAll({ params: this.paginationQuery }));
  }

  create(): void {
    const request = new PersonneRequest();
    request.typePersonne = new TypePersonne();
    request.typePersonne.id = 1;
    request.typePersonne.identifiant = 'PP';
    request.personnePhysique = new PersonnePhysique();
    request.personnePhysique.nom = 'ETIEN';
    request.personnePhysique.prenoms = 'Romuald';
    request.personnePhysique.nomJeuneFille = '';
    request.personnePhysique.dateNaissance = new Date();
    request.personnePhysique.lieuNaissance = 'Abidjan';
    request.personnePhysique.nomComplet = request.personnePhysique.nom + ' ' + request.personnePhysique.prenoms;
    request.personnePhysique.genre = new Genre();
    request.personnePhysique.genre.id = 1;
    request.personnePhysique.civilite = new Civilite();
    request.personnePhysique.civilite.id = 1;
    request.personnePhysique.situationMatrimoniale = new SituationMatrimoniale();
    request.personnePhysique.situationMatrimoniale.id = 1;
    request.personnePhysique.identifiant = 'P000011';

    this.locataireService.create(request).subscribe(res => {
      console.log(JSON.stringify(res));
    });
  }
}
