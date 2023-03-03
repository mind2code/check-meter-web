/**
 * fr => Type d'habitation
 */
export interface HousingType {
  id: number;
  libelle: string;
  description: string;
}

/**
 * fr => Habitation
 */
export interface Housing {
  id: number;
  identifiant: string;
  description: string;
  localisation: string;
  superficie: number;
  longitude: string;
  latitude: string;
  typeHabitation?: HousingType;
}
