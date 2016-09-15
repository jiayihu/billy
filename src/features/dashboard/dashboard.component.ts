import { Component, OnInit } from '@angular/core';
import StoreService, { IUser } from '../../services/store.service';

@Component({
  selector: 'dashboard',
  template: require('./dashboard.component.html'),
})
export default class DashboardComponent implements OnInit {
  user: IUser;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.user = this.storeService.getUser();
  }
}
