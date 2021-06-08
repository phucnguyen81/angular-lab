import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot
} from '@angular/router';
import { empty, Observable } from 'rxjs';

import { Hero } from 'app/api/hero';

import { HeroService } from './hero.service';

@Injectable()
export class HeroResolver implements Resolve<Hero> {
  constructor(private service: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const heroId = +route.paramMap.get('id');
    if (heroId === undefined) { return empty(); }
    return this.service.getHero(heroId);
  }

}
