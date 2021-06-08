import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ComponentBase } from 'app/component-base';
import { Hero } from 'app/api/hero';

import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent extends ComponentBase implements OnInit {

  // TODO group these under a BehaviorSubject
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.addSubscription(
      this.heroService.getHeroes().subscribe(
        heroes => (this.heroes = heroes),
        error => (this.error = error)
      )
    );
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService.delete(hero).subscribe(res => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    }, error => (this.error = error));
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(hero: Hero): void {
    this.heroService.gotoDetail(hero.id);
  }

}
