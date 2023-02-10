import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expiryNoticesFeature } from 'src/app/store/expiry-notice/expiry-notice.reducer';
import { ExpiryNoticeEffects } from 'src/app/store/expiry-notice/expiry-notice.effects';
import { RentReceiptEffects } from 'src/app/store/rent-recipt/rent-receipt.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(expiryNoticesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    ExpiryNoticeEffects,
    RentReceiptEffects,
  ]),
];
