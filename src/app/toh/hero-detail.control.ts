import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import * as op from 'rxjs/operators';
import * as rx from 'rxjs';
import { Observable } from 'rxjs';

import * as Validate from 'app/validation/validators';
import { Hero } from 'app/api/hero';

export class HeroDetailControl extends FormGroup {

  readonly idControl = new FormControl();

  readonly nameControl = new FormControl('', [
    Validate.requiredField('Name'),
    Validate.maxLen(10, 'Name'),
    Validate.forbiddenName('Doomsday', 'Name'),
  ]);

  private readonly heroControl = new FormGroup({
    id: this.idControl, name: this.nameControl
  }, this.getValidateIdentityRevealedFn());

  private readonly modeControl = new FormControl('view');

  private readonly navigatedControl = new FormControl(false);

  readonly changes = rx.merge(
    this.valueChanges.pipe(op.map(value => ({ value }))),
    this.statusChanges.pipe(op.map(status => ({ status }))),
  ).pipe(
    op.scan((acc, val) => ({ ...acc, ...val }), {}),
    op.startWith({}),
    op.shareReplay(1)
  );

  constructor() {
    super({});
    this.addControl('hero', this.heroControl);
    this.addControl('mode', this.modeControl);
    this.addControl('navigated', this.navigatedControl);
  }

  getHero(): Hero {
    return this.heroControl.getRawValue() as Hero;
  }

  patchHero(hero: Hero) {
    if (!hero) { throw new Error('Empty hero.'); }
    this.heroControl.patchValue(hero);
  }

  inViewMode(): boolean {
    return this.modeControl.value === 'view';
  }

  setViewMode(): void {
    this.modeControl.setValue('view');
    this.heroControl.disable();
  }

  setEditMode(): void {
    this.modeControl.setValue('edit');
    this.heroControl.enable();
  }

  getNavigated(): boolean {
    return this.navigatedControl.value;
  }

  setNavigated(): void {
    this.navigatedControl.setValue(true);
  }

  /**
   * This is an example of applying debounce to async validator. The timer
   * will send the request only once after the debounce-time (1 sec here).
   * If the next change comes before the debounce-time ends, the form
   * will (supposedly) unsubscribe the previous request (which has not yet
   * been sent) and start a new one.
   */
  setUniqueNameValidator(
    validator: (hero: Hero) => Observable<boolean>
  ): void {
    const validate = (heroName: string) => {
      return (isNameTaken: boolean) => {
        if (!isNameTaken) { return null; }
        return {
          heronametaken: { message: `Name ${heroName} is taken` }
        };
      }
    };
    this.heroControl.setAsyncValidators(() => {
      return rx.timer(1000).pipe(
        op.switchMap(() => {
          const hero = this.getHero();
          return validator(hero).pipe(op.map(validate(hero.name)));
        })
      )
    });
  }

  getValidateIdentityRevealedFn(): ValidatorFn {
    return () => {
      const id: string = '' + this.idControl.value;
      const name: string = this.nameControl.value;
      if (id !== name) { return null; }
      return {
        identityRevealed: {
          message: 'Name cannot match id'
        }
      };
    }
  }

}
