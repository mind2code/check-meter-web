export default {
  PERSON: {
    LABEL: {
      SINGLE: 'Personne',
      PLURAL: 'Personnes',
    },
    FIELD: {
      identifiant: 'Identifiant',
      nomComplet: 'Nom complet',
      nom: 'Nom',
      prenoms: 'Prénoms',
      nomJeuneFille: 'Nom de jeune fille',
      dateNaissance: 'Date de naissance',
      lieuNaissance: 'Lieu de naissance',
      estActif: 'Compte actif',
    },
    RELATIONSHIP: {
      nationalite: 'Nationalité',
      civilite: 'Civilité',
      genre: 'Genre',
      situationMatrimoniale: 'Situation matrimoniale',
      typePersonne: 'Type de personne',
      carnetAdresse: "Carnet d'adresse",
      pieceIdentite: `Pièces d'identité`,
    },
  },

  TENANT: {
    LABEL: {
      SINGLE: 'Locataire',
      PLURAL: 'Locataires',
      CREATE_TITLE: 'Ajouter un locataire',
    },
    FIELD: {
      solde: 'Solde',
    },
    RELATIONSHIP: {
    },
  },

  CIVILITY: {
    LABEL: {
      SINGLE: `Civilité`,
      PLURAL: `Civilités`,
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
      estActif: 'Actif',
    },
  },
  GENDER: {
    LABEL: {
      SINGLE: `Genre`,
      PLURAL: `Genres`,
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
      estActif: 'Actif',
    },
  },
  MARITAL_SITUATION: {
    LABEL: {
      SINGLE: `Situation matrimoniale`,
      PLURAL: `Situations matrimoniales`,
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
    },
  },

  PERSON_TYPE: {
    LABEL: {
      SINGLE: `Type de personne`,
      PLURAL: `Types de personne`,
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
      estActif: 'Actif',
    },
  },

  COUNTRY: {
    LABEL: {
      SINGLE: `Pays`,
      PLURAL: `Pays`,
      NATIONALITY: 'Nationalité',
      NATIONALITIES: 'Nationalités',
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
      estActif: 'Actif',
    },
  },

  ADDRESS_BOOK: {
    LABEL: {
      SINGLE: `Carnet d'adresse`,
      PLURAL: `Carnets d'adresse`,
      CONTACTS: `Contacts`,
    },
    FIELD: {
      ville: 'Ville',
      quartier: 'Quartier',
      adresseGeographique: 'Situation géographique',
      adressePostale: 'Adresse postale',
      telephoneFixe: `Fixe`,
      telephoneMobile: 'Mobile',
      telephoneMobile2: 'Mobile 2',
      adresseEmail: 'Email',
    },
    RELATIONSHIP: {
      typePieceIdentite: `Type de pièce`,
    }
  },
}
