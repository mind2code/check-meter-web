import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { RentReceiptEffects } from 'src/app/store/rent-recipt/rent-receipt.effects';
import { TenantEffects } from 'src/app/store/tenant/tenant.effects';
import { tenantsFeature } from 'src/app/store/tenant/tenant.reducer';
import { rentReceiptsFeature } from 'src/app/store/rent-recipt/rent-receipt.reducer';

export const storeFeatureModules = [
  StoreModule.forFeature(expiryNoticesFeature),
  StoreModule.forFeature(rentReceiptsFeature),
  StoreModule.forFeature(tenantsFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    ExpiryNoticeEffects,
    RentReceiptEffects,
    TenantEffects,
  ]),
];
