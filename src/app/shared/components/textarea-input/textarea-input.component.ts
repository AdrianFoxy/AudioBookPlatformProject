import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss']
})
export class TextareaInputComponent implements ControlValueAccessor{

  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() default_value = ''

  constructor(@Self() public controlDir: NgControl){
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl{
    return this.controlDir.control as FormControl
  }
}
