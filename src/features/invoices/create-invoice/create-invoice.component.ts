import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { ICustomer, IInvoice, ITask, ITax } from '@services/store.service';
import * as moment from 'moment';
import isNaN = require('lodash/isNaN');
import maxBy = require('lodash/maxBy');
import set = require('lodash/fp/set');

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export default class CreateInvoiceComponent {
  customers: ICustomer[];
  invoice: IInvoice;
  storeTaxes: ITax[];

  private storeSub: Subscription;

  private editInvoice(path: string, value: any) {
    this.invoice = set(path, value, this.invoice) as IInvoice;
  }

  constructor(private storeService: StoreService) {
    this.invoice = {
      id: '',
      customer: null,
      date: moment().format('DD/MM/YYYY'),
      location: 'Location',
      notes: '',
      number: 1,
      tasks: [],
      taxes: [],
      user: null,
    };
  }

  ngOnInit() {
    this.storeService.store$.take(1).subscribe(store => {
      const storedTasks = JSON.parse(window.localStorage.getItem('billy-tasks'));
      const lastInvoice = maxBy(store.invoices, invoice => invoice.number);
      const number = lastInvoice ? lastInvoice.number + 1 : 1;

      this.invoice = {
        ...this.invoice,
        number,
        tasks: storedTasks || [],
        taxes: this.invoice.taxes.length ? this.invoice.taxes : store.taxes,
      };
    });

    this.storeSub = this.storeService.store$.subscribe(store => {
      this.customers = store.customers;
      this.storeTaxes = store.taxes;

      this.invoice = {
        ...this.invoice,
        customer: this.getInvoiceCustomer(this.invoice, store.customers),
        user: store.user,
      };
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  getInvoiceCustomer(invoice: IInvoice, customers: ICustomer[]) {
    let invoiceCustomer: ICustomer = invoice.customer;

    if (!invoice.customer && customers.length === 1) {
      // If there is no customer selected and only one available set it as default
      invoiceCustomer = customers[0];
    } else if (invoice.customer) {
      // The selected customer could be changed
      invoiceCustomer = customers.find(customer => customer.id === invoice.customer.id);
    }

    return invoiceCustomer;
  }

  handleSaveInvoice() {
    this.storeService.addInvoice(this.invoice);
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
    this.editInvoice('customer', null);
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    this.editInvoice('customer', this.customers.find(customer => customer.id === selectedCustomerId));
  }

  /**
   * Invoice location, date and number event listeners
   */

  handleEditDate(newDate: string): void {
    this.editInvoice('date', newDate);
  }

  handleEditLocation(newLocation: string): void {
    this.editInvoice('location', newLocation);
  }

  handleEditNumber(newNumber: number): void {
    if (isNaN(newNumber)) return;

    this.editInvoice('number', newNumber);
  }

  /**
   * Invoice tasks event listeners
   */

  handleAddTask(task: ITask) {
    const taskId = this.storeService.generateId('TASK');
    const newTask = Object.assign({}, task, { id: taskId });
    this.editInvoice('tasks', this.invoice.tasks.concat(newTask));
  }

  handleEditTask(updatedTask: ITask) {
    const updatedTasks = this.invoice.tasks.map(task => {
      if (task.id === updatedTask.id) return updatedTask;
      return task;
    });

    this.editInvoice('tasks', updatedTasks);
  }

  handleRemoveTask(taskId: string) {
    this.editInvoice('tasks', this.invoice.tasks.filter(task => task.id !== taskId));
  }

  /**
   * Invoice taxes event listeners
   */

  handleAddTax() {
    const newTax = this.storeService.addTax();
    this.editInvoice('taxes', this.invoice.taxes.concat(newTax));
  }

  handleAddInvoiceTax(taxId: string) {
    const tax = this.storeTaxes.find(item => item.id === taxId);
    this.editInvoice('taxes', this.invoice.taxes.concat(tax));
  }

  handleEditTax(updatedTax: ITax) {
    const updatedTaxes = this.invoice.taxes.map(tax => {
      if (tax.id === updatedTax.id) return updatedTax;
      return tax;
    });

    this.editInvoice('taxes', updatedTaxes);
    this.storeService.editTax(updatedTax);
  }

  handleRemoveTax(taxId: string) {
    this.editInvoice('taxes', this.invoice.taxes.filter(tax => tax.id !== taxId));
  }

  handleNotesChange(notes: string) {
    this.editInvoice('notes', notes);
  }
}
