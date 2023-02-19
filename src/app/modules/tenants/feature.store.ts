import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { RentReceiptEffects } from 'src/app/store/rent-receipt/rent-receipt.effects';
import { TenantEffects } from 'src/app/store/tenant/tenant.effects';
import { tenantsFeature } from 'src/app/store/tenant/tenant.reducer';
import { rentReceiptsFeature } from 'src/app/store/rent-receipt/rent-receipt.reducer';
import { personsFeature } from 'src/app/store/person/person.reducer';
import { PersonEffects } from 'src/app/store/person/person.effects';
import { contractsFeature } from 'src/app/store/contract/contract.reducer';
import { ContractEffects } from 'src/app/store/contract/contract.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(tenantsFeature),
  StoreModule.forFeature(personsFeature),
  StoreModule.forFeature(contractsFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    TenantEffects,
    PersonEffects,
    ContractEffects,
  ]),
];
