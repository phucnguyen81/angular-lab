import { Injectable } from '@angular/core';

import { empty, Observable, of, throwError, timer } from 'rxjs';
import * as op from 'rxjs/operators';

import { ApiService } from './api.service';
import { Hero } from './hero';

@Injectable()
export class ApiDevService implements ApiService {

  private heroCount = 0;

  private heroes: Hero[] = [
    this.newHero('Superman'),
    this.newHero('Batman'),
    this.newHero('Ironman'),
    this.newHero('Spiderman'),
    this.newHero('Incredible'),
  ];

  // Create a new hero with unique id
  private newHero(name: string): Hero {
    return { id: ++this.heroCount, name };
  }

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes).pipe(op.delay(1000));
  }

  // TODO throw error for hero not found
  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      op.map(heroes => heroes.find(hero => hero.id === id)),
      op.delay(200)
    );
  }

  saveHero(hero: Hero): Observable<Hero> {
    if (hero.id) { return this.put(hero); }
    return this.post(hero);
  }

  deleteHero(hero: Hero): Observable<Hero>  {
    if (hero) {
      this.heroes = this.heroes.filter(aHero => aHero.id !== hero.id);
    }
    return of(null).pipe(op.delay(200));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term) { return empty(); }
    const matches: Hero[] = this.heroes.filter(
      hero => ((hero.name || '').toUpperCase().includes(term.toUpperCase()))
    );
    return of(matches).pipe(op.delay(500));
  }

  isHeroNameTaken(name: string, id?: number): Observable<boolean> {
    const foundHero = this.heroes.find(
      hero => hero.id !== id && hero.name === name
    );
    return of(!!foundHero).pipe(op.delay(500));
  }

  // Add a new hero
  // TODO return error stream on invalid hero data
  private post(hero: Hero): Observable<Hero> {
    const newHero = this.newHero(hero.name);
    this.heroes.push(newHero);
    return of(newHero).pipe(op.delay(200));
  }

  // Update existing Hero
  // TODO return error stream on invalid hero data
  private put(hero: Hero): Observable<Hero> {
    const theHero: Hero = this.heroes.find(aHero => aHero.id === hero.id);
    if (theHero) {
      theHero.name = hero.name;
      return of(theHero).pipe(op.delay(200));
    }
    return timer(300).pipe(
      op.switchMap(() => throwError('Hero not found'))
    );
  }

}
