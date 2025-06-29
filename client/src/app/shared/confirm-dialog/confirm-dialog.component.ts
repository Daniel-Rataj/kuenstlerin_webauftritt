import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  imports: [CommonModule],
  standalone:true
})
export class ConfirmDialogComponent {
  @Input() confirmClass = 'btn-primary';
  @Input() show = false;
  @Input() title = 'Bestätigung';
  @Input() message = 'Bist du sicher?';
  @Input() confirmText = 'Bestätigen';
  @Input() cancelText = 'Abbrechen';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onBackdropClick() {
    this.cancel.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  onConfirmClick() {
    this.confirm.emit();
  }
}
