import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Review } from 'src/app/shared/models/review';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent {

  @Input() review?: Review;

  formatDate(date: string){
    return moment(date).format("YYYY-MM-DD");
  }
}
