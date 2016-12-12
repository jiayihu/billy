import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IUser, ICustomer, IInvoice, ITask } from '../../services/store.service';
import * as moment from 'moment';
import isNaN = require('lodash/isNaN');

@Component({
  selector: 'create-invoice',
  template: require('./create-invoice.component.html'),
  styles: [require('./create-invoice.component.css')],
})
export default class CreateInvoiceComponent {
  user: IUser;
  customers: ICustomer[];
  invoice: IInvoice;

  private storeSub: Subscription;

  // @NOTE: Only for development
  private persistTasks() {
    window.localStorage.setItem('billy-tasks', JSON.stringify(this.invoice.tasks));
  }

  constructor(private storeService: StoreService) {
    const storedTasks = JSON.parse(window.localStorage.getItem('billy-tasks'));
    this.invoice = {
      id: '',
      date: moment().format('DD/MM/YYYY'),
      location: 'Padova',
      number: 1, // @TODO: update with latest invoice number + 1
      tasks: storedTasks || [],
      user: this.user,
    };
    this.storeSub = storeService.store$.subscribe(store => {
      this.user = store.user;
      this.customers = store.customers;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
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
    this.storeService.editCustomer(newCustomer.id, newCustomer);
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

  handleEditNumber(newNumber: string): void {
    const number = Number(newNumber);
    if (isNaN(number)) return;

    this.invoice.number = number;
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
      if (task.id === updatedTask.id) {
        return Object.assign({}, task, updatedTask);
      }
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
}
