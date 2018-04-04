import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import CustomersModel, { ICustomer } from '@services/models/customers.model';

@Component({
  selector: 'customers',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export default class CustomersListComponent implements OnInit, OnDestroy {
  isEditing = false;
  editingCustomer: ICustomer;
  customers: ICustomer[];

  private customersSub: Subscription;

  constructor(private customersModel: CustomersModel) {}

  ngOnInit() {
    this.customersSub = this.customersModel.customers$.subscribe(customers => {
      this.customers = customers;

      if (this.editingCustomer) {
        this.editingCustomer = customers.find(customer => customer.id === this.editingCustomer.id);
      }
    });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }

  endEdit() {
    this.isEditing = false;
    this.editingCustomer = null;
  }

  handleCustomerDelete(id: string): void {
    this.customersModel.deleteCustomer(id);
  }

  handleCustomerEdit(id: string): void {
    this.isEditing = true;
    this.editingCustomer = this.customers.find(customer => customer.id === id);
  }

  handleEditEnd(formValue) {
    this.customersModel.editCustomer({
      ...formValue,
      id: this.editingCustomer.id
    });
    this.endEdit();
  }
}
