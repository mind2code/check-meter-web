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
  {
    path: 'tenants',
    loadChildren: () => import('../modules/tenants/tenants.module').then(m => m.TenantsModule),
    data: {
      'app.toolbar.layout': 'classic',
    },
  },
  { path: 'habitations', loadChildren: () => import('../modules/habitations/habitations.module').then(m => m.HabitationsModule) },
  { path: 'contrats', loadChildren: () => import('../modules/contrats/contrats.module').then(m => m.ContratsModule) },
  { path: 'parametrage', loadChildren: () => import('../modules/parametrage/parametrage.module').then(m => m.ParametrageModule) },
  { path: 'civilites', loadChildren: () => import('../modules/parametrage/civilites/civilites.module').then(m => m.CivilitesModule) },

  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
