import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import * as op from 'rxjs/operators';

import { Hero } from 'app/api/hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  fontSizePx = 16;

  readonly heroes$: Observable<Hero[]> = this.heroService.getHeroes().pipe(
    op.map(heroes => heroes.slice(1, 5))
  );

  constructor(private heroService: HeroService) {}

  gotoDetail(hero: Hero): void {
    this.heroService.gotoDetail(hero.id);
  }

}
