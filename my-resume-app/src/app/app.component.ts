import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { Firestore, getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

import { ExperiencesComponent } from './experiences/experiences.component';
import { FirebaseAppService } from './services/firebase-app.service';
import { SvgIconService } from './services/svg-icon.service';
import { firebaseConfig } from '../../secrets/firebase-config';
import { environment } from '../environments/environment';
import { setupEmulator } from './services/helpers/setupEmulator';
import { setupAppCheck } from '../../app-check/setupAppCheck';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Object literal type alias containing data about a special reserved environment variable for App Check.
 * @var name The name of the debug token environment variable from documentation.
 * @var host The online documentation host server FQDN.
 * @var filename The document from the documentation server.
 * @var version (as of 2024-11-12) A publishing tag containing a date, revision, and release candidate number
 */
export const AppCheckDebugToken = {
  name: 'FIREBASE_APPCHECK_DEBUG_TOKEN',
  host: 'firebase.google.com',
  filename: '/docs/app-check/web/debug-provider',
  version: 't-devsite-webserver-20241112-r02-rc01.464830024708363737',
};

export const app = initializeApp(firebaseConfig);

setupAppCheck();

const db: Firestore = getFirestore();

if (environment.useFirebaseEmulator) {
  setupEmulator(db);
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatToolbarModule, MatIconModule, ExperiencesComponent, MatProgressBarModule],
})
export class AppComponent implements OnInit {
  title = 'my-resume-app';
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
