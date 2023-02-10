import { Component, OnInit } from '@angular/core';
import {LocataireService} from "./services/locataire.service";
import {Locataire} from "./models/locataire.model";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Personne} from "./models/personne.model";
import {PersonneRequest} from "./requests/PersonneRequest";
import {TypePersonne} from "../parametrage/type-personne/model/type-personne.model";
import {PersonnePhysique} from "./models/personne-physique.model";
import {Genre} from "../parametrage/genres/models/genre.model";
import {Civilite} from "../parametrage/civilites/models/civilite.model";
import {SituationMatrimoniale} from "../parametrage/situation-matrimoniale/models/situation-matrimoniale.model";
import {PageInfoService, PageLink} from "../../_metronic/layout";

@Component({
  selector: 'app-locataires',
  templateUrl: './locataires.component.html',
  styleUrls: ['./locataires.component.scss']
})
export class LocatairesComponent implements OnInit {

  locataires$: Locataire[];
  currentLocataire = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  links: Array<PageLink> = [{
    title: 'Tableau de bord',
    path: '/',
    isActive: false,
  }, {
    title: 'Locataires',
    path: '/',
    isActive: false,
  }];

  constructor(
    private locataireService: LocataireService,
    private toastr: ToastrService,
    private pageInfo: PageInfoService) {
    pageInfo.updateTitle('GESTION DES LOCATAIRES');
    pageInfo.updateBreadcrumbs(this.links);
  }

  ngOnInit(): void {
    this.retrieveLocatires();
    //this.create();

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

  retrieveLocatires(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.locataireService.getAll(params).subscribe(
      res => {
        const { data, recordsTotal } = res;
        //this.locataires = data;
        this.locataires$ = data;
        this.count = recordsTotal;
        //console.log(this.locataires);
      }, error => {
        console.log('echec transaction', error.message);
        this.toastr.error(error.message, 'Echec' , {
          positionClass: 'toast-bottom-right'
        });
      }
    )
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

  handlePageChange(event: any): void {
    this.page = event;
    this.retrieveLocatires();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveLocatires();
  }


}
