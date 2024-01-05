import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [89, 34, 43, 54, 28, 74, 93],
        label: 'Book1',
        fill: true,
        backgroundColor: 'rgba(25, 46, 236, 0.3)',
        borderColor: 'black',
        tension: 0.5,
        fontColor: 'white'
      },
      {
        data: [39, 14, 23, 34, 18, 24, 33],
        label: 'Book2',
        fill: true,
        backgroundColor: 'rgba(30, 46, 236, 0.3)',
        borderColor: 'black',
        tension: 0.5,
        fontColor: 'white'
      },
      {
        data: [23, 34, 33, 65, 58, 24, 73],
        label: 'Book3',
        fill: true,
        backgroundColor: 'rgba(30, 46, 236, 0.3)',
        borderColor: 'black',
        tension: 0.5,
        fontColor: 'white'
      },
      {
        data: [35, 11, 63, 34, 48, 24, 63],
        label: 'Book4',
        fill: true,
        backgroundColor: 'rgba(30, 46, 236, 0.3)',
        borderColor: 'black',
        tension: 0.5,
        fontColor: 'white'
      }
    ]
  }
  lineChartOption1 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'The highest rating of audiobooks'
      },
    },
  }

  lineChartOption2 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'The highest views of audiobooks'
      },
    },
  }

}
