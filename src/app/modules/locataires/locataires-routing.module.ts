import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocatairesComponent } from './locataires.component';
import {ContratsComponent} from "./contrats/contrats.component";
import {CreerLocataireComponent} from "./creer-locataire/creer-locataire.component";

const routes: Routes = [
  { path: '', component: LocatairesComponent },
  { path: 'contrats', component: ContratsComponent },
  { path: 'creer-locataire', component: CreerLocataireComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocatairesRoutingModule { }
