import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, from } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import {KeycloakService} from "keycloak-angular";
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  authUser$: Observable<KeycloakProfile>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private keycloak: KeycloakService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.authUser$ = from(this.keycloak.loadUserProfile());
    this.isAuthenticated$ = from(this.keycloak.isLoggedIn());
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    this.keycloak.logout().then(() => {
      document.location.reload();
    });
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  /* {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  }, */
  {
    lang: 'fr',
    name: 'Français',
    flag: './assets/media/flags/france.svg',
  },
];
