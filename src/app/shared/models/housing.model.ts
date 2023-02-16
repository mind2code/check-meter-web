/**
 * fr => Type d'habitation
 */
export interface HousingType {
  id: string;
  libelle: string;
  description: string;
}

/**
 * fr => Habitation
 */
export interface Housing {
  id: string;
  identifiant: string;
  description: string;
  localisation: string;
  superficie: number;
  longitude: string;
  latitude: string;
  typeHabitation?: HousingType;
}
