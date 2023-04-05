export interface Meters {
    id: string;
    dr: string;
    secteur: string;
    tournee: string;
    reference_client: string;
    reference_contrat: string;
    nom_abonne: string;
    prenoms_abonne: string;
    contact: string;
    contact_secondaire: string;
    compteur: string;
    reglage_disjoncteur: string;
    situation_geographique: string;
    type_compteur: string;
    coordonnees: Coordonnes;
    agent: string;
}

export interface Coordonnes {
    longitude: string;
    latitude: string;
}