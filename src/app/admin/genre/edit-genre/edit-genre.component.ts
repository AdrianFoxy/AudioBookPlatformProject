import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Genre } from 'src/app/shared/models/adminModels/genre';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.scss', '../../admin.component.scss']
})
export class EditGenreComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription?: Subscription;
  genre?: Genre;

  constructor(private route: ActivatedRoute, private adminService: AdminService){
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          this.adminService.getGenreById(this.id)
          .subscribe({
            next: (response) => {
              this.genre = response;
            }
          })
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
