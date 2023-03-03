import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { TenantEffects } from 'src/app/store/tenant/tenant.effects';
import { tenantsFeature } from 'src/app/store/tenant/tenant.reducer';
import { contractsFeature } from 'src/app/store/contract/contract.reducer';
import { ContractEffects } from 'src/app/store/contract/contract.effects';
import { housingsFeature } from 'src/app/store/housing/housing.reducer';
import { HousingEffects } from 'src/app/store/housing/housing.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(tenantsFeature),
  StoreModule.forFeature(contractsFeature),
  StoreModule.forFeature(housingsFeature),
  StoreModule.forFeature(expiryNoticesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    TenantEffects,
    ContractEffects,
    HousingEffects,
    ExpiryNoticeEffects,
  ]),
];

export const featureModules = [...storeFeatureModules, effectsFeatureModules];
