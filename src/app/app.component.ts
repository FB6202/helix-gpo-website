import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { IconComponent } from './util/icon/icon.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuModalComponent } from './util/menu-modal/menu-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'helix-gpo-website';

  private router: Router = inject(Router);
  private dialog: MatDialog = inject(MatDialog);

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
      this.router.navigate(['/']);
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

  handleMenuButtonClick(): any {
    let dialogRef = this.dialog.open(MenuModalComponent, {
      panelClass: 'menu-modal',
    });

    if (dialogRef) {
      dialogRef.afterClosed().subscribe((element) => {
        this.scrollToElementByButton(element);
      });
    }
  }
}
