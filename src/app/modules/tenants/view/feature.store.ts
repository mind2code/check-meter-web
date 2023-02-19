import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { RentReceiptEffects } from 'src/app/store/rent-receipt/rent-receipt.effects';
import { rentReceiptsFeature } from 'src/app/store/rent-receipt/rent-receipt.reducer';
import { SettlementTypeEffects } from 'src/app/store/settlement-type/settlement-type.effects';
import { settlementTypesFeature } from 'src/app/store/settlement-type/settlement-type.reducer';

export const storeFeatureModules = [
  StoreModule.forFeature(expiryNoticesFeature),
  StoreModule.forFeature(rentReceiptsFeature),
  StoreModule.forFeature(settlementTypesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    ExpiryNoticeEffects,
    RentReceiptEffects,
    SettlementTypeEffects,
  ]),
];
