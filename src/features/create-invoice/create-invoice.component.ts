import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IUser, ICustomer, IInvoice, ITask, ITax } from '../../services/store.service';
import * as moment from 'moment';
import isNaN = require('lodash/isNaN');

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export default class CreateInvoiceComponent {
  private user: IUser;
  private customers: ICustomer[];
  private invoice: IInvoice;

  private storeSub: Subscription;
  private storeTaxes: ITax[];

  // @NOTE: Only for development
  private persistTasks() {
    window.localStorage.setItem('billy-tasks', JSON.stringify(this.invoice.tasks));
  }

  constructor(private storeService: StoreService) {
    const storedTasks = JSON.parse(window.localStorage.getItem('billy-tasks'));
    this.invoice = {
      id: '',
      customer: null,
      date: moment().format('DD/MM/YYYY'),
      location: 'Padova',
      notes: '',
      number: 1, // @TODO: update with latest invoice number + 1
      tasks: storedTasks || [],
      taxes: [],
      user: this.user,
    };
  }

  ngOnInit() {
    this.storeSub = this.storeService.store$.subscribe(store => {
      this.user = store.user;
      this.customers = store.customers;
      this.storeTaxes = store.taxes;

      this.setInvoiceCustomer(store.customers);
    });

    this.storeService.store$.take(1).subscribe(store => {
      if (this.invoice.taxes.length === 0) this.invoice.taxes = store.taxes;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  setInvoiceCustomer(customers: ICustomer[]) {
    const invoice = this.invoice;
    let invoiceCustomer: ICustomer;

    if (!invoice.customer && customers.length === 1) {
      // If there is no customer selected and only one available set it as default
      invoiceCustomer = customers[0];
    } else if (invoice.customer) {
      // The selected customer could be changed
      invoiceCustomer = customers.find(customer => customer.id === invoice.customer.id);
    }

    if (invoiceCustomer) {
      this.invoice = {
        ...invoice,
        customer: invoiceCustomer,
      };
    }
  }

  handleBusinessChange(newBusinessInfo): void {
    this.storeService.editUser(newBusinessInfo);
  }

  /**
   * Invoice customer event handlers
   */

  handleAddCustomer(newCustomer: ICustomer): void {
    this.storeService.addCustomer(newCustomer);
  }

  handleEditCustomer(newCustomer: ICustomer): void {
    this.storeService.editCustomer(newCustomer);
  }

  handleRemoveCustomer(): void {
    this.invoice = {
      ...this.invoice,
      customer: null,
    };
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    this.invoice = {
      ...this.invoice,
      customer: this.customers.find(customer => customer.id === selectedCustomerId),
    };
  }

  handleEditDate(newDate: string): void {
    this.invoice.date = newDate;
  }

  /**
   * Invoice location, date and number event listeners
   */

  handleEditLocation(newLocation: string): void {
    this.invoice.location = newLocation;
  }

  handleEditNumber(newNumber: number): void {
    if (isNaN(newNumber)) return;

    this.invoice.number = newNumber;
  }

  /**
   * Invoice tasks event listeners
   */

  handleAddTask(task: ITask) {
    const taskId = this.storeService.generateId('TASK');
    const newTask = Object.assign({}, task, { id: taskId });
    this.invoice = Object.assign({}, this.invoice, {
      tasks: this.invoice.tasks.concat(newTask),
    });
    this.persistTasks();
  }

  handleEditTask(updatedTask: ITask) {
    const updatedTasks = this.invoice.tasks.map(task => {
      if (task.id === updatedTask.id) return updatedTask;
      return task;
    });

    this.invoice = Object.assign({}, this.invoice, {
      tasks: updatedTasks,
    });
    this.persistTasks();
  }

  handleRemoveTask(taskId: string) {
    this.invoice = Object.assign({}, this.invoice, {
      tasks: this.invoice.tasks.filter(task => task.id !== taskId),
    });
    this.persistTasks();
  }

  /**
   * Invoice taxes event listeners
   */

  handleAddTax() {
    const newTax: ITax = {
      id: this.storeService.generateId('TAX'),
      name: `Tax #${this.storeTaxes.length + 1}`,
      rate: 0,
    };
    this.invoice = Object.assign({}, this.invoice, {
      taxes: this.invoice.taxes.concat(newTax),
    });
    this.storeService.addTax(newTax);
  }

  handleAddInvoiceTax(taxId: string) {
    const tax = this.storeTaxes.find(item => item.id === taxId);
    this.invoice = Object.assign({}, this.invoice, {
      taxes: this.invoice.taxes.concat(tax),
    });
  }

  handleEditTax(updatedTax: ITax) {
    const updatedTaxes = this.invoice.taxes.map(tax => {
      if (tax.id === updatedTax.id) return updatedTax;
      return tax;
    });

    this.invoice = Object.assign({}, this.invoice, {
      taxes: updatedTaxes,
    });
    this.storeService.editTax(updatedTax);
  }

  handleRemoveTax(taxId: string) {
    this.invoice = Object.assign({}, this.invoice, {
      taxes: this.invoice.taxes.filter(tax => tax.id !== taxId),
    });
  }

  handleNotesChange(notes: string) {
    this.invoice = Object.assign({}, this.invoice, {
      notes,
    });
  }
}
