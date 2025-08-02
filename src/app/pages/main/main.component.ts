import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { TestimonialsService } from '../../services/testimonials.service';
import { Project } from '../../model/projects/project';
import { TestimonialResponse } from '../../model/testimonials/testimonial-response';
import { NgStyle } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { IconComponent } from '../../util/icon/icon.component';

@Component({
  selector: 'app-main',
  imports: [NgStyle, IconComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
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

  errorProjects?: string;
  errorTestimonials?: string;

  showAllProjects = false;
  showAllProjectsText = 'Mehr Anzeigen';

  showLeftTestimonials = true;

  constructor(
    private projectsService: ProjectsService,
    private testimonialsService: TestimonialsService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTestimonials();
    this.getTestimonialsAverage();

    this.projects = this.projectsService.tempProjects;
    this.shownProjects = this.projectsService.tempProjects.slice(0, 3);

    this.testimonials = this.testimonialsService.tempTestimonials;
    this.shownTestimonialsLeft =
      this.testimonialsService.tempTestimonials.slice(0, 3);
    this.shownTestimonialsRight =
      this.testimonialsService.tempTestimonials.slice(3, 6);
    this.shownTestimonials = this.shownTestimonialsLeft;

    console.log(this.shownTestimonialsLeft);
    console.log(this.shownTestimonialsRight);
  }

  private loadProjects() {
    // todo: exception handling im frontend!
    this.projectsService.getAllProjects().subscribe({
      next: (projectsResponse) => {
        this.projects = projectsResponse;
        this.loadingProjects = false;
        console.log(this.projects); // todo: remove this line later on!
      },
      error: (error) => {
        this.errorProjects = 'Fehler beim Laden der Projekte!';
        this.loadingProjects = false;
      },
    });
  }

  private loadTestimonials() {
    // todo: exception handling im frontend!
    this.testimonialsService.getAllTestimonials().subscribe({
      next: (testimonialsResponse) => {
        this.testimonials = testimonialsResponse;
        this.loadingTestimonials = false;
        console.log(this.testimonials); // todo: remove this line later on!
      },
      error: (error) => {
        this.errorTestimonials = 'Fehler beim Laden der Testimonials!';
        this.loadingTestimonials = false;
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

  toggleShowAllProjects() {
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

  showLeftPage() {
    this.showLeftTestimonials = true;
    this.shownTestimonials = this.shownTestimonialsLeft;
  }

  showRightPage() {
    this.showLeftTestimonials = false;
    this.shownTestimonials = this.shownTestimonialsRight;
  }
}
