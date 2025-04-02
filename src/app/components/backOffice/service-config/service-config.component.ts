import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceConfigService } from '../../../services/service-config.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-service-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-config.component.html',
  styleUrls: ['./service-config.component.css'],
})
export class ServiceConfigComponent {
  services: any[] = [];
  serviceToDeleteId: string | null = null; // Stocker l'ID du service à supprimer
  modalInstance: any;
  isLoading: boolean = true; 

  constructor(
    private readonly serviceApi: ServiceConfigService, private router: Router
  ) {}

  ngOnInit() {

    this.serviceApi.getAllServices().subscribe((services) => {
      this.services = services;
      this.isLoading = false
    } , (error) => {
      this.isLoading = false; 
    });
  }

  editService(service: any) {
    this.router.navigate(['/add-service'], {
      queryParams: {
        id: service._id, 
        title: service.title,
        description: service.description,
      },
    });
  }

  openDeleteModal(serviceId: string) {
    this.serviceToDeleteId = serviceId; // Stocker l'ID du service à supprimer
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement); // Créer une instance du modal
      this.modalInstance.show(); // Afficher le modal
    }
  }

  // Confirmer la suppression du service
  confirmDelete() {
    if (this.serviceToDeleteId) {
      this.serviceApi.deleteService(this.serviceToDeleteId).subscribe({
        next: () => {
          console.log('Service supprimé avec succès');
          this.ngOnInit(); // Recharger la liste après suppression
          if (this.modalInstance) {
            this.modalInstance.hide(); // Cacher le modal après la suppression
          }
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du service :', err);
        }
      });
    }
  }

}
