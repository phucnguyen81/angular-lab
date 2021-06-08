import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function requiredField(fieldName = 'Field'): ValidatorFn {
  const validator = Validators.required;
  return (control: AbstractControl) => {
    if (!validator(control)) { return null; }
    return {
      requiredfield: {
        message: `${fieldName} is required`
      }
    };
  };
}

export function maxLen(length: number, fieldName = 'Field'): ValidatorFn {
  const validator = Validators.maxLength(length);
  return (control: AbstractControl) => {
    if (!validator(control)) { return null; }
    return {
      maxlen: {
        message: `${fieldName} must be at most ${length} characters long`
      }
    };
  };
}

export function forbiddenName(name: string, fieldName = 'Field'): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value !== name) { return null; }
    return {
      forbiddenname: {
        message: `${fieldName} cannot be ${name}`
      }
    };
  };
}
