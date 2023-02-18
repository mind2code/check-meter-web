export default {
  EXPIRY_NOTICE: {
    LABEL: {
      SINGLE: "Avis d'échéance",
      PLURAL: "Avis d'échéance",
      MAKE_PAYMENT: 'Effectuer un encaissement',
      PRINT_RECEIPT: 'Imprimer un reçu',
    },
    FIELD: {
      identifiant: 'Identifiant',
      dateEmission: "Date d'émission",
      loyer: 'Loyer',
      loyerRestant: 'Loyer restant',
      chargeMensuelleContractuelles: 'Charges mensuelles contractuelles',
      periodeConcernee: 'Période concernée',
      sommeDue: 'Somme due',
      dateExigibilite: "Date d'éligibilité",
      observation: 'Observation',
    },
    RELATIONSHIP: {
      statut: 'Statut',
      contrat: 'Contrat',
    }
  },

  RENT_RECEIPT: {
    LABEL: {
      SINGLE: 'Quittance de loyer',
      PLURAL: 'Quittances de loyer',
      RENT_COLLECTION: 'Encaissement de loyer',
      AMOUNT_COLLECTED: 'Montant encaissé',
    },
    FIELD: {
      identifiant: 'Identifiant',
      referenceQuittance: 'Référence',
      estAnnule: 'Paiement annulé',
      dateReglement: 'Date de règlement',
      montantRegle: 'Montant reglé',
      observation: 'Observation',
    },
    RELATIONSHIP: {
      avisEcheance: "Avis d'échéance",
      settlementType: 'Type de règlement',
    }
  },

  SETTLEMENT_TYPE: {
    LABEL: {
      SINGLE: 'Type de règlement',
      PLURAL: 'Types de règlement',
    },
    FIELD: {
      identifiant: 'Identifiant',
      libelle: 'Libellé',
      description: 'Description',
    },
  },
}
