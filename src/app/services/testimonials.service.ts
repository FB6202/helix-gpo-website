import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestimonialResponse } from '../model/testimonials/testimonial-response';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  private readonly baseUrl = environment.TESTIMONIAL_SERVICE_BASE_URL;

  tempTestimonials: TestimonialResponse[] = [
    {
      id: 1,
      title: 'Effiziente Prozessoptimierung',
      description:
        'Dank Helix GPO konnten wir unsere internen Abläufe deutlich verschlanken und automatisieren.',
      result: 5,
      image: 'https://example.com/images/testimonial1.jpg',
      creationDate: new Date('2025-01-01'),
      lastUpdate: new Date('2025-01-01'),
      showOnWebsite: true,
      project: {
        id: 1,
        title: 'Quantum Echoes',
        description:
          'Entwicklung einer individuellen Webanwendung zur Automatisierung interner Prozesse und Verbesserung der Effizienz.',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-01'),
        imageUrl: 'https://example.com/image1.jpg',
        tags: [
          {
            value: 'Prozessoptimierung',
            color: '#03dbff',
          },
          {
            value: 'Software & Web',
            color: '#0d1424',
          },
          {
            value: 'Monitoring',
            color: '#7f6fea',
          },
          {
            value: 'Strategie',
            color: '#fc03d5',
          },
        ],
        showOnWebsite: true,
        partner: {
          id: 1,
          name: 'Michael Breuer',
          job: 'Steuerberater',
          company: {
            id: 1,
            name: 'Helix ProcessCraft GmbHg',
          },
        },
      },
    },
    {
      id: 2,
      title: 'Digitalisierung auf den Punkt gebracht',
      description:
        'Die Softwareintegration hat unser Kundenmanagement verbessert und Zeit eingespart.',
      result: 4,
      image: 'https://example.com/images/testimonial1.jpg',
      creationDate: new Date('2025-11-01'),
      lastUpdate: new Date('2025-11-01'),
      showOnWebsite: true,
      project: {
        id: 2,
        title: 'Vortex Venture',
        description:
          'Konzeption und Umsetzung einer maßgeschneiderten CRM-Lösung zur Optimierung von Kundendatenverwaltung, Reporting-Workflows und Teamkommunikation.',
        startDate: new Date('2025-12-01'),
        endDate: new Date('2025-12-01'),
        imageUrl: 'https://example.com/image1.jpg',
        tags: [
          {
            value: 'Prozessoptimierung',
            color: '#03dbff',
          },
          {
            value: 'Software & Web',
            color: '#0d1424',
          },
          {
            value: 'Strategie',
            color: '#fc03d5',
          },
        ],
        showOnWebsite: true,
        partner: {
          id: 2,
          name: 'Michael Breuer',
          job: 'Steuerberater',
          company: {
            id: 2,
            name: 'Neuss Process Consulting',
          },
        },
      },
    },
    {
      id: 3,
      title: 'Kundenservice wirklich persönlich',
      description:
        'Wir schätzen die persönliche Betreuung über den Service hinaus — jederzeit erreichbar.',
      result: 5,
      image: 'https://example.com/images/testimonial1.jpg',
      creationDate: new Date('2025-10-01'),
      lastUpdate: new Date('2025-10-01'),
      showOnWebsite: true,
      project: {
        id: 3,
        title: 'Neural Odyssey',
        description:
          'Implementierung einer skalierbaren Webplattform mit Projekt- und Testimonial-Management: inklusive User-Authentifizierung, responsive Frontend-Schnittstelle und automatisierter Bildverarbeitung.',
        startDate: new Date('2025-10-01'),
        endDate: new Date('2025-10-01'),
        imageUrl: 'https://example.com/image1.jpg',
        tags: [
          {
            value: 'Software & Web',
            color: '#0d1424',
          },
          {
            value: 'Monitoring',
            color: '#7f6fea',
          },
          {
            value: 'Strategie',
            color: '#fc03d5',
          },
        ],
        showOnWebsite: true,
        partner: {
          id: 3,
          name: 'Michael Breuer',
          job: 'Steuerberater',
          company: {
            id: 3,
            name: 'Helix Digital Consulting',
          },
        },
      },
    },
    {
      id: 4,
      title: 'Top Beratung und Umsetzung',
      description:
        'Von der Analyse bis zur Softwareentwicklung: maßgeschneiderte Lösungen auf höchstem Niveau.',
      result: 5,
      image: 'https://example.com/images/testimonial1.jpg',
      creationDate: new Date('2025-09-01'),
      lastUpdate: new Date('2025-09-01'),
      showOnWebsite: true,
      project: {
        id: 4,
        title: 'Echoes of Silence',
        description:
          'Konzeption und Umsetzung einer maßgeschneiderten CRM-Lösung zur Optimierung von Kundendatenverwaltung, Reporting-Workflows und Teamkommunikation.',
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-01'),
        imageUrl: 'https://example.com/image1.jpg',
        tags: [
          {
            value: 'Prozessoptimierung',
            color: '#03dbff',
          },
          {
            value: 'Strategie',
            color: '#fc03d5',
          },
        ],
        showOnWebsite: true,
        partner: {
          id: 4,
          name: 'Michael Breuer',
          job: 'Steuerberater',
          company: {
            id: 4,
            name: 'Helix Prozess & IT GmbH',
          },
        },
      },
    },
    {
      id: 5,
      title: 'Top Beratung und Umsetzung',
      description:
        'Von der Analyse bis zur Softwareentwicklung: maßgeschneiderte Lösungen auf höchstem Niveau.',
      result: 4,
      image: 'https://example.com/images/testimonial1.jpg',
      creationDate: new Date('2025-04-01'),
      lastUpdate: new Date('2025-05-01'),
      showOnWebsite: true,
      project: {
        id: 5,
        title: 'Aurora Synthesis',
        description:
          'Entwicklung einer individuellen Webanwendung zur Automatisierung interner Prozesse und Verbesserung der Effizienz.',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-05-01'),
        imageUrl: 'https://example.com/image1.jpg',
        tags: [
          {
            value: 'Prozessoptimierung',
            color: '#03dbff',
          },
          {
            value: 'Software & Web',
            color: '#0d1424',
          },
          {
            value: 'Monitoring',
            color: '#7f6fea',
          },
          {
            value: 'Strategie',
            color: '#fc03d5',
          },
        ],
        showOnWebsite: true,
        partner: {
          id: 5,
          name: 'Michael Breuer',
          job: 'Steuerberater',
          company: {
            id: 5,
            name: 'Helix ProcessCraft GmbH',
          },
        },
      },
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getAllTestimonials(): Observable<TestimonialResponse[]> {
    return this.httpClient.get<TestimonialResponse[]>(this.baseUrl);
  }

  getTestimonialsAverage(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/average`);
  }

  getTempTestimonials(): TestimonialResponse[] {
    return this.tempTestimonials;
  }
}
