import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AudioBook } from '../models/audiobook';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { RecommendationsService } from './recommendations.service';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';
import { Observable } from 'rxjs';

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

  widthImg = 200;
  heightImg = 300;

  constructor(public langService: LanguageService, public recommedantionService: RecommendationsService,
    public loaderService:LoaderService){
  }

  ngOnInit() {
    this.loadRecommendations();
  }

  loadRecommendations() {
    let requestObservable: any = undefined;

    const handleRecommendation = (title: string, observable: Observable<AudioBook[]>) => {
      if (this.useTitle === true) {
        this.recommendationTitle = title;
      }
      requestObservable = observable;
    };

    if (this.recommedantionType === 'popularity') {
      handleRecommendation('PopularityRecommedantion', this.recommedantionService.getRecommedationsByPopularity());
    } else if (this.recommedantionType === 'rating') {
      handleRecommendation('RatingRecommedantion', this.recommedantionService.getRecommedationsByRating());
    } else if (this.recommedantionType === 'recently') {
      handleRecommendation('RecentlyWatched', this.recommedantionService.getRecentlyWatched());
    } else {
      console.error('Invalid recommendation type:', this.recommedantionType);
      return;
    }

    if (requestObservable) {
      requestObservable.subscribe(
        (data: AudioBook[]) => {
          this.audioBooks = data;
        },
        (error: any) => {
          console.error(`Error loading recommendations by ${this.recommedantionType}:`, error);
        }
      );
    }

    this.adjustImageSize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustImageSize(window.innerWidth);
  }

  adjustImageSize(screenWidth: number) {
    if (screenWidth <= 992) {
      this.widthImg = 150;
      this.heightImg = 230;
    } else {
      this.widthImg = 200;
      this.heightImg = 300;
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
