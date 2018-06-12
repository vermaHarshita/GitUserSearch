import { Component, OnInit } from '@angular/core';

import { routeAnimations } from '@app/core';

@Component({
  selector: 'gusrs-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  animations: [routeAnimations]
})
export class PageContainerComponent implements OnInit {
  pages = [
    { link: 'search', label: 'Search' },
    { link: 'history', label: 'History' },
  ];

  constructor() {}

  ngOnInit() {}
}
