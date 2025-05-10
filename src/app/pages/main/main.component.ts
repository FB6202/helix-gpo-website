import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  onLinkClick(event: Event, elementId: string) {
    event.preventDefault(); // verhinder normales Linkverhalten (also das Hochspringen)
    this.scrollToElement(elementId);
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.log('Kein Element mit der ID gefunden:', elementId);
      return;
    }

    const y = element.getBoundingClientRect().top;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }

  scrollToElementByButton(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
