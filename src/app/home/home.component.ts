import { Component } from '@angular/core';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLightTheme() {
    return localStorage.getItem('theme') === 'light';
  }

  isDarkTheme() {
    return localStorage.getItem('theme') === 'dark';
  }

  books: Book[] = [
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
    }
  ];

}
