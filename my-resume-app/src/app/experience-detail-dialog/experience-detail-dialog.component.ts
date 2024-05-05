import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ExperienceDetail } from '../../data/experience-detail';
import { ExperienceDetailPipe } from "../experiences/experience-detail-pipe.pipe";

@Component({
    selector: 'app-experience-detail-dialog',
    standalone: true,
    templateUrl: './experience-detail-dialog.component.html',
    imports: [MatDialogModule, MatDialogContent, ExperienceDetailPipe]
})
export class DialogContentExperienceDetail {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ExperienceDetail) { 

  }
}
