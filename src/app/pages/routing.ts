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
  {
    path: 'tenants',
    loadChildren: () => import('../modules/tenants/tenants.module').then(m => m.TenantsModule),
  },
  {
    path: 'contracts',
    loadChildren: () => import('../modules/contracts/contracts.module').then(m => m.ContractsModule),
  },
  {
    path: 'housings',
    loadChildren: () => import('../modules/housings/housings.module').then(m => m.HousingsModule),
  },
  {
    path: 'expiry-notices',
    loadChildren: () => import('../modules/expiry-notices/expiry-notices.module').then(m => m.ExpiryNoticesModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
