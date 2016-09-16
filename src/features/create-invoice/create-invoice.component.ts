import { Component, OnInit } from '@angular/core';
import StoreService, { User } from '../../services/store.service';

@Component({
  selector: 'create-invoice',
  template: require('./create-invoice.component.html'),
})
export default class CreateInvoiceComponent implements OnInit {
  user: User;
  isModalVisible: boolean = false;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.user = this.storeService.getUser();
  }

  onModalClose() {
    this.isModalVisible = false;
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
