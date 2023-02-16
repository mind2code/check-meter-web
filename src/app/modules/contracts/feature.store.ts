import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { RentReceiptEffects } from 'src/app/store/rent-recipt/rent-receipt.effects';
import { TenantEffects } from 'src/app/store/tenant/tenant.effects';
import { tenantsFeature } from 'src/app/store/tenant/tenant.reducer';
import { rentReceiptsFeature } from 'src/app/store/rent-recipt/rent-receipt.reducer';
import { personsFeature } from 'src/app/store/person/person.reducer';
import { PersonEffects } from 'src/app/store/person/person.effects';
import { contractsFeature } from 'src/app/store/contract/contract.reducer';
import { ContractEffects } from 'src/app/store/contract/contract.effects';
import { housingsFeature } from 'src/app/store/housing/housing.reducer';
import { HousingEffects } from 'src/app/store/housing/housing.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(expiryNoticesFeature),
  StoreModule.forFeature(rentReceiptsFeature),
  StoreModule.forFeature(tenantsFeature),
  StoreModule.forFeature(personsFeature),
  StoreModule.forFeature(contractsFeature),
  StoreModule.forFeature(housingsFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    ExpiryNoticeEffects,
    RentReceiptEffects,
    TenantEffects,
    PersonEffects,
    ContractEffects,
    HousingEffects,
  ]),
];
