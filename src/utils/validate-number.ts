import { FormControl, ValidatorFn } from '@angular/forms';
import isInt = require('validator/lib/isInt');

export function rangeValidator(min: number, max: number): ValidatorFn {
  return function(control: FormControl) {
    const options = { min, max };
    const error = {
      range: { min, max, valid: false }
    };

    return isInt(String(control.value), options) ? null : error;
  };
}
