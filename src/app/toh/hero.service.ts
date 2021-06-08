import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, throwError as observableThrowError } from 'rxjs';
import * as op from 'rxjs/operators';

import { API_SERVICE, ApiService } from 'app/api/api.service';
import { Hero } from 'app/api/hero';
import { NavService } from 'app/nav.service';

@Injectable()
export class HeroService {

  constructor(
    @Inject(API_SERVICE) private apiService: ApiService,
    private navService: NavService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.apiService.getHeroes().pipe(
      op.catchError(this.handleError));
  }

  getHero(id: number): Observable<Hero> {
    return this.apiService.getHero(id);
  }

  getHeroFromNav(): Observable<Hero> {
    return this.navService.data$.pipe(
      op.map(data => data.hero),
      op.filter(hero => !!hero),
    );
  }

  save(hero: Hero): Observable<Hero> {
    return this.apiService.saveHero(hero);
  }

  delete(hero: Hero) {
    return this.apiService.deleteHero(hero).pipe(
      op.catchError(this.handleError)
    );
  }

  search(term: string): Observable<Hero[]> {
    return this.apiService.searchHeroes(term);
  }

  isHeroNameTaken(name: string, id?: number): Observable<boolean> {
    return this.apiService.isHeroNameTaken(name, id);
  }

  gotoDetail(heroId: number): void {
    this.navService.navigate(['/toh', 'detail', heroId]);
  }

  // TODO move handling errors into ApiService and use alert component
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
