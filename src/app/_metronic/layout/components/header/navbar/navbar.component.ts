import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'svg-icon-1';

  isAuthenticated$: Observable<boolean>;


  constructor(
    private readonly keycloak: KeycloakService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = from(this.keycloak.isLoggedIn());
  }
}
