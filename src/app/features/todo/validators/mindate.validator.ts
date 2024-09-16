import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function minDateValidator(minDate: Date): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const inputDate = new Date(control.value).setHours(0, 0, 0, 0);
		const compareDate = minDate.setHours(0, 0, 0, 0);
		
		return inputDate < compareDate ? { minDate: { value: control.value, minDate: minDate } } : null;
	}
}
