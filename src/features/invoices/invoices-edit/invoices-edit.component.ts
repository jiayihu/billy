import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import { Subscription }  from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import StoreService, { ICustomer, IInvoice, ITask, ITax } from '@services/store.service';
import isNaN = require('lodash/isNaN');
import set = require('lodash/fp/set');

@Component({
  selector: 'invoices-edit',
  templateUrl: './invoices-edit.component.html',
  styleUrls: ['./invoices-edit.component.css'],
})
export default class InvoicesEditComponent implements OnInit, OnDestroy {
  customers: ICustomer[];
  storeTaxes: ITax[];
  invoice: IInvoice;

  private invoiceSub: Subscription;

  private editInvoice(path: string, value: any) {
    this.invoice = set(path, value, this.invoice) as IInvoice;
  }

  constructor(private storeService: StoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.invoiceSub = Observable.combineLatest(this.storeService.store$, this.route.params, (store, params) => {
      this.storeTaxes = store.taxes;
      this.customers = store.customers;

      const invoiceId = params['invoiceId'];
      return store.invoices.find(invoice => invoice.id === invoiceId);
    })
    .subscribe(invoice => this.invoice = invoice);
  }

  ngOnDestroy() {
    this.invoiceSub.unsubscribe();
  }

  handleSaveInvoice() {
    this.storeService.editInvoice(this.invoice);
  }

  handleBusinessChange(newBusinessInfo): void {
    const updatedUser = { ...this.invoice.user, ...newBusinessInfo };
    this.editInvoice('user', updatedUser);
  }

  handleAddCustomer(newCustomer: ICustomer): void {
    this.storeService.addCustomer(newCustomer);
  }

  handleEditCustomer(newCustomer: ICustomer): void {
    const updatedCustomer = { ...this.invoice.customer, ...newCustomer };
    this.editInvoice('customer', updatedCustomer);
  }

  handleRemoveCustomer(): void {
    this.editInvoice('customer', null);
  }

  handleSelectCustomer(selectedCustomerId: string): void {
    const newCustomer = this.customers.find(customer => customer.id === selectedCustomerId);
    this.editInvoice('customer', newCustomer);
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
  }

  handleRemoveTax(taxId: string) {
    this.editInvoice('taxes', this.invoice.taxes.filter(tax => tax.id !== taxId));
  }

  handleNotesChange(notes: string) {
    this.editInvoice('notes', notes);
  }
}
