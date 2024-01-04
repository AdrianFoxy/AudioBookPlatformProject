import { Component } from '@angular/core';
import { DarkModeService } from '../core/services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Sales Percent',
        fill: true,
        backgroundColor: 'rgba(255, 255, 0, 0.3',
        borderColor: 'black',
        tension: 0.5
      }
    ]
  }

  constructor(public darkmodeService: DarkModeService) {
  }
}
