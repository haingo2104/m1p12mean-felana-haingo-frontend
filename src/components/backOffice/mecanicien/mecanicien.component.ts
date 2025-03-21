import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MecanicienService } from '../../../services/MecanicienService';

@Component({
  selector: 'app-mecanicien',
  imports: [CommonModule],
  templateUrl: './mecanicien.component.html',
  styleUrl: './mecanicien.component.css',
})
export class MecanicienComponent {
  data = {
    name: '',
    email: '',
    phone: '',
    password:' ',
    role: 'mecanicien', // Ajout du rôle par défaut
    specialty: '',
  };

  constructor(private mecanicienService: MecanicienService) {}

  onSubmit(): void {
    console.log('Données du formulaire soumises :', this.data);

    // Appel de la méthode registerData pour envoyer les données à l'API
    this.mecanicienService.registerData(this.data).subscribe({
      next: (response) => {
        console.log('Enregistrement réussi :', response);
        alert('Mécanicien enregistré avec succès !');
      },
      error: (error) => {
        console.error("Erreur lors de l'enregistrement :", error);
        alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
      },
    });
  }
}
