import { Injectable } from '@angular/core';

export interface IUser {
  firstName: string;
  lastName: string;
}

@Injectable()
export default class StoreService {
  user: IUser;

  constructor() {
    this.user = {
      firstName: 'Jiayi',
      lastName: 'Hu',
    };
  }

  getUser() {
    return this.user;
  }
}
