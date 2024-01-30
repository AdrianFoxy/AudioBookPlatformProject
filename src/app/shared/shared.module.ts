import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TextInputV2Component } from './components/text-input-v2/text-input-v2.component';
import { MorelessComponent } from './components/moreless/moreless.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [
    RecommendationsComponent,
    PagingHeaderComponent,
    PagerComponent,
    AudioPlayerComponent,
    TextInputComponent,
    TextInputV2Component,
    MorelessComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatDialogModule, MatTableModule, MatDividerModule, MatIconModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports:[
    RecommendationsComponent,
    PagingHeaderComponent,
    PaginationModule,
    PagerComponent,
    AudioPlayerComponent,
    TranslateModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    TextInputV2Component,
    MorelessComponent,
    MatProgressSpinnerModule,
    ImageUploadComponent
  ]
})
export class SharedModule { }
