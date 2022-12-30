import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {ICreateAccount, inits} from "./create-account.helper";
import {PageInfoService, PageLink} from "../../../_metronic/layout";

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.scss']
})
export class ContratsComponent implements OnInit, OnDestroy {
  formsCount = 5;

  links: Array<PageLink> = [{
    title: 'Tableau de bord',
    path: '/',
    isActive: false,
  }, {
    title: 'Locataires',
    path: '/',
    isActive: false,
  }];
  account$: BehaviorSubject<ICreateAccount> =
    new BehaviorSubject<ICreateAccount>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
private unsubscribe: Subscription[] = [];

  constructor(private pageInfo: PageInfoService) {
    pageInfo.updateTitle('Nouveau Contrat');
    pageInfo.updateBreadcrumbs(this.links);
  }

  ngOnInit(): void {}

  updateAccount = (part: Partial<ICreateAccount>, isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = { ...currentAccount, ...part };
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
