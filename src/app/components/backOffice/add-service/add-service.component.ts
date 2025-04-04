import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceConfigService } from '../../../services/service-config.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  service = {
    _id:'',
    title: '',
    description: '',
    image: '' as string | null,
  };

  constructor(private serviceService: ServiceConfigService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['title'] && params['description']) {
        this.service.title = params['title'];
        this.service.description = params['description'];
        this.service._id = params['id'];
      }
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convertit en Base64
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.service.image = reader.result; // Stocker en Base64
        }
      };
      reader.onerror = (error) => {
        console.error('Erreur lors de la conversion en Base64:', error);
      };
    }
  }
  
  onSubmit() {
    if (this.service.title && this.service.description) {
      // Création de l'objet JSON à envoyer
      const serviceData = {
        title: this.service.title,
        description: this.service.description,
        image: this.service.image, // L'image est déjà en Base64
      };
  
      if (this.service._id) {
        // Mise à jour du service
        this.serviceService.updateService(this.service._id, serviceData).subscribe({
          next: (response) => {
            this.resetForm();
            this.router.navigate(['/services']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du service', error);
          },
        });
      } else {
        // Création d'un nouveau service
        this.serviceService.createService(serviceData).subscribe({
          next: (response) => {
            this.resetForm();
            this.router.navigate(['/services']);
          },
          error: (error) => {
            console.error('Erreur lors de la création du service', error);
          },
        });
      }
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }
  
  
  resetForm() {
    this.service = {
      _id:'',
      title: '',
      description: '',
      image: null,
    };
  }
}
