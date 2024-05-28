import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';

export function codeValidator(dataBaseService: ProductService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const code = control.value;
    return dataBaseService.checkCodeExists(code).pipe(
      map(exists => (exists ? { codeExists: true } : null))
    );
  };
}

export function nameValidator(dataBaseService: ProductService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const code = control.value;
    return dataBaseService.checkNameExists(code).pipe(
      map(exists => (exists ? { nameExists: true } : null))
    );
  };
}
