import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MecanicienService } from '../../../services/MecanicienService';
import * as bootstrap from 'bootstrap';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-mecanicien',
  imports: [CommonModule, FormsModule],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.css',
})
export class MecanicienComponent {
  mecaniciens: any[] = [];

  data = {
    name: '',
    email: '',
    phone: '',
    password: ' ',
    role: 'mecanicien', // Ajout du rôle par défaut
    speciality: '',
  };
  roleName= 'mecanicien';

  constructor(private apiService: MecanicienService) {}

  ngOnInit(){
    this.apiService.getMecaniciens(this.roleName);
  }

  onSubmit() {
    if (this.data) {
      // Appel de la méthode registerData pour envoyer les données à l'API
      this.apiService.registerData({ data: this.data }).subscribe({
        next: (response) => {
          // Fermer le modal après l'ajout
          const modalElement = document.getElementById('addMecanicienModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement!);
          modalInstance?.hide();

          // Supprimer manuellement la classe modal-backdrop
          setTimeout(() => {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove(); // Supprime le backdrop du DOM
            }

            // Afficher le toast après la suppression du backdrop
            this.showToast();
          }, 300); // Ajout d'un léger délai pour s'assurer que le modal est bien fermé
          
        },
        error: (error) => {
          console.log('data service', this.data);
          console.error('Erreur', error);
        },
      });
    }
  }



  // Fonction pour afficher le toast Bootstrap
  showToast() {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}
