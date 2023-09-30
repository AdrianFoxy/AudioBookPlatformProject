import { Component } from '@angular/core';
import { Book_Test } from '../models/book_test';

@Component({
  selector: 'app-recomentdations',
  templateUrl: './recomentdations.component.html',
  styleUrls: ['./recomentdations.component.scss']
})
export class RecomentdationsComponent {

  books: Book_Test[] = [
    {
      id: 2,
      title: 'Ім\'я вітру',
      author: 'Патрік Ротфусс',
      imageSrc: '/assets/images/books_templates/TheNameOfWind.jpg',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Гоббіт',
      author: 'Джон Толкін',
      imageSrc: '/assets/images/books_templates/hobbit.jpg',
      rating: 4.2
    },
    {
      id: 100,
      title: 'Морт',
      author: 'Тіррі Пратчетт',
      imageSrc: '/assets/images/books_templates/mort.jpg',
      rating: 4.7
    },
    {
      id: 200,
      title: 'Хроніки Нарнії',
      author: 'К.С. Льюїс',
      imageSrc: '/assets/images/books_templates/narnia.jpg',
      rating: 4.9
    },
    {
      id: 200,
      title: 'Stray Gods',
      author: 'David Gaider',
      imageSrc: '/assets/images/books_templates/Stray_Gods_The_Roleplaying_Musical-744256125-large.jpg',
      rating: 4.9
    },
    {
      id: 200,
      title: 'Аліса в задзеркаллі',
      author: 'Льюїс Керрол',
      imageSrc: '/assets/images/books_templates/aline_in_zadzercal.jpg',
      rating: 4.9
    }
  ];

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
