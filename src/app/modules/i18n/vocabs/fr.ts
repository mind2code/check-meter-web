// France
export const locale = {
  lang: 'fr',
  data: {
    LABEL: {
      LANGUAGE: 'Langue',
      CREATE: 'Créer',
      NEW: 'Nouveau',
      ADD: 'Ajouter',
      EDIT: 'Modifier',
      DELETE: 'Supprimer',
      VIEW: 'Voir',
      DETAILS: 'Détails',
      ACTIONS: 'Actions',
      SEARCH: 'Rechercher',
      OVERVIEW: "Vue d'ensemble",
      ELEMENT_COUNT: '{{count}} éléments',
      COMING_SOON: 'Bientôt disponible',
    },
    APP: {
      NAME: 'MonLoyer'
    },
    TRANSLATOR: {
      SELECT: 'choisissez votre langue',
    },
    MENU: {
      NEW: 'Nouveau',
      ACTIONS: 'Actes',
      CREATE_POST: 'Créer un nouveau Post',
      PAGES: 'Pages',
      FEATURES: 'Fonctionnalités',
      ADMIN: 'Administration',
      ADMIN_DATA: 'Données',
      SETTINGS: 'Paramètres',
      APPS: 'Applications',
      DASHBOARD: 'Tableau de Bord',
      TENANTS: 'Gestion des locataires',
      HOUSINGS: 'Gestion des habitations',
      CONTRACTS: 'Gestion des contracts',
    },
    AUTH: {
      USER: {
        PROFILE: 'Mon profil',
      },
      GENERAL: {
        OR: 'Ou',
        SUBMIT_BUTTON: 'Soumettre',
        NO_ACCOUNT: 'Ne pas avoir de compte?',
        SIGNUP_BUTTON: 'Registre',
        FORGOT_BUTTON: 'Mot de passe oublié',
        BACK_BUTTON: 'Back',
        PRIVACY: 'Privacy',
        LEGAL: 'Legal',
        CONTACT: 'Contact',
      },
      LOGIN: {
        TITLE: 'Se connecter',
        BUTTON: 'Connexion',
      },
      LOGOUT: {
        TITLE: 'Se déconnecter',
        BUTTON: 'Déconnexion',
      },
      FORGOT: {
        TITLE: 'Forgotten Password?',
        DESC: 'Enter your email to reset your password',
        SUCCESS: 'Your account has been successfully reset.'
      },
      REGISTER: {
        TITLE: 'Créer un compte',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfuly registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Fullname',
        PASSWORD: 'Mot de passe',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Nom d\'utilisateur'
      },
      VALIDATION: {
        INVALID: '{{name}} n\'est pas valide',
        REQUIRED: '{{name}} est requis',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
      }
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Nombre d\'enregistrements sélectionnés: ',
        ALL: 'All',
        SUSPENDED: 'Suspended',
        ACTIVE: 'Active',
        FILTER: 'Filter',
        BY_STATUS: 'by Status',
        BY_TYPE: 'by Type',
        BUSINESS: 'Business',
        INDIVIDUAL: 'Individual',
        SEARCH: 'Search',
        IN_ALL_FIELDS: 'in all fields'
      },
      ECOMMERCE: 'éCommerce',
      CUSTOMERS: {
        CUSTOMERS: 'Les clients',
        CUSTOMERS_LIST: 'Liste des clients',
        NEW_CUSTOMER: 'Nouveau client',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: 'Suppression du client',
          DESCRIPTION: 'Êtes-vous sûr de supprimer définitivement ce client?',
          WAIT_DESCRIPTION: 'Le client est en train de supprimer ...',
          MESSAGE: 'Le client a été supprimé'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: 'Supprimer les clients',
          DESCRIPTION: 'Êtes-vous sûr de supprimer définitivement les clients sélectionnés?',
          WAIT_DESCRIPTION: 'Les clients suppriment ...',
          MESSAGE: 'Les clients sélectionnés ont été supprimés'
        },
        UPDATE_STATUS: {
          TITLE: 'Le statut a été mis à jour pour les clients sélectionnés',
          MESSAGE: 'Le statut des clients sélectionnés a été mis à jour avec succès'
        },
        EDIT: {
          UPDATE_MESSAGE: 'Le client a été mis à jour',
          ADD_MESSAGE: 'Le client a été créé'
        }
      }
    },
    TENANT: {
      LABEL: {
        SINGLE: 'Locataire',
        PLURAL: 'Locataires',
      },
      FIELD: {
        solde: 'Solde',
      },
      RELATIONSHIP: {
      },
    },
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
        civilite: 'Civilité',
        genre: 'Genre',
        situationMatrimoniale: 'Situation matrimoniale',
        typePersonne: 'Type',
        carnetAdresse: "Carnet d'adresse",
      },
    },
    CONTRACT: {
      LABEL: {
        SINGLE: 'Contrat',
        PLURAL: 'Contrats',
      },
      FIELD: {
        identifiant: 'Identifiant',
        numeroExterneBail: 'Numéro de bail',
        dateSignatureContrat: 'Date de signature',
        dateDebutContrat: 'Date de début',
        dateFinContrat: 'Date de fin',
        montantPasDePorte: 'Montant pas de porte',
        montantCaution: 'Caution',
        montantAvance: 'Avance',
        envoiSms: 'Nofification par SMS',
        envoiEmail: 'Nofification par email',
        solde: 'Solde',
        observation: 'Observation',
      },
      RELATIONSHIP: {
        habitation: 'Habitation',
        personne: 'Personne',
      }
    },
    HOUSING: {
      LABEL: {
        SINGLE: 'Habitation',
        PLURAL: 'Habitations',
      },
      FIELD: {
        identifiant: 'Identifiant',
        description: 'Description',
        localisation: 'Localisation',
        superficie: 'Superficie',
        longitude: 'Longitude',
        latitude: 'Latitude',
      },
      RELATIONSHIP: {
        typeHabitation: 'Type',
      }
    },
    EXPIRY_NOTICE: {
      LABEL: {
        SINGLE: "Avis d'échéance",
        PLURAL: "Avis d'échéance",
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
    IDENTITY_DOCUMENT: {
      LABEL: {
        SINGLE: "Pièce d'identité",
        PLURAL: "Pièce d'identité",
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
    ADDRESS_BOOK: {
      LABEL: {
        SINGLE: `Carnet d'adresse`,
        PLURAL: `Carnets d'adresse`,
      },
      FIELD: {
        ville: 'Ville',
        quartier: 'Quartier',
        adresseGeographique: 'Situation geographique',
        adressePostale: 'Adresse postale',
        telephoneFixe: `Fixe`,
        telephoneMobile: 'Mobile',
        telephoneMobile2: 'Mobile 2',
        adresseEmail: 'Email',
      },
      RELATIONSHIP: {
        person: `Personne`,
      }
    },
    STATUS: {
      LABEL: {
        SINGLE: 'Statut',
        PLURAL: 'Statuts',
      },
      FIELD: {
        identifiant: 'Identifiant',
        libelle: 'Libellé',
        description: 'Description',
      },
    },
    HOUSING_TYPE: {
      LABEL: {
        SINGLE: "Type d'habitation",
        PLURAL: "Types d'habitation",
      },
      FIELD: {
        libelle: 'Libellé',
        description: 'Description',
      },
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
    IDENTITY_DOCUMENT_TYPE: {
      LABEL: {
        SINGLE: `Type de pièce d'identité`,
        PLURAL: `Types de pièce d'identité`,
      },
      FIELD: {
        identifiant: 'Identifiant',
        libelle: 'Libellé',
        description: 'Description',
        enabled: 'Actif',
      },
    },
    PERSON_TYPE: {
      LABEL: {
        SINGLE: `Type de personne`,
        PLURAL: `Type de personne`,
      },
      FIELD: {
        identifiant: 'Identifiant',
        libelle: 'Libellé',
        description: 'Description',
        estActif: 'Actif',
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
    ADMIN: {

    },
  }
};
