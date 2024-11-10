import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { Firestore, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { ExperiencesComponent } from "./experiences/experiences.component";
import { FirebaseAppService } from './services/firebase-app.service';
import { SvgIconService } from './services/svg-icon.service';
import { firebaseConfig } from '../../secrets/firebase-config';

initializeApp(firebaseConfig);
const db = getFirestore();

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    MatToolbarModule,
    MatIconModule,
    ExperiencesComponent,
  ],
  providers: [
    { provide: Firestore, useValue: db }
  ]
})
export class AppComponent implements OnInit {
  title = 'my-resume-app';
  gitHubUrl: string = '';

  private firebaseAppService = inject(FirebaseAppService);

  constructor() {
    inject(SvgIconService);
  }

  ngOnInit(): void {
    this.firebaseAppService.getGitHubLink().subscribe(webLink => {
      this.gitHubUrl = webLink.url
    });
  }
}
