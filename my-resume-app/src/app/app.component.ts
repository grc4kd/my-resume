import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExperiencesComponent } from "./experiences/experiences.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ExperiencesComponent]
})
export class AppComponent {
  title = 'my-resume-app';
}
