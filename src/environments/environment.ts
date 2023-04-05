
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const extModules = [
  StoreDevtoolsModule.instrument({
      maxAge: 25,
  }),
];

export const pagination = {
  perPage: 10,
  pageSizes: [5, 10, 25, 50, 100],
};

export const environment = {
  production: false,
  appVersion: 'v8.1.5',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'http://localhost:4200/',
  appThemeName: 'Metronic',
  appPurchaseUrl: 'https://1.envato.market/EA4JP',
  appHTMLIntegration:
    'https://preview.keenthemes.com/metronic8/demo1/documentation/base/helpers/flex-layouts.html',
  appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/demo1/',
  appPreviewAngularUrl:
    'https://preview.keenthemes.com/metronic8/angular/demo1',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  appPreviewChangelogUrl:
    'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
  keycloakConfig: {
    url: 'https://auth.mind2codes.com/auth',
    realm: 'meterschecker',
    clientId: 'cmeter-web'
  },
  appDemos: {
    demo1: {
      title: 'Demo 1',
      description: 'Default Dashboard',
      published: true,
      thumbnail: './assets/media/demos/demo1.png',
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
