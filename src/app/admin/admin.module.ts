import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { GenreComponent } from './genre/genre.component';
import { AddGenreComponent } from './genre/add-genre/add-genre.component';
import { EditGenreComponent } from './genre/edit-genre/edit-genre.component';
import { NarratorComponent } from './narrator/narrator.component';
import { AddNarratorComponent } from './narrator/add-narrator/add-narrator.component';
import { EditNarratorComponent } from './narrator/edit-narrator/edit-narrator.component';


@NgModule({
  declarations: [
    AdminComponent,
    GenreComponent,
    AddGenreComponent,
    EditGenreComponent,
    NarratorComponent,
    AddNarratorComponent,
    EditNarratorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgChartsModule,
    MatCardModule,
    MatIconModule,
    SharedModule
  ]
})
export class AdminModule { }
