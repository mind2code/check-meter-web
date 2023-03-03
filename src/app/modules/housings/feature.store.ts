import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { housingsFeature } from 'src/app/store/housing/housing.reducer';
import { HousingEffects } from 'src/app/store/housing/housing.effects';
import { housingTypesFeature } from 'src/app/store/housing-type/housing-type.reducer';
import { HousingTypeEffects } from 'src/app/store/housing-type/housing-type.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(housingsFeature),
  StoreModule.forFeature(housingTypesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    HousingEffects,
    HousingTypeEffects,
  ]),
];
