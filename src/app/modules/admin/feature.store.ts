import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { statutesFeature } from 'src/app/store/status/status.reducer';
import { StatusEffects } from 'src/app/store/status/status.effects';
import { settlementTypesFeature } from 'src/app/store/settlement-type/settlement-type.reducer';
import { SettlementTypeEffects } from 'src/app/store/settlement-type/settlement-type.effects';
import { housingTypesFeature } from 'src/app/store/housing-type/housing-type.reducer';
import { HousingTypeEffects } from 'src/app/store/housing-type/housing-type.effects';
import { maritalSituationsFeature } from 'src/app/store/marital-situation/marital-situation.reducer';
import { MaritalSituationEffects } from 'src/app/store/marital-situation/marital-situation.effects';
import { identityDocumentTypesFeature } from 'src/app/store/identity-document-type/identity-document-type.reducer';
import { IdentityDocumentTypeEffects } from 'src/app/store/identity-document-type/identity-document-type.effects';
import { civilitiesFeature } from 'src/app/store/civility/civility.reducer';
import { gendersFeature } from 'src/app/store/gender/gender.reducer';
import { CivilityEffects } from 'src/app/store/civility/civility.effects';
import { GenderEffects } from 'src/app/store/gender/gender.effects';
import { countriesFeature } from 'src/app/store/country/country.reducer';
import { CountryEffects } from 'src/app/store/country/country.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(statutesFeature),
  StoreModule.forFeature(settlementTypesFeature),
  StoreModule.forFeature(housingTypesFeature),
  StoreModule.forFeature(maritalSituationsFeature),
  StoreModule.forFeature(identityDocumentTypesFeature),
  StoreModule.forFeature(civilitiesFeature),
  StoreModule.forFeature(gendersFeature),
  StoreModule.forFeature(countriesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    StatusEffects,
    SettlementTypeEffects,
    HousingTypeEffects,
    MaritalSituationEffects,
    IdentityDocumentTypeEffects,
    CivilityEffects,
    GenderEffects,
    CountryEffects,
  ]),
];
