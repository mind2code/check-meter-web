import { NgModule, APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { metaReducers } from './store/meta-reducers';
import { ToastsContainerComponent } from './shared/toast/toasts-container.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://auth.mind2codes.com/auth',
        realm: 'monloyer',
        clientId: 'dev'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe:false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr'
    }),
    HttpClientModule,
    ClipboardModule,
    KeycloakAngularModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot({
      enableHtml: true,
      progressBar: true,
      newestOnTop: true
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({}, { metaReducers }),
    ToastsContainerComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
