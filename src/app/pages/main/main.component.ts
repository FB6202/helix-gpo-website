import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { TestimonialsService } from '../../services/testimonials.service';
import { Project } from '../../model/projects/project';
import { TestimonialResponse } from '../../model/testimonials/testimonial-response';
import { NgStyle } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { IconComponent } from '../../util/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [NgStyle, IconComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  private projectsService: ProjectsService = inject(ProjectsService);
  private testimonialsService: TestimonialsService =
    inject(TestimonialsService);
  private utilService: UtilService = inject(UtilService);
  private router: Router = inject(Router);

  projects: Project[] = [];
  shownProjects: Project[] = [];

  testimonials: TestimonialResponse[] = [];
  shownTestimonials: TestimonialResponse[] = [];
  shownTestimonialsLeft: TestimonialResponse[] = [];
  shownTestimonialsRight: TestimonialResponse[] = [];

  readonly ratingArray = [1, 2, 3, 4, 5];
  averageRating = 0;

  loadingProjects = true;
  loadingTestimonials = true;

  showAllProjects = false;
  showAllProjectsText = 'Mehr Anzeigen';

  showLeftTestimonials = true;

  ngOnInit(): void {
    this.loadProjects();
    this.loadTestimonials();
    this.getTestimonialsAverage();

    //this.projects = this.projectsService.tempProjects;
    //this.shownProjects = this.projectsService.tempProjects.slice(0, 3);

    //this.testimonials = this.testimonialsService.tempTestimonials;
    //this.shownTestimonialsLeft = this.testimonialsService.tempTestimonials.slice(0, 3);
    //this.shownTestimonialsRight = this.testimonialsService.tempTestimonials.slice(3, 6);
    //this.shownTestimonials = this.shownTestimonialsLeft;
  }

  private loadProjects() {
    this.loadingProjects = true;
    this.projectsService.getAllProjects().subscribe({
      next: (projectsResponse) => {
        this.projects = projectsResponse;
        this.shownProjects = this.projects.slice(0, 3);
        this.loadingProjects = false;
      },
      error: (error) => {
        this.loadingProjects = false;
        console.error('Fehler beim Laden der Projekte:', error);
      },
    });
  }

  private loadTestimonials() {
    this.testimonialsService.getAllTestimonials().subscribe({
      next: (testimonialsResponse) => {
        this.testimonials = testimonialsResponse;
        this.shownTestimonialsLeft = this.testimonials.slice(0, 3);
        this.shownTestimonialsRight = this.testimonials.slice(3, 6);
        this.shownTestimonials = this.shownTestimonialsLeft;
        this.loadingTestimonials = false;
      },
      error: (error) => {
        this.loadingTestimonials = false;
        console.error('Fehler beim Laden der Referenzen:', error);
      },
    });
  }

  private getTestimonialsAverage() {
    this.testimonialsService.getTestimonialsAverage().subscribe({
      next: (average) => {
        this.averageRating = average;
      },
      error: (error) => {
        this.averageRating = 0;
        console.error(
          'Fehler beim Laden der durchschnittlichen Bewertung:',
          error
        );
      },
    });
  }

  scrollToElementByButton(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  shortenText(text: string, maxLength: number, addEllipsis = true): string {
    return this.utilService.shorten(text, maxLength, addEllipsis);
  }

  formatMonthYear(dateString: string): string {
    return this.utilService.formatMonthYear(dateString);
  }

  handleProjectDetailsButtonClick(projectId: number) {
    this.router.navigate(['project-details', projectId]).then(() => {
      this.scrollToElementByButton('header');
    });
  }

  handleToggleShowAllProjectsButton() {
    this.showAllProjects = !this.showAllProjects;

    if (this.showAllProjects) {
      this.shownProjects = this.projects;
      this.showAllProjectsText = 'Weniger Anzeigen';
    } else {
      this.shownProjects = this.projects.slice(0, 3);
      this.showAllProjectsText = 'Mehr Anzeigen';
      this.scrollToElementByButton('projects');
    }
  }

  handleShowLeftPage() {
    this.showLeftTestimonials = true;
    this.shownTestimonials = this.shownTestimonialsLeft;
  }

  handleShowRightPage() {
    this.showLeftTestimonials = false;
    this.shownTestimonials = this.shownTestimonialsRight;
  }
}
