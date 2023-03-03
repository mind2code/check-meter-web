import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { RentReceiptEffects } from 'src/app/store/rent-receipt/rent-receipt.effects';
import { TenantEffects } from 'src/app/store/tenant/tenant.effects';
import { tenantsFeature } from 'src/app/store/tenant/tenant.reducer';
import { rentReceiptsFeature } from 'src/app/store/rent-receipt/rent-receipt.reducer';
import { contractsFeature } from 'src/app/store/contract/contract.reducer';
import { ContractEffects } from 'src/app/store/contract/contract.effects';
import { housingsFeature } from 'src/app/store/housing/housing.reducer';
import { HousingEffects } from 'src/app/store/housing/housing.effects';
import { settlementTypesFeature } from 'src/app/store/settlement-type/settlement-type.reducer';
import { SettlementTypeEffects } from 'src/app/store/settlement-type/settlement-type.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(expiryNoticesFeature),
  StoreModule.forFeature(rentReceiptsFeature),
  StoreModule.forFeature(tenantsFeature),
  StoreModule.forFeature(contractsFeature),
  StoreModule.forFeature(housingsFeature),
  StoreModule.forFeature(settlementTypesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    ExpiryNoticeEffects,
    RentReceiptEffects,
    TenantEffects,
    ContractEffects,
    HousingEffects,
    SettlementTypeEffects,
  ]),
];
