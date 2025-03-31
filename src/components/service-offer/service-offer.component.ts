import { Component } from '@angular/core';
import { ServiceConfigService } from '../../services/service-config.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-service-offer',
  imports: [CommonModule,FormsModule],
  templateUrl: './service-offer.component.html',
  styleUrl: './service-offer.component.css'
})
export class ServiceOfferComponent {
  services: any[] = [];
  imageBaseUrl = 'http://localhost:5000';
  constructor(
    private readonly serviceApi: ServiceConfigService
  ) {}

  ngOnInit() {

    this.serviceApi.getAllServices().subscribe((services) => {
      this.services = services;
      console.log(this.services)
    });
  }

  getImageUrl(imagePath: string | null): string {
    return imagePath ? `${this.imageBaseUrl}/${imagePath.replace(/\\/g, '/')}` : 'assets/default-image.png';
  }
}
