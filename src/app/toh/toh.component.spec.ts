import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { TohComponent } from './toh.component';

@Component({
  template: ''
})
class DashboardTestComponent { }

@Component({
  template: ''
})
class HeroesTestComponent { }

describe('TohComponent', () => {
  let component: TohComponent;
  let fixture: ComponentFixture<TohComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([
        { path: 'dashboard', component: DashboardTestComponent },
        { path: 'heroes', component: HeroesTestComponent },
      ]) ],
      declarations: [
        TohComponent,
        DashboardTestComponent,
        HeroesTestComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
