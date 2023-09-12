import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  fullText: string = `
  «Аліса в Задзеркаллі», альтернативний переклад назви українською: «В задзеркальній країні» (англ. Through the Looking-Glass, and What Alice Found There — «Крізь дзеркало, і що там побачила Аліса») — дитячий фентезійний роман англійського математика й письменника Льюїса Керрола, написаний в 1871 році як продовження книги «Аліса в країні чудес».
  <br><br>
  Перед читачами оживає легендарна казкова історія дівчинки Аліси. У другому томі пригод дівчинка опиняється в
  Задзеркаллі, де світ являє собою шахову дошку. Там Аліса зустрічає Чорну Королеву, Білого Лицаря, Лева,
  Єдинорога, Шалтая-Болтая і безліч інших неймовірних персонажів, які протягом практично ста п'ятдесяти років
  радують дітей і дорослих по всьому світу.
  <br><br>
  Пориньте у світ чудернацьких героїв, безглуздих парадоксів і забавних діалогів цієї мудрої і чарівної казки.
  Дивовижні, яскраві і милі ілюстрації в поєднанні з чудовою історією Льюїса Керролла подарують радість усім
  маленьким читачам.
  `;

  truncatedText: string = '';
  isExpanded: boolean = false;

  constructor() {
    this.truncateText(); // Function for shortening text.
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.truncatedText = this.fullText;
    } else {
      this.truncateText(); // Call the function to shorten the text again when collapsing.
    }
  }

  truncateText() {
    const maxLength = 300; //
    if (this.fullText.length <= maxLength) {
      this.truncatedText = this.fullText;
    } else {
      this.truncatedText = this.fullText.slice(0, maxLength) + '...';
    }
  }

}
