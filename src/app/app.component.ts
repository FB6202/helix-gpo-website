import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'helix-gpo-website';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    const yearEl = document.querySelector('.year');
    const currentYear = new Date().getFullYear();
    if (yearEl) {
      yearEl.innerHTML = String(currentYear);
    }
  }

  scrollToElementByButton(elementId: string) {
    const currentUrl = this.router.url;

    if (currentUrl === '/impressum' || currentUrl === '/datenschutz') {
      this.router.navigate(['/']).then(() => {
        this.scrollToElement(elementId);
      });
    } else {
      this.scrollToElement(elementId);
    }
  }

  routing(url: string) {
    this.router.navigate([url]);
    this.scrollToElement('header');
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
