import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { StatsWidget5Component } from 'src/app/_template/partials/content/widgets/stats/stats-widget5/stats-widget5.component';
import { WidgetsModule } from 'src/app/_template/partials';
import { LetModule, PushModule } from '@ngrx/component';
import { SharedModule } from 'src/app/shared/shared.module';
import { featureModules } from './feature.store';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    TranslateModule,
    WidgetsModule,
    PushModule,
    LetModule,
    SharedModule,
    featureModules,
  ],
})
export class DashboardModule {}
