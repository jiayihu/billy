import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IUser {
  name: string;
  vat?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
}

@Injectable()
export default class StoreService {
  private userSource = new BehaviorSubject<IUser>(this.user);

  user: IUser;
  user$ = this.userSource.asObservable();

  constructor() {
    try {
      const storedUser = JSON.parse(localStorage.getItem('billy-user'));
      this.user = storedUser || { name: 'Giovanni Jiayi Hu' };
    } catch (ex) {
      this.user = { name: 'Giovanni Jiayi Hu' };
    }

    this.userSource.next(this.user);
  }

  setUser(updatedUser) {
    this.user = Object.assign(this.user, updatedUser);

    try {
      localStorage.setItem('billy-user', JSON.stringify(this.user));
    } catch (ex) {
      console.error('Could not save to localStorage.');
    }

    this.userSource.next(this.user);
  }
}
