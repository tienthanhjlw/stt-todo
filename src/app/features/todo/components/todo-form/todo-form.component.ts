import { Component, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { DATE_FORMAT, DEFAULT_PRIORITY, PRIORITY_OPTIONS, TODAY } from './todo-form.config';
import { minDateValidator } from '../../validators/mindate.validator';
import { FormFieldComponent } from '@shared/components';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
		DatePipe,
		ReactiveFormsModule,
		FormFieldComponent
	],
	providers: [
		DatePipe
	],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  submitLabel = input<string>('Add');
  value = input<Todo | null>(null);
  formValueSubmit = output<Omit<Todo, 'id'>>();
  
  formGroup: FormGroup;

	priorityOptions = PRIORITY_OPTIONS;

  constructor(
		private fb: FormBuilder,
		private datePipe: DatePipe
	) {
    this.formGroup = this.createFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.formGroup.patchValue(this.value() ?? {});
    }
  }

  onSubmit() {
    this.formValueSubmit.emit(this.formGroup.value);
		this.formGroup.reset({
			dueDate: this.datePipe.transform(TODAY(), DATE_FORMAT),
			piority: DEFAULT_PRIORITY
		});
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [this.datePipe.transform(TODAY(), DATE_FORMAT), [Validators.required, minDateValidator(TODAY())]],
      piority: [DEFAULT_PRIORITY, [Validators.required]]
    });
  }
}
