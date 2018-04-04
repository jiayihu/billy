import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '@services/models/invoices.model';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export default class TasksComponent {
  newTask: ITask;

  @Input() tasks: ITask[] = [];
  @Output() onAddTask = new EventEmitter<ITask>();
  @Output() onEditTask = new EventEmitter<ITask>();
  @Output() onRemoveTask = new EventEmitter<string>();

  constructor() {
    this.newTask = this.getDefaultTask();
  }

  getDefaultTask(): ITask {
    return {
      id: '',
      description: '',
      quantity: 0,
      price: 0,
      amount: 0
    };
  }

  handleAddTask() {
    this.onAddTask.emit(this.newTask);
    this.newTask = this.getDefaultTask();
  }

  handleRemoveTask(taskId: string) {
    this.onRemoveTask.emit(taskId);
  }

  handleTaskChange(property: string, taskId: string, newValue: any) {
    const isNewTask = taskId === 'new-task';
    const task = isNewTask ? this.newTask : this.tasks.find(item => item.id === taskId);
    const updatedTask = Object.assign({}, task, {
      [property]: newValue
    });

    if (property === 'quantity' || property === 'price') {
      updatedTask.amount = updatedTask.quantity * updatedTask.price;
    }

    if (isNewTask) {
      this.newTask = updatedTask;
      return;
    }

    this.onEditTask.emit(updatedTask);
  }
}
