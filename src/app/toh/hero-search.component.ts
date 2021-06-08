import { Component } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import * as op from 'rxjs/operators';

import { Hero } from 'app/api/hero';

import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroService]
})
export class HeroSearchComponent {
  private readonly searchTerms = new Subject<string>();

  // debounceTime(300): wait for 300ms between events
  // distinctUntilChanged(): ignore if next search term is same as previous
  // switchMap(): switch from search terms to search results
  heroes: Observable<Hero[]> = this.searchTerms.pipe(
    op.debounceTime(300),
    op.distinctUntilChanged(),
    op.switchMap(term => {
      if (term) {
        return this.heroService.search(term);
      } else {
        return of<Hero[]>([]);
      }
    }),
    op.catchError(error => {
      // TODO: real error handling
      console.log(`Error in component ... ${error}`);
      return of<Hero[]>([]);
    }),
    op.shareReplay(1),
  );

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    // Send search term into input stream
    this.searchTerms.next(term);
  }

  gotoDetail(hero: Hero): void {
    this.heroService.gotoDetail(hero.id);
  }
}
