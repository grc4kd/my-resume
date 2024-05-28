import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { ExperiencesComponent } from "./experiences/experiences.component";
import { FirebaseAppService } from './services/firebase-app.service';
import { SvgIconService } from './services/svg-icon.service';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../secrets/firebase-config';
import { initializeApp } from 'firebase/app';
import { firebaseAppServiceProvider } from './services/firebase-app.service.provider';
import { AsyncPipe } from '@angular/common';

initializeApp(firebaseConfig);
const db = getFirestore();

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, ExperiencesComponent, AsyncPipe],
  providers: [
    { provide: Firestore, useValue: db },
    firebaseAppServiceProvider
  ]
})
export class AppComponent implements OnInit {
  title = 'my-resume-app';
  firebaseAppService: FirebaseAppService;
  gitHubUrl: string = '';

  constructor() {
    this.firebaseAppService = inject(FirebaseAppService);
    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.firebaseAppService.getGitHubLink().subscribe(webLink => {
      this.gitHubUrl = webLink.url
    });
  }
}
