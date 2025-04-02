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
  isLoading: boolean = true; 
  services: any[] = [];
  constructor(
    private readonly serviceApi: ServiceConfigService
  ) {}

  ngOnInit() {
    this.serviceApi.getAllServices().subscribe(
      (services) => {
        this.services = services;
        this.isLoading = false;  
        console.log(this.services);
      },
      (error) => {
        console.error('Erreur lors de la récupération des services', error);
        this.isLoading = false; 
      }
    );
  }

}
