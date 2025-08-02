import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { TestimonialsService } from '../../services/testimonials.service';
import { Project } from '../../model/projects/project';
import { TestimonialResponse } from '../../model/testimonials/testimonial-response';
import { NgFor, NgStyle } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { IconComponent } from "../../util/icon/icon.component";

@Component({
  selector: 'app-main',
  imports: [NgFor, NgStyle, IconComponent],
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
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.loadProjects();
    //this.loadTestimonials();

    this.projects = this.projectsService.tempProjects; // todo: remove this line later on!
    this.shownProjects = this.projectsService.tempProjects.slice(0, 3);

    this.testimonials = this.testimonialsService.tempTestimonials; // todo: remove this line later on!
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
        console.log(this.projects);
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
        console.log(this.testimonials);
      },
      error: (error) => {
        this.errorTestimonials = 'Fehler beim Laden der Testimonials!';
        this.loadingTestimonials = false;
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

  toggleShowAllTestimonials() {
    this.showLeftTestimonials = !this.showLeftTestimonials;

    if (this.showLeftTestimonials) {
      this.shownTestimonials = this.shownTestimonialsLeft;
    } else {
      this.shownTestimonials = this.shownTestimonialsRight;
    }
  }
}
