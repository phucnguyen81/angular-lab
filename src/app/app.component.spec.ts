import { APP_BASE_HREF } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { NavService } from 'app/nav.service';

import { AppComponent } from './app.component';

@Component({
  template: '<p>Hello</p>'
})
class HelloTestComponent { }

describe('AppComponent', () => {

  // the component under test
  let app: AppComponent;

  // entry point for testing
  let fixture: ComponentFixture<AppComponent>;

  // compileComponents() call can be asynchronous in some cases
  // (e.g. when the tests are not run with ng test). It is hence
  // common practice to wrap the compiling step in an async zone.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          { path: '', component: HelloTestComponent }
        ])
      ],
      declarations: [AppComponent, HelloTestComponent],
      providers: [
        NavService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeDefined();
  });

  it(`should have correct page title`, async(() => {
    expect(app.pageTitle).toEqual('Angular Lab');
  }));

  it('heading element should show the page title', () => {
    // Trigger angular change detection to bind app data to template.
    // Without this call, the h1 element text is not set to the app title.
    fixture.detectChanges();

    const heading: HTMLElement = fixture.nativeElement.querySelector('h1');
    const title: string = app.pageTitle
    expect(heading.textContent).toEqual(title);
  });

  it('heading element should show the page title - using DebugElement', () => {
    fixture.detectChanges();

    const host: DebugElement = fixture.debugElement;
    expect(host).toBeTruthy();

    const heading: DebugElement = host.query(ele => ele.name === 'h1');
    expect(heading).toBeTruthy();

    const title: string = app.pageTitle
    expect(heading.nativeElement.textContent).toEqual(title);
  });

});
