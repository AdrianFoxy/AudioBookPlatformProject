import { Component, Input, OnInit } from '@angular/core';
import { AudioBook } from '../models/audiobook';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { RecommendationsService } from './recommendations.service';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit{

  audioBooks: AudioBook[] = [];
  recommendationTitle: string = 'Similar-books';

  @Input() recommedantionType?: string;
  @Input() useTitle?: boolean = false;

  constructor(public langService: LanguageService, public recommedantionService: RecommendationsService,
    public loaderService:LoaderService){
  }

  ngOnInit() {
    this.loadRecommendations();
  }

  loadRecommendations() {
    if (this.recommedantionType === 'popularity') {
      if(this.useTitle = true) this.recommendationTitle = 'PopularityRecommedantion'
      this.recommedantionService.getRecommedationsByPopularity().subscribe(
        (data: AudioBook[]) => {
          this.audioBooks = data;
        },
        (error) => {
          console.error('Error loading recommendations by popularity:', error);
        }
      );
    } else if (this.recommedantionType === 'rating') {
      if(this.useTitle = true) this.recommendationTitle = 'RatingRecommedantion'
      this.recommedantionService.getRecommedationsByRating().subscribe(
        (data: AudioBook[]) => {
          this.audioBooks = data;
        },
        (error) => {
          console.error('Error loading recommendations by rating:', error);
        }
      );
    } else {
      console.error('Invalid recommendation type:', this.recommedantionType);
    }
  }


  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "autoplay":true,
    "autoplaySpeed":5000,
    "pauseOnHover":true,
    "infinitee": true,
    "arrows": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "infinitee": true,
          "slidesToShow": 3,
          "slidesToScroll": 3,
          "arrows": false
        }
      },
      {
        "breakpoint": 526,
        "settings": {
          "infinitee": true,
          "slidesToShow": 2,
          "slidesToScroll": 2,
          "arrows": false
        }
      },
      {
        "breakpoint": 376,
        "settings": {
          "infinitee": true,
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "arrows": false
        }
      },
    ]
  };
}
