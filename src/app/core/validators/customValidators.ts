import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static fileSizeValidator(maxSize: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const fileSize = control.value.size;
        if (fileSize > maxSize) {
          return { invalidSize: true };
        }
      }
      return null;
    };
  }

  static fileExtensionValidator(allowedExtensions: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const fileExtension = control.value.name.split('.').pop()?.toLowerCase();
        if (fileExtension && allowedExtensions.indexOf(fileExtension) === -1) {
          return { invalidExtension: true };
        }
      }
      return null;
    };
  }

  static nonZeroValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null && value <= 0) {
        return { nonZero: true };
      }
      return null;
    };
  }


}
