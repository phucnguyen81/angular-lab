import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as op from 'rxjs/operators';
import * as rx from 'rxjs';
import { Observable, Subscription } from 'rxjs';

import { ComponentBase } from './component-base';
import { NavService } from './nav.service';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ComponentBase implements OnInit {
  readonly pageTitle = 'Angular Lab';

  constructor(private navService: NavService, private titleService: Title) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.navService.data$.pipe(
        op.map(data => (data.title || '')),
        op.distinctUntilChanged(),
        op.tap(title => { this.titleService.setTitle(title); })
      )
    );
  }

}
