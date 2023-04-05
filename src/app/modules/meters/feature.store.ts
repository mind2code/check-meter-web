import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metersFeature } from 'src/app/store/meters/meters.reducer';
import { MetersEffects } from 'src/app/store/meters/meters.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(metersFeature)
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    MetersEffects
  ]),
];
