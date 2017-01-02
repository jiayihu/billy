import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import CustomersModel, { ICustomer } from '@services/models/customers.model';
import InvoicesModel, { IInvoice, ITask } from '@services/models/invoices.model';
import TaxesModel, { ITax } from '@services/models/taxes.model';
import { UserModel } from '@services/models';
import { IDeactivateComponent } from '@services/deactivate-guard.service';
import storage from '../../../utils/storage';
import * as moment from 'moment';
import isNaN = require('lodash/isNaN');
import maxBy = require('lodash/maxBy');
import set = require('lodash/fp/set');

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export default class CreateInvoiceComponent implements IDeactivateComponent {
  customers: ICustomer[];
  invoice: IInvoice;
  availableTaxes: ITax[];

  private dirty: boolean = false;

  private userSub: Subscription;
  private customersSub: Subscription;
  private taxesSub: Subscription;

  private editInvoice(path: string, value: any, skipDirty: boolean = false) {
    this.invoice = set(path, value, this.invoice) as IInvoice;
    this.dirty = skipDirty ? this.dirty : true;

    // @NOTE: we persist invoice tasks only in this phase of development
    if (path === 'tasks') storage.setItem('billy-tasks', value);
  }

  constructor(
    private customersModel: CustomersModel,
    private invoicesModel: InvoicesModel,
    private userModel: UserModel,
    private taxesModel: TaxesModel,
  ) {
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
    Observable.combineLatest(
      [this.invoicesModel.invoices$, this.taxesModel.taxes$],
      (invoices: IInvoice[], taxes: ITax[]) => ({ invoices, taxes })
    ).take(1).subscribe(state => {
      const storedTasks = storage.getItem('billy-tasks');
      const lastInvoice = maxBy(state.invoices, invoice => invoice.number);
      const number = lastInvoice ? lastInvoice.number + 1 : 1;

      this.invoice = {
        ...this.invoice,
        number,
        tasks: storedTasks || [],
        taxes: this.invoice.taxes.length ? this.invoice.taxes : state.taxes,
      };
    });

    this.customersSub = this.customersModel.customers$.subscribe(customers => {
      this.customers = customers;
      this.editInvoice('customer', this.getInvoiceCustomer(this.invoice, customers), true);
    });
    this.userSub = this.userModel.user$.subscribe(user => this.editInvoice('user', user, true));
    this.taxesSub = this.taxesModel.taxes$.subscribe(taxes => this.availableTaxes = taxes);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.customersSub.unsubscribe();
    this.taxesSub.unsubscribe();
  }

  canDeactivate() {
    if (this.dirty) return window.confirm('Your changes could be lost if you leave before saving.');

    return true;
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
    this.invoicesModel.addInvoice(this.invoice);
    this.dirty = false;
  }

  handleBusinessChange(newBusinessInfo): void {
    this.userModel.editUser(newBusinessInfo);
  }

  /**
   * Invoice customer event handlers
   */

  handleAddCustomer(newCustomer: ICustomer): void {
    this.customersModel.addCustomer(newCustomer);
  }

  handleEditCustomer(newCustomer: ICustomer): void {
    this.customersModel.editCustomer(newCustomer);
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
    const taskId = this.invoicesModel.generateId('TASK');
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
    const newTax = this.taxesModel.addTax();
    this.editInvoice('taxes', this.invoice.taxes.concat(newTax));
  }

  handleAddInvoiceTax(taxId: string) {
    const tax = this.availableTaxes.find(item => item.id === taxId);
    this.editInvoice('taxes', this.invoice.taxes.concat(tax));
  }

  handleEditTax(updatedTax: ITax) {
    const updatedTaxes = this.invoice.taxes.map(tax => {
      if (tax.id === updatedTax.id) return updatedTax;
      return tax;
    });

    this.editInvoice('taxes', updatedTaxes);
    this.taxesModel.editTax(updatedTax);
  }

  handleRemoveTax(taxId: string) {
    this.editInvoice('taxes', this.invoice.taxes.filter(tax => tax.id !== taxId));
  }

  handleNotesChange(notes: string) {
    this.editInvoice('notes', notes);
  }
}
