import { Housing } from '../models/housing.model';

export interface CreateHousingDto extends Partial<Pick<Housing, (
  'description'|'localisation'|'superficie'|'longitude'|'latitude'
)>> {
  typeHabitation: null | {
    id: number | null;
  };
}

export interface CreateHousingFormType extends Omit<CreateHousingDto, (
  'typeHabitation'
)> {
  typeHabitationId: string;
}
