import {
  FormArray, FormControl, FormGroup, Validators
} from '@angular/forms';


export class ProfileForm extends FormGroup {

  get firstName(): FormControl {
    return this.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.get('lastName') as FormControl;
  }
  get address(): FormGroup {
    return this.get('address') as FormGroup;
  }
  get street(): FormControl {
    return this.address.get('street') as FormControl;
  }
  get city(): FormControl {
    return this.address.get('city') as FormControl;
  }
  get state(): FormControl {
    return this.address.get('state') as FormControl;
  }
  get zip(): FormControl {
    return this.address.get('zip') as FormControl;
  }
  get aliases(): FormArray {
    return this.get('aliases') as FormArray;
  }
  get aliasControls(): FormControl[] {
    const aliases = this.get('aliases') as FormArray;
    return aliases.controls as FormControl[];
  }

  constructor() {
    super(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl(''),
        address: new FormGroup(
          {
            street: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl(''),
            zip: new FormControl(''),
          }
        ),
        aliases: new FormArray([
          new FormControl('')
        ])
      }
    );
  }

  addAlias(): FormControl {
    const control = new FormControl('');
    this.aliases.push(control);
    return control;
  }

}
