import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss', '../../admin.component.scss']
})
export class AddGenreComponent implements OnDestroy {

  addGenreForm: FormGroup;
  private addGenreSubscription?: Subscription;

  constructor(private adminService: AdminService, private fb: FormBuilder, private toastr: ToastrService) {
    this.addGenreForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(5)]],
      enName: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }

  onFormSubmit() {
    if (this.addGenreForm.valid) {
      this.addGenreSubscription = this.adminService.addGenre(this.addGenreForm.value).subscribe({
        next: (response) => {
          // console.log('Success!');
          // console.log(this.addGenreForm.value);
          this.toastr.success('Genre added!')
          this.addGenreForm.reset();

          Object.keys(this.addGenreForm.controls).forEach(controlName => {
            const control = this.addGenreForm.get(controlName);
            control?.setErrors(null);
          });

        },
        error: (error) => {
          this.toastr.error('Something went wrong...')
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.addGenreSubscription?.unsubscribe();
  }
}
