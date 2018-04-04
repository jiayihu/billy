import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, Validator, Validators, NG_VALIDATORS } from '@angular/forms';
import { rangeValidator } from '@utils/validate-number';

@Directive({
  selector: '[validateRange][ngModel], [validateRange][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RangeValidatorDirective),
      multi: true
    }
  ]
})
export default class RangeValidatorDirective implements Validator, OnChanges {
  @Input('validateRange') range: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['range']) {
      const [min, max] = this.range.split('-');
      this.valFn = rangeValidator(Number(min), Number(max));
    }
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
