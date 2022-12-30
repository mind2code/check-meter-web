import {TypePersonne} from "../../parametrage/type-personne/model/type-personne.model";

interface ICreateAccount {
  accountType: 'personal' | 'corporate';
  typePersonne: number;
  civilite: number;
  nom?: string;
  prenoms?: string;
  nomJeuneFille?: string;
  dateNaissance: Date;
  lieuNaissance?: string;
  genre: number;
  situationMatrimoniale: number;
}

const inits: ICreateAccount = {
  accountType: 'personal',
  typePersonne: 0,
  civilite: 0,
  nom: '',
  prenoms: '',
  nomJeuneFille: '',
  dateNaissance: new Date("2019-01-16"),
  lieuNaissance: '',
  genre: 0,
  situationMatrimoniale: 0
};

export { ICreateAccount, inits };
