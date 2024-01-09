import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { AccountService } from '../account/account.service';
import { LanguageService } from '../core/services/language-service/language.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  userCount: number = 0;
  reviewCount: number = 0;
  audioBookCount: number = 0;
  newUsersCount: number[] = [];
  barChartData: any;

  constructor(private adminService: AdminService, public accountService: AccountService,
    public langService: LanguageService) { }

  ngOnInit() {
    this.loadUserCount();
  }

  loadUserCount() {
    this.adminService.getReviewCount().subscribe({
      next: (reviewCount: number) => {
        this.reviewCount = reviewCount;
      },
      error: (error) => {
        console.error('Error loading review count', error);
      }
    });

    this.adminService.getAudioBookCount().subscribe({
      next: (audioBookCount: number) => {
        this.audioBookCount = audioBookCount;
      },
      error: (error) => {
        console.error('Error loading audiobook count', error);
      }
    });

    this.adminService.getUserCount().subscribe({
      next: (userCount: number) => {
        this.userCount = userCount;
      },
      error: (error) => {
        console.error('Error loading user count', error);
      }
    });

    this.adminService.getNewUsersCount().subscribe({
      next: (newUsersCount: number[]) => {
        this.newUsersCount = newUsersCount;

        this.barChartData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: this.newUsersCount,
              label: 'Number of new users',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1
            }
          ]
        };
      },
      error: (error) => {
        console.error('Error loading chart data count', error);
      }
    });
  }
}
