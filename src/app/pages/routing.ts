import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'contrats', loadChildren: () => import('../modules/contrats/contrats.module').then(m => m.ContratsModule) },
  { path: 'locataires', loadChildren: () => import('../modules/locataires/locataires.module').then(m => m.LocatairesModule) },
  { path: 'parametrage', loadChildren: () => import('../modules/parametrage/parametrage.module').then(m => m.ParametrageModule) },
  { path: 'civilites', loadChildren: () => import('../modules/parametrage/civilites/civilites.module').then(m => m.CivilitesModule) },

  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
