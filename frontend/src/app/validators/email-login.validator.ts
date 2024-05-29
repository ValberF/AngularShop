import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailLoginValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const value = control.value;

    if (!value) {
      return { required: true };
    }

    if (value.length < 6) {
      return { minLength: true };
    }

    if (!emailRegex.test(value)) {
      return { invalidEmailFormat: true };
    }

    return null;
  };
}
