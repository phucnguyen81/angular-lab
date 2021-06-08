import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import * as op from 'rxjs/operators';

import { ApiService } from './api.service';
import { Hero } from './hero';

@Injectable()
export class ApiProdService implements ApiService {

  private heroesUrl = 'app/heroes'; // URL to web api

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      op.map(data => data), op.delay(1000)
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      op.map(heroes => heroes.find(hero => hero.id === id))
    );
  }

  saveHero(hero: Hero): Observable<Hero> {
    if (hero.id) { return this.put(hero); }
    return this.post(hero);
  }

  deleteHero(hero: Hero): Observable<Hero>  {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url);
  }

  isHeroNameTaken(name: string, id?: number): Observable<boolean> {
    return this.getHeroes().pipe(
      op.switchMap((heroes: Hero[]) => {
        const foundHero = heroes.find(
          hero => hero.id !== id && hero.name === name
        );
        return of(!!foundHero);
      })
    );
  }

  // Add a new hero
  private post(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero);
  }

  // Update existing Hero
  private put(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero);
  }

}
