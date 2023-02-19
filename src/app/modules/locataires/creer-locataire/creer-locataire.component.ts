import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {ICreateAccount, inits} from "./create-locataire.helper";
import {PageInfoService, PageLink} from "../../../_template/layout";

@Component({
  selector: 'app-creer-locataire',
  templateUrl: './creer-locataire.component.html',
  styleUrls: ['./creer-locataire.component.scss']
})
export class CreerLocataireComponent implements OnInit, OnDestroy {

  links: Array<PageLink> = [{
    title: 'Tableau de bord',
    path: '/',
    isActive: false,
  }, {
    title: 'Locataires',
    path: '/',
    isActive: false,
  }];
  formsCount = 3;
  account$: BehaviorSubject<ICreateAccount> =
    new BehaviorSubject<ICreateAccount>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private unsubscribe: Subscription[] = [];

  constructor(private pageInfo: PageInfoService) {
    pageInfo.updateTitle('Nouveau Locataire');
    pageInfo.updateBreadcrumbs(this.links);
  }

  ngOnInit(): void {}

  updateAccount = (part: Partial<ICreateAccount>, isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = { ...currentAccount, ...part };
    console.log('updateAccount parent -> ' + JSON.stringify(updatedAccount));
    this.account$.next(updatedAccount);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
