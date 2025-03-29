import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceConfigService } from '../../../services/service-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  service = {
    title: '',
    description: '',
    photo: null,
  };

  constructor(private serviceService: ServiceConfigService, private router: Router) {}


  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.service.photo = file;
    console.log('Photo sélectionnée:', file);
  }

  onSubmit() {
    if (this.service.title && this.service.description && this.service.photo) {
      const formData = new FormData();
      formData.append('title', this.service.title);
      formData.append('description', this.service.description);
      formData.append('file', this.service.photo); // Append le fichier photo

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
    } else {
      console.log('Veuillez remplir tous les champs');
    }
  }

  resetForm() {
    this.service = {
      title: '',
      description: '',
      photo: null,
    };
  }
}
