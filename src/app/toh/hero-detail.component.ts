import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import * as op from 'rxjs/operators';
import * as rx from 'rxjs';

import { ComponentBase } from 'app/component-base';
import { Hero } from 'app/api/hero';
import { NavService} from 'app/nav.service';

import { HeroDetailControl } from './hero-detail.control';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent extends ComponentBase implements OnInit {

  @Input() set hero(hero: Hero) {
    this.control.patchHero(hero);
  }

  @Input() set mode(mode: string) {
    if (mode === 'edit') {
      this.control.setEditMode();
    } else {
      this.control.setViewMode();
    }
  }

  @Output() close = new EventEmitter();

  // Leverage form for state management.
  readonly control = new HeroDetailControl();

  constructor(
    private heroService: HeroService, private navService: NavService
  ) {
    super();
  }

  ngOnInit(): void {
    this.control.setUniqueNameValidator((hero: Hero) => (
      this.heroService.isHeroNameTaken(hero.name, hero.id)
    ));

    this.subscribe(this.navService.data$.pipe(
      op.tap(data => {
        if (data.hero) {
          this.control.patchHero(data.hero);
          this.control.setNavigated();
          this.control.setEditMode();
        }
      })
    ));
  }

  saveHero(): void {
    // TODO check hero is valid
    const theHero: Hero = this.control.getHero();
    this.subscribe(this.heroService.save(theHero).pipe(
      op.tap((hero: Hero) => {
        this.control.patchHero(hero);
        this.close.emit(hero);
        this.goBack();
      }),
      op.catchError((err) => {
        // TODO make message service
        console.error(err);
        return rx.empty();
      })
    ))
  }

  goBack(): void {
    if (this.control.getNavigated()) {
      this.navService.goBack();
    }
  }

  // Only show errors after user has interacted with the control
  // TODO move this into validation folder
  shouldShowErrors(control?: AbstractControl): boolean {
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return this.shouldShowErrors(this.control);
  }

  // Get errors as an array
  // TODO move this into validation folder
  getErrors(control: AbstractControl): string[] {
    const errors: ValidationErrors = control.errors;
    // TODO upgrade tsconfig to use Object.values()
    return errors ? Object.keys(errors).map(key => errors[key]) : [];
  }

}
