import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overviews',
  templateUrl: './overviews.component.html',
  styleUrls: ['./overviews.component.scss']
})
export class OverviewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /* this.route.parent.params.subscribe(params => {
      this.parentRouteId = +params["id"];
      console.log(this.parentRouteId);
    }); */
  }

}
