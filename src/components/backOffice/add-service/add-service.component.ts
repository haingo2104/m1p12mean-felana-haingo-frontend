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
    photo: null,
  };

  constructor(private serviceService: ServiceConfigService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['title'] && params['description']) {
        this.service.title = params['title'];
        this.service.description = params['description'];
        this.service._id = params['id'];
        console.log('Service pré-rempli :', this.service);
      }
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.service.photo = file;
    console.log('Photo sélectionnée:', file);
  }

  onSubmit() {
    if (this.service.title && this.service.description) {
      const formData = new FormData();
      formData.append('title', this.service.title);
      formData.append('description', this.service.description);

      if (this.service.photo) {
        formData.append('file', this.service.photo); // Ajoute la photo seulement si elle est définie
      }
      
      // Vérifie si on doit créer ou mettre à jour un service
      if (this.service._id) {
        
        // Mise à jour
        this.serviceService.updateService(this.service._id, formData).subscribe({
          next: (response) => {
            console.log('Service mis à jour avec succès', response);
            this.resetForm();
            this.router.navigate(['/services']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du service', error);
          },
        });
      } else {
        // Création
        this.serviceService.createService(formData).subscribe({
          next: (response) => {
            console.log('Service créé avec succès', response);
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
      photo: null,
    };
  }
}
