export default {
  IDENTITY_DOCUMENT: {
    LABEL: {
      SINGLE: "Pièce d'identité",
      PLURAL: "Pièces d'identité",
    },
    FIELD: {
      numeroIdentite: 'Numéro de la pièce',
      numeroNNI: 'Numéro NNI',
      delivrePar: 'Délivré par',
      dateDelivrance: 'Date de délivrance',
      dateExpiration: `Date d'expiration`,
      estActif: 'Document actif',
    },
    RELATIONSHIP: {
      person: `Personne`,
      typePieceIdentite: `Type de pièce`,
    }
  },

  IDENTITY_DOCUMENT_TYPE: {
    LABEL: {
      SINGLE: `Type de pièce d'identité`,
      PLURAL: `Types de pièce d'identité`,
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
      estActif: 'Actif',
    },
  },
}
