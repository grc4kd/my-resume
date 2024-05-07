import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

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
  gitHubLinkUrl = '';
  gitHubLinkSub = new Subscription();
  firebaseAppService = inject(FirebaseAppService);
  
  constructor() {
    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.gitHubLinkSub = this.firebaseAppService.GitHubLink.subscribe(webLink => {
      this.gitHubLinkUrl = webLink.url;
    });
  }

  ngOnDestroy(): void {
    this.gitHubLinkSub.unsubscribe();
  }
}
