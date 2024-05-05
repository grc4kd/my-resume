import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceDetail',
  standalone: true
})
export class ExperienceDetailPipe implements PipeTransform {
  transform(value: string | string[]): string[] {
    // pass-through a simple string to an array of one string
    if (typeof value === 'string') {
      return [value];
    }

    // add a bullet point to the beginning of each array element if absent
    // trim the start before checking for bullet point
    // trim whitespace at the ends of any array element
    if (Array.isArray(value)) {
      return value.map((element: string) => element.trimStart().startsWith('•') ? 
        element.trim() : 
        `• ${element.trim()}`);
    }

    // for all other cases return an empty array
    return [];
  }
}
