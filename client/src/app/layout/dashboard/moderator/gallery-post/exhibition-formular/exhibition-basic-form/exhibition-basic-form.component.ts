import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exhibition-basic-form',
  templateUrl: './exhibition-basic-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ExhibitionBasicFormComponent implements OnInit, OnChanges{
  @Input() exhibition?: Partial<ExhibitionDto>;
  @Output() exhibitionDraftSubmitted = new EventEmitter<Partial<ExhibitionDto>>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', [this.invalidDateFormatValidator, this.noFutureDateValidator]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exhibition'] && this.exhibition) {
      this.form.patchValue({
        title: this.exhibition.title,
        date: this.formatDate(this.exhibition.date)
      });
    }
  };

  ngOnInit(): void {
    console.log("Form Werte bei Initialisierung der ExhibitionBasicFormComponent: " + this.form.value)
  };

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

  private noFutureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (control.value && inputDate > today) {
      return { futureDate: true };
    }
    return null;
  }

  private invalidDateFormatValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const parsed = new Date(value);
    return value && isNaN(parsed.getTime()) ? { invalidDate: true } : null;
  }
}
