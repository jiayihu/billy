import { Injectable } from '@angular/core';

@Injectable()
export default class LoggerService {
  /** Log any value */
  log(value: any) {
    console.log(value);
  }
}
