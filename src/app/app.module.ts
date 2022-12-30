import { NgModule, APP_INITIALIZER } from '@angular/core';
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

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://auth.mind2codes.com/auth',
        realm: 'monloyer',
        clientId: 'web'
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    KeycloakAngularModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
