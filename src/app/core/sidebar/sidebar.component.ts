import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DarkModeService } from '../services/dark-mode-service/dark-mode.service';
import { LanguageService } from '../services/language-service/language.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef,
    public darkmodeService: DarkModeService, public langService: LanguageService) {
      this.langService.setCurrentLang();
  }

  ngOnInit() {
    this.darkmodeService.setCurrentTheme();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }

      // Manually trigger change detection
      this.cdr.detectChanges();
    });
  }
}
