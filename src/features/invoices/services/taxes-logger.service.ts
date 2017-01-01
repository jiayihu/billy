import { Injectable } from '@angular/core';
import { ITax } from '@services/models/taxes.model';

@Injectable()
export default class TaxesLoggerService {
  log(tax: ITax) {
    console.group('Tax details');
    console.log(tax);
    console.groupEnd();
  }
}
