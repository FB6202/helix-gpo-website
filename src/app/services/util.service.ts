import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  shorten(text: string, maxLength: number, addEllipsis = true): string {
    if (text.length <= maxLength) {
      return text;
    }

    if (addEllipsis && maxLength > 3) {
      return text.slice(0, maxLength - 3) + '...';
    }

    return text.slice(0, maxLength);
  }

  formatMonthYear(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }

    const formatter = new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
    });

    return formatter.format(date);
  }
}
