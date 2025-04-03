import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MecanicienServiceService } from '../../../services/mecanicien-service.service';
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
  selectedMecanicien: any | null = null; 
  confirmModal: bootstrap.Modal | null = null;

  data = {
    name: '',
    email: '',
    phone: '',
    role: 'mecanicien', // Ajout du rôle par défaut
    speciality: '',
  };
  roleName= 'mecanicien';

  constructor(private apiService: MecanicienServiceService) {}

  ngOnInit(){
    this.apiService.getMecaniciens(this.roleName).subscribe((mecaniciens) => {
      this.mecaniciens = mecaniciens;
    });
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

          
          setTimeout(() => {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
            this.ngOnInit(); 
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


  openConfirmModal(mecanicien: any) {
    this.selectedMecanicien = mecanicien;

    const modalElement = document.getElementById('confirmModal');
    this.confirmModal = new bootstrap.Modal(modalElement!);
    this.confirmModal.show(); // Ouvrir la modale
  }

  toggleMecanicienStatus() {
    if (this.selectedMecanicien) {
      const newStatus = this.selectedMecanicien.status === 'active' ? 'inactive' : 'active';

      this.apiService.updateMecanicienStatus(this.selectedMecanicien._id, newStatus).subscribe({
        next: () => {
          this.selectedMecanicien.status = newStatus; // Met à jour le statut localement
          this.selectedMecanicien = null; // Réinitialiser après l'action

          this.ngOnInit(); // Recharger la liste

          if (this.confirmModal) {
            this.confirmModal.hide(); // Fermer la modale après la confirmation
          }

          this.showToast();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut du mécanicien', error);
        },
      });
    }
  }
}
