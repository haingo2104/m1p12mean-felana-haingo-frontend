import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationServiceService } from '../../services/authentification-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data = {
    email : '',
    password : '',
  }

  errorMessage: string | null = null; // Message d'erreur
  successMessage: string | null = null; // Message de succès
  isLoading: boolean = false;

  constructor(private readonly apiService: AuthentificationServiceService){}
  onSubmit(){
    if(this.data) {
      this.isLoading = true
      this.apiService.login({ data: this.data}).subscribe({
        next: (response) => {
          console.log("Réponse de l'API:", response);
          this.successMessage = 'Connexion réussie!'; // Afficher le message de succès
          this.errorMessage = null;
          this.isLoading = false;
        },
        error: (error) =>{
          
          console.log('data service',this.data)
          console.error('Erreur', error);
          this.errorMessage = 'Erreur lors de la connexion. Veuillez vérifier vos informations.';
          this.successMessage = null;
          this.isLoading = false;
        }
      })
    }
  }
}
