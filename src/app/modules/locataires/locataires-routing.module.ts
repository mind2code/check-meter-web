import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocatairesComponent } from './locataires.component';
import {ContratsComponent} from "./contrats/contrats.component";
import {CreerLocataireComponent} from "./creer-locataire/creer-locataire.component";
import {LocataireDetailsComponent} from "./locataire-details/locataire-details.component";
import {OverviewsComponent} from "./locataire-details/overviews/overviews.component";
import {AvisEcheanceComponent} from "./locataire-details/avis-echeance/avis-echeance.component";

const routes: Routes = [
  { path: '', component: LocatairesComponent },
  { path: 'contrats', component: ContratsComponent },
  { path: 'creer-locataire', component: CreerLocataireComponent },
  { path: 'details',
    component: LocataireDetailsComponent,
    children: [
      { path: 'overview', component: OverviewsComponent },
      { path: 'avis-echeance', component: AvisEcheanceComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocatairesRoutingModule { }
