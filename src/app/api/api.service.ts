import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { Hero } from './hero';

export const API_SERVICE = new InjectionToken<ApiService>('api.service');

export interface ApiService {

  getHeroes(): Observable<Hero[]>;

  getHero(id: number): Observable<Hero>;

  saveHero(hero: Hero): Observable<Hero>;

  deleteHero(hero: Hero): Observable<Hero>;

  searchHeroes(term: string): Observable<Hero[]>;

  isHeroNameTaken(name: string, id?: number): Observable<boolean>;

}
