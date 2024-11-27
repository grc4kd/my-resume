
import { FirebaseAppService } from './services/firebase-app.service';

import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExperiencesComponent } from './experiences/experiences.component';
import { SvgIconService } from './services/svg-icon.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatToolbarModule, MatIconModule, ExperiencesComponent, MatProgressBarModule]
})
export class AppComponent implements OnInit {
  title = 'My Resume App - Angular 19 - Angular Material';
  gitHubUrl = '';
  nowLoading: boolean = true;

  constructor(private firebaseAppService: FirebaseAppService) {
    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.firebaseAppService.getGitHubLink().subscribe((webLink) => {
      this.gitHubUrl = webLink.url;

      this.nowLoading = false;
    });
  }
}
