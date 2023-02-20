import PERSON from './fr/person';
import CONTRACT from './fr/contract';
import HOUNSING from './fr/housing';
import STATUS from './fr/status';
import IDENTITY_DOCUMENT from './fr/identity-document';
import EXPIRY_NOTICE from './fr/expiry-notice';
import AUTH from './fr/auth';
import ECOMMERCE from './fr/ecommerce';

// France
export const locale = {
  lang: 'fr',
  data: {
    ...PERSON,
    ...CONTRACT,
    ...HOUNSING,
    ...IDENTITY_DOCUMENT,
    ...EXPIRY_NOTICE,
    ...STATUS,
    ...AUTH,
    ...ECOMMERCE,
    LABEL: {
      LANGUAGE: 'Langue',
      CREATE: 'Créer',
      NEW: 'Nouveau',
      ADD: 'Ajouter',
      EDIT: 'Modifier',
      DELETE: 'Supprimer',
      REMOVE: 'Supprimer',
      VIEW: 'Voir',
      DETAILS: 'Détails',
      ACTIONS: 'Actions',
      SEARCH: 'Rechercher',
      OVERVIEW: "Vue d'ensemble",
      ELEMENT_COUNT: '{{count}} éléments',
      COMING_SOON: 'Bientôt disponible',
      ACTIVE: 'Actif',
      INACTIVE: 'Inactif',
      GENERATE: 'Générer',
      CASH_OUT: 'Encaisser',
      SAVE: 'Enrégistrer',
      CANCEL: 'Annuler',
      SELECT_OPTION: '--Sélectionnez--'
    },
    MESSAGE: {
      ELEMENT_COUNT: '{{count}} éléments',
      COMING_SOON: 'Bientôt disponible',
      LOADING: 'Chargement en cours...',
      ERROR_OCCUR: 'Une error est survenue',
      ERROR_OCCUR_WHILE: 'Une error est survenue {{while}}',
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
      EXPIRY_NOTICES: `Gestion des avis d'échéance`,
    },
  },
};
