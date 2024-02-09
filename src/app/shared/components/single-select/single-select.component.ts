import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() selectList: { id: number, name: string, enName?: string }[] = [];
  @Input() localization = false;
  searchText: string = '';

  // Search string for filtering params
  searchCtrl = new FormControl();


  constructor(@Self() public controlDir: NgControl, public langService: LanguageService) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  get filteredList() {
    return this.selectList.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
