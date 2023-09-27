import { Component, Input } from '@angular/core';
import { AudioBook } from 'src/app/shared/models/audiobook';

@Component({
  selector: 'app-audiobook-item',
  templateUrl: './audiobook-item.component.html',
  styleUrls: ['./audiobook-item.component.scss']
})
export class AudiobookItemComponent {

  @Input() audiobook?: AudioBook

  truncateName(name: string): string {
    const length = name.length;
    if (length > 35) {
      const truncated = name.substring(0, 35);
      return truncated.trim() + "...";
    } else {
      return name;
    }
  }


}
