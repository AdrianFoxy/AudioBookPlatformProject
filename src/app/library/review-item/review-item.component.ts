import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { AccountService } from 'src/app/account/account.service';
import { Review } from 'src/app/shared/models/review/review';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent {

  @Input() review?: Review;

  constructor(public accountService: AccountService){

  }

  formatDate(date: string){
    return moment(date).format("YYYY-MM-DD");
  }
}
