import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { LanguageService } from 'src/app/core/services/language-service/language.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() selectList: { id: number, name: string, enName?: string }[] = [];
  @Input() localization = false;
  searchText: string = '';

  // Search string for filtering params
  searchCtrl = new FormControl();

  constructor(@Self() public controlDir: NgControl, public langService: LanguageService) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  get filteredList() {
    return this.selectList.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  removeItem(item: any) {
    const index = this.control.value.indexOf(item);
    if (index !== -1) {
      const value = [...this.control.value];
      value.splice(index, 1);
      this.control.setValue(value);
    }
  }

  getByIds(ids: number[], source: any[]): any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return source.find((item) => item.id == id);
    });
  }

}
