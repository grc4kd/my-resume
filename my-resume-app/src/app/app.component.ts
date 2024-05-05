import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

import { ExperiencesComponent } from "./experiences/experiences.component";
import { HttpClientModule } from '@angular/common/http';
import { FirebaseAppService } from './services/firebase-app.service';
import { Subscription } from 'rxjs';
import { SvgIconService } from './services/svg-icon.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, MatToolbarModule, MatIconModule, ExperiencesComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-resume-app';
  gitHubLinkUrl: string = '';
  gitHubLinkSub: Subscription = new Subscription();

  constructor(private firebaseAppService: FirebaseAppService) {
    // injecting SVG icon service registers icons used throughout the app
    inject(SvgIconService)
  }

  ngOnInit(): void {
    this.gitHubLinkSub = this.firebaseAppService.getGitHubLink().subscribe(webLink => {
      this.gitHubLinkUrl = webLink.url;
    });
  }

  ngOnDestroy(): void {
    this.gitHubLinkSub.unsubscribe();
  }
}
