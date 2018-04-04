/**
 * This is just a custom implementation of FormBuilder, built in Angular 2+. It's good learning to
 * use FormGroup and FormControl from scratch.
 * @see {https://angular.io/docs/ts/latest/api/forms/index/FormBuilder-class.html}
 */

import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rangeValidator } from '@utils/validate-number';

export interface IField {
  value?: string;
  name: string;
  label: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string | RegExp;
  range?: string;
  required?: boolean;
  onChange?: Function;
  controlType?: 'text' | 'number' | 'select';
}

export interface ISelectField extends IField {
  options: Array<{ label: string; value: string }>;
}

export function isSelectField(object: any): object is ISelectField {
  return object.options !== undefined;
}

@Injectable()
export default class FormBuilderService {
  buildFormGroup(fields: IField[]): FormGroup {
    const group = fields.reduce((acc, field) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.pattern) validators.push(Validators.pattern(field.pattern));
      if (field.range) {
        const [min, max] = field.range.split('-');
        validators.push(rangeValidator(Number(min), Number(max)));
      }

      acc[field.name] = new FormControl(field.value || '', validators);
      return acc;
    }, {});

    return new FormGroup(group);
  }
}
