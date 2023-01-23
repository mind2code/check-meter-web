import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrageRoutingModule } from './parametrage-routing.module';
import { StatutService } from './statuts/services/statut.service';
import { StatutPipe } from './statuts/pipes/statut.pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ParametrageRoutingModule
  ],
  providers: [StatutService],
})
export class ParametrageModule { }
