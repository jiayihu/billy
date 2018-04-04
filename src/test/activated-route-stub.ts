import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export default class ActivatedRouteStub {
  private _testParams = {};
  private paramsSource = new BehaviorSubject(this._testParams);

  params = this.paramsSource.asObservable();

  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.paramsSource.next(params);
  }

  get snapshot() {
    return { params: this._testParams };
  }
}
