import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TenantEffects } from 'src/app/store/tenant/tenant.effects';
import { tenantsFeature } from 'src/app/store/tenant/tenant.reducer';
import { personsFeature } from 'src/app/store/person/person.reducer';
import { PersonEffects } from 'src/app/store/person/person.effects';
import { contractsFeature } from 'src/app/store/contract/contract.reducer';
import { ContractEffects } from 'src/app/store/contract/contract.effects';
import { maritalSituationsFeature } from 'src/app/store/marital-situation/marital-situation.reducer';
import { identityDocumentTypesFeature } from 'src/app/store/identity-document-type/identity-document-type.reducer';
import { civilitiesFeature } from 'src/app/store/civility/civility.reducer';
import { gendersFeature } from 'src/app/store/gender/gender.reducer';
import { countriesFeature } from 'src/app/store/country/country.reducer';
import { personTypesFeature } from 'src/app/store/person-type/person-type.reducer';
import { MaritalSituationEffects } from 'src/app/store/marital-situation/marital-situation.effects';
import { IdentityDocumentTypeEffects } from 'src/app/store/identity-document-type/identity-document-type.effects';
import { CivilityEffects } from 'src/app/store/civility/civility.effects';
import { GenderEffects } from 'src/app/store/gender/gender.effects';
import { CountryEffects } from 'src/app/store/country/country.effects';
import { PersonTypeEffects } from 'src/app/store/person-type/person-type.effects';

export const storeFeatureModules = [
  StoreModule.forFeature(tenantsFeature),
  StoreModule.forFeature(personsFeature),
  StoreModule.forFeature(contractsFeature),
  StoreModule.forFeature(maritalSituationsFeature),
  StoreModule.forFeature(identityDocumentTypesFeature),
  StoreModule.forFeature(civilitiesFeature),
  StoreModule.forFeature(gendersFeature),
  StoreModule.forFeature(countriesFeature),
  StoreModule.forFeature(personTypesFeature),
];

export const effectsFeatureModules = [
  EffectsModule.forFeature([
    TenantEffects,
    PersonEffects,
    ContractEffects,
    MaritalSituationEffects,
    IdentityDocumentTypeEffects,
    CivilityEffects,
    GenderEffects,
    CountryEffects,
    PersonTypeEffects,
  ]),
];
