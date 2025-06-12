import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  submitted = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;

      // Nur bestimmte Felder zurücksetzen
      form.controls['subject'].reset();
      form.controls['message'].reset();

      // Optional: Felder als "unberührt" setzen
      form.controls['subject'].markAsPristine();
      form.controls['message'].markAsPristine();
    }
  }
}
