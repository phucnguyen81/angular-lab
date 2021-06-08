import { Component, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';

import * as op from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class NavService {

  // Stream of data attached to routes
  // TODO rename to dataChanges? to match Angular
  readonly data$: Observable<Data> = this.router.events.pipe(
    op.filter(event => event instanceof NavigationEnd),
    op.map(event => this.getRouteData()),
    op.shareReplay(1)
  );

  constructor(private router: Router) {}

  navigate(commands: any[]): Promise<boolean> {
    return this.router.navigate(commands);
  }

  goBack(): void {
    // TODO use Location service to decouple from browser `window`
    window.history.back();
  }

  // Get the data attached to current route.
  // Data can be static (see route configs) or dynamic (see route resolver).
  getRouteData(): Data {
    const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    let route: ActivatedRouteSnapshot = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data;
  }

}
