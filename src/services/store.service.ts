import { Injectable } from '@angular/core';

export class User {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

@Injectable()
export default class StoreService {
  user: User;

  constructor() {
    this.user = new User('Jiayi', 'Hu');
  }

  getUser() {
    return this.user;
  }
}
