import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
  <h2 myHighlight="yellow">Something Yellow</h2>
  <h2 myHighlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [myHighlight]="box.value" value="cyan"/>`
})
class HightlightTestComponent { }

describe('HighlightDirective', () => {

  let fixture: ComponentFixture<HightlightTestComponent>;
  let des: DebugElement[];
  let bareH2: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HightlightTestComponent, HighlightDirective]
    });

    fixture = TestBed.createComponent(HightlightTestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // the h2 without the HighlightDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([myHighlight])'));
  });

  // color tests
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties.customProperty).toBeUndefined();
  });

});
