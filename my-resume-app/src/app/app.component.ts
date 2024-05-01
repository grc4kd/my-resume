import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

import { ExperiencesComponent } from "./experiences/experiences.component";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, MatToolbarModule, MatIconModule, ExperiencesComponent]
})
export class AppComponent {
  title = 'my-resume-app';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-mark.svg'),
    {viewBox: "0 0 96 98"});
  }
}
