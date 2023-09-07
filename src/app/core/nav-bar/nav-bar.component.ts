import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  changeThemeColor(){
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark-theme')){
      body.classList.remove('dark-theme');
      console.log('Dark removed');

    } else {
      body.classList.add('dark-theme');
      console.log('Dark added');

    }
    return true
  }

}
