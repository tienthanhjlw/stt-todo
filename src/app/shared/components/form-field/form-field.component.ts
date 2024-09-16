import { Component, Input, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';

interface ErrorMessage {
  errorKey: string;
  errorMessage: string;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label?: string;
  @Input() errorMessages: ErrorMessage[] = [];

  @ContentChild(NgControl) control?: NgControl;

  getErrorMessage(): string {
    if (!this.control?.errors) return '';
    
    const errorKey = Object.keys(this.control.errors)[0];
    const error = this.errorMessages.find(e => e.errorKey === errorKey);
    
    return error ? error.errorMessage : 'This field is invalid';
  }
}
