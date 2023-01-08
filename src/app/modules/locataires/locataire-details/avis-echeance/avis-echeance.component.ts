import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AvisEncaisserComponent} from "./avis-encaisser/avis-encaisser.component";

@Component({
  selector: 'app-avis-echeance',
  templateUrl: './avis-echeance.component.html',
  styleUrls: ['./avis-echeance.component.scss']
})
export class AvisEcheanceComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private bsModalService: BsModalService) { }

  ngOnInit(): void {
  }

  encaisser() {
      this.bsModalRef = this.bsModalService.show(AvisEncaisserComponent);
      this.bsModalRef.content.event.subscribe((res: string) => {
        if(res === 'OK') {
          console.log('Encaissement effectué')
        }
      })
  }

}
