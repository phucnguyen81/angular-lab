import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import * as rx from 'rxjs';

import { Hero } from 'app/api/hero';
import { NavService } from 'app/nav.service';
import { UnlessDirective } from 'app/unless/unless.directive';

import { HeroDetailComponent  } from './hero-detail.component';
import { HeroService } from './hero.service';

describe('HeroDetailComponent', () => {

  // entry point for testing
  let fixture: ComponentFixture<HeroDetailComponent>;

  // the component under test
  let component: HeroDetailComponent;

  // need a spy for heroSerice since we need to check
  // how it is called
  let heroServiceSpy: any;

  // just need a stub for navService since we don't need
  // to check how it is called
  let navServiceStub: Partial<NavService>;

  beforeEach(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['save']);
    heroServiceSpy.save.and.returnValue(rx.of({id: 1, name: 'Fantastic'}));

    navServiceStub = {
      data$: rx.of({
        hero: { id: 1, name: 'Spiderman' }
      }),
      goBack: () => {}
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ HeroDetailComponent, UnlessDirective ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: NavService, useValue: navServiceStub },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call service to save valid hero data', () => {
    const hostElement: HTMLElement = fixture.nativeElement;

    // let component pick up the input changes
    component.hero = { id: 1, name: 'Spiderman'} as Hero;
    component.mode = 'edit';
    fixture.detectChanges();

    // enter a new hero name name into the input box
    const nameInput: HTMLInputElement = hostElement.querySelector(
      'input#name'
    );
    expect(nameInput).toBeTruthy();
    expect(nameInput.value).toEqual('Spiderman');
    nameInput.value = 'Ironman';
    nameInput.dispatchEvent(new Event('input'));

    // submit the form to save hero detail
    const saveBtn: HTMLButtonElement = hostElement.querySelector(
      'button#save-hero'
    );
    saveBtn.dispatchEvent(new Event('click'));
    expect(heroServiceSpy.save).toHaveBeenCalledTimes(1);
    const callArgs = heroServiceSpy.save.calls.mostRecent().args;
    expect(callArgs[0]).toBeTruthy();
    expect(callArgs[0].name).toEqual('Ironman');
  });

});
