import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
      },
    ]),
    TranslateModule,
  ],
})
export class ProfileModule {}
