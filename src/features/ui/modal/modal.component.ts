import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  template: require('./modal.component.html'),
})
export default class Modal {
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }
}
