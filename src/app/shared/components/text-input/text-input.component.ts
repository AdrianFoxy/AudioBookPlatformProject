import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';
  @Input() defaultValue?: string;

  constructor(@Self() public controlDir: NgControl){
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    if (this.defaultValue !== undefined) {
      this.control.setValue(this.defaultValue);
    }
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control():FormControl{
    return this.controlDir.control as FormControl
  }

  getControlErrors(control: AbstractControl): string[] {
    const errors: string[] = [];
    if (control.errors) {
      for (const errorKey of Object.keys(control.errors)) {
        errors.push(control.errors[errorKey]);
      }
    }
    return errors;
  }



}
