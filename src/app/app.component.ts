import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'helix-gpo-website';

  private router: Router = inject(Router);

  ngOnInit() {
    this.updateYear();
  }

  updateYear() {
    const yearEl = document.querySelector('.year');
    const currentYear = new Date().getFullYear();
    if (yearEl) {
      yearEl.innerHTML = String(currentYear);
    }
  }

  scrollToElementByButton(elementId: string) {
    const currentUrl = this.router.url;

    if (
      currentUrl === '/impressum' ||
      currentUrl === '/datenschutz' ||
      currentUrl === '/feedback' ||
      currentUrl === '/error' ||
      currentUrl.startsWith('/project-details')
    ) {
      this.router.navigate(['/']).then(() => {
        this.scrollToElement(elementId);
      });
    } else {
      this.scrollToElement(elementId);
    }
  }

  routing(url: string) {
    this.router.navigate([url]).then(() => {
      this.scrollToElement('header');
    });
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
