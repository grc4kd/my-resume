import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

import { ExperiencesComponent } from "./experiences/experiences.component";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseAppService } from './services/firebase-app.service';
import { Observable, Subscription, from, shareReplay, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, MatToolbarModule, MatIconModule, ExperiencesComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-resume-app';
  gitHubLinkUrl: string = 'https://github.com/';
  gitHubLinkObs: Observable<string>;
  gitHubLinkSub: Subscription = new Subscription();

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private firebaseAppService: FirebaseAppService) {
    iconRegistry.addSvgIcon('github', 
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-mark.svg'),
      {viewBox: "0 0 96 98"});

    this.gitHubLinkObs = from(this.firebaseAppService.getGitHubLink())
      .pipe(
        shareReplay(1)
      );
  }

  ngOnInit(): void {
    this.gitHubLinkSub = this.gitHubLinkObs.subscribe(url => {
      this.gitHubLinkUrl = url;
    });
  }

  ngOnDestroy(): void {
    this.gitHubLinkSub.unsubscribe();
  }
}
