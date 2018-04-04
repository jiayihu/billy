import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export default class ModalComponent {
  @Input() disabled: boolean;
  @Input() isVisible: boolean;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

  success() {
    this.onSuccess.emit();
  }
}
