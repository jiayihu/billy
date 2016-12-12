import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'money',
})
export default class MoneyPipe implements PipeTransform {
  // @TODO: replace the hard-coded 'en-US'. Maybe check i18n doc.
  // @see {https://angular.io/docs/ts/latest/cookbook/i18n.html}
  decimalPipe: DecimalPipe = new DecimalPipe('en-US');

  transform(value: number) {
    return this.decimalPipe.transform(value, '1.2-2');
  }
}
