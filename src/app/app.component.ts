import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'helix-gpo-website';

  constructor(private router: Router) {}

  ngOnInit() {
    const yearEl = document.querySelector('.year');
    const currentYear = new Date().getFullYear();
    if (yearEl) {
      yearEl.innerHTML = String(currentYear);
    }
  }

  scrollToElement(elementId: string) {
    if (
      this.router.url === '/impressum' ||
      this.router.url === '/datenschutz'
    ) {
      this.router.navigate(['']).then(() => {
        const element = document.getElementById(elementId);
        if (!element) return;

        const y = element.getBoundingClientRect().top;

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      });
    } else {
      const element = document.getElementById(elementId);
      if (!element) return;

      const y = element.getBoundingClientRect().top;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }

  scrollToElementByButton(elementId: string) {
    if (
      this.router.url === '/impressum' ||
      this.router.url === '/datenschutz'
    ) {
      this.router.navigate(['']).then(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  routing(url: string) {
    this.router.navigate([url]);
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  }
}
