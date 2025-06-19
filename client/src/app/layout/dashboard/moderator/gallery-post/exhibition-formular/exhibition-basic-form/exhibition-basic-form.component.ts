import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exhibition-basic-form',
  templateUrl: './exhibition-basic-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ExhibitionBasicFormComponent {
  @Input() exhibition?: Partial<ExhibitionDto>;
  @Output() exhibitionDraftSubmitted = new EventEmitter<Partial<ExhibitionDto>>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: [{value: '', disabled: true}], // optional
    });
  }

  ngOnInit(): void {
    if (this.exhibition) {
      this.form.patchValue({
        title: this.exhibition.title,
        date: this.formatDate(this.exhibition.date)
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.exhibitionDraftSubmitted.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private formatDate(date?: string | Date): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // → "2025-06-18"
  }
}
