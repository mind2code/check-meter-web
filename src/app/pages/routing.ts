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
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
  { path: 'meters', 
    loadChildren: () => import('../modules/meters/meters.module').then(m => m.MetersModule) 
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
