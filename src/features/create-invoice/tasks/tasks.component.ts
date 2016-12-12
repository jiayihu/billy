import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../services/store.service';

@Component({
  selector: 'tasks',
  template: require('./tasks.component.html'),
  styles: [require('./tasks.component.css')],
})
export default class TasksComponent {
  private newTask: ITask;

  @Input() tasks: ITask[] = [];
  @Output() onAddTask = new EventEmitter<ITask>();
  @Output() onEditTask = new EventEmitter<ITask>();
  @Output() onRemoveTask = new EventEmitter<string>();

  constructor() {
    this.newTask = {
      id: '',
      description: '',
      quantity: 0,
      price: 0,
      amount: 0,
    };
  }

  handleAddTask() {
    this.onAddTask.emit(this.newTask);
  }

  handleRemoveTask(taskId: string) {
    this.onRemoveTask.emit(taskId);
  }

  handleTaskChange(property: string, taskId: string, event: any) {
    const isNumberProp = property === 'quantity' || property === 'price';
    const newValue = isNumberProp ? Number(event.target.value) : event.target.value;
    const isNewTask = taskId === 'new-task';
    const task = isNewTask ? this.newTask : this.tasks.find(item => item.id === taskId);
    const updatedTask = Object.assign({}, task, {
      [property]: newValue,
    });

    if (isNumberProp) {
      updatedTask.amount = updatedTask.quantity * updatedTask.price;
    }

    if (isNewTask) {
      this.newTask = updatedTask;
      return;
    }

    this.onEditTask.emit(updatedTask);
  }

}
