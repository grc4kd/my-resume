import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { ExperiencesComponent } from "./experiences/experiences.component";
import { HttpClientModule } from '@angular/common/http';
import { FirebaseAppService } from './services/firebase-app.service';
import { Subscription } from 'rxjs';
import { SvgIconService } from './services/svg-icon.service';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../secrets/firebase-config';
import { initializeApp } from 'firebase/app';
import { firebaseAppServiceProvider } from './services/firebase-app.service.provider';

initializeApp(firebaseConfig);
const db = getFirestore();

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HttpClientModule, MatToolbarModule, MatIconModule, ExperiencesComponent],
  providers: [
    { provide: Firestore, useValue: db },
    firebaseAppServiceProvider
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-resume-app';
  gitHubLinkUrl = '';
  gitHubLinkSub = new Subscription();
  firebaseAppService: FirebaseAppService;

  constructor() {
    this.firebaseAppService = inject(FirebaseAppService);

    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.gitHubLinkSub = this.firebaseAppService.GitHubLink$.subscribe(webLink => {
      this.gitHubLinkUrl = webLink.url;
    });
  }

  ngOnDestroy(): void {
    this.gitHubLinkSub.unsubscribe();
  }
}
