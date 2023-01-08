import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocatairesRoutingModule } from './locataires-routing.module';
import { LocatairesComponent } from './locataires.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import { ContratsComponent } from './contrats/contrats.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Step5Component} from "./contrats/steps/step5/step5.component";
import {Step4Component} from "./contrats/steps/step4/step4.component";
import {Step3Component} from "./contrats/steps/step3/step3.component";
import {Step2Component} from "./contrats/steps/step2/step2.component";
import {Step1Component} from "./contrats/steps/step1/step1.component";
import { LocataireDetailsComponent } from './locataire-details/locataire-details.component';
import { CreerLocataireComponent } from './creer-locataire/creer-locataire.component';
import { PersonnePhysiqueComponent } from './creer-locataire/steps/personne-physique/personne-physique.component';
import { PersonneMoraleComponent } from './creer-locataire/steps/personne-morale/personne-morale.component';
import { CreatePersonneComponent } from './creer-locataire/steps/create-personne/create-personne.component';
import {LocataireStepComponent} from "./creer-locataire/steps/step1/locataire-step.component";
import { LocataireRecapComponent } from './creer-locataire/steps/locataire-recap/locataire-recap.component';
import { OverviewsComponent } from './locataire-details/overviews/overviews.component';
import { AvisEcheanceComponent } from './locataire-details/avis-echeance/avis-echeance.component';
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import { AvisEncaisserComponent } from './locataire-details/avis-echeance/avis-encaisser/avis-encaisser.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
    declarations: [
        LocatairesComponent,
        ContratsComponent,
        Step1Component,
        Step2Component,
        Step3Component,
        Step4Component,
        Step5Component,
        LocataireStepComponent,
        LocataireDetailsComponent,
        CreerLocataireComponent,
        PersonnePhysiqueComponent,
        PersonneMoraleComponent,
        CreatePersonneComponent,
        LocataireRecapComponent,
        OverviewsComponent,
        AvisEcheanceComponent,
        AvisEncaisserComponent,
    ],
  exports: [
    PersonneMoraleComponent,
    PersonnePhysiqueComponent
  ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      LocatairesRoutingModule,
      InlineSVGModule,
      NgbTooltipModule,
        //ModalModule.forRoot()
    ],
  providers: [
    BsModalService
  ]
})
export class LocatairesModule { }
