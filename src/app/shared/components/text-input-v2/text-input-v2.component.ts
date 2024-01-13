import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input-v2',
  templateUrl: './text-input-v2.component.html',
  styleUrls: ['./text-input-v2.component.scss']
})
export class TextInputV2Component implements ControlValueAccessor{

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
