import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './in-memory-data.service';
import { Hero } from 'app/api/hero';

describe('InMemoryDataService', () => {
  let httpClient: HttpClient;

  beforeEach(async(() => {
    // wait for compileComponents since it is async
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {
            dataEncapsulation: false,
            delay: 300,
            passThruUnknownUrl: true
          }
        )
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // TODO upgrade angular and replace with TestBed.inject
    httpClient = TestBed.get(HttpClient);
  });

  it('should get array of heroes', (done: DoneFn) => {
    let heroes: Hero[];
    let error: any;
    expect(httpClient).toBeTruthy();
    httpClient.get<Hero[]>('app/heroes').pipe().subscribe(
      resp => heroes = resp,
      err => error = err,
      () => {
        expect(error).toBeFalsy();
        expect(heroes).toBeTruthy();
        heroes.forEach(hero => expect(hero.id).toBeTruthy());
        done();
      }
    );
  });
});
