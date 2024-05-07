import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @description Registers icons for use throughout the application.
 */
@Injectable({
  providedIn: 'root'
})
export class SvgIconService {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) { 
    iconRegistry.addSvgIcon('github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-mark.svg'),
      {viewBox: '0 0 96 98'});
  }
}
