import { Injectable } from '@angular/core';

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
  user: IUser;

  constructor() {
    this.user = {
      name: 'Giovanni Jiayi Hu',
    };
  }

  getUser() {
    return this.user;
  }
}
