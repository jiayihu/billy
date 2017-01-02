import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface IDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export default class DeactivateGuard implements CanDeactivate<IDeactivateComponent> {
  canDeactivate(component: IDeactivateComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
