import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersServiceService } from '../../services/users-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone : true,
  imports: [FormsModule , CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  data = {
    name :'',
    email : '',
    phone:'1224455',
    password : '',
    role:'client'
  }
  errorMessage: string | null = null; // Message d'erreur
  successMessage: string | null = null; // Message de succès
  isLoading: boolean = false;

  constructor(private readonly apiService: UsersServiceService){}
  onSubmit(){
    if(this.data) {
      this.isLoading = true
      this.apiService.sendData({ data: this.data}).subscribe({
        next: (response) => {
          console.log("Réponse de l'API:", response);
          this.successMessage = 'Crée avec succès!'; // Afficher le message de succès
          this.errorMessage = null;
          this.isLoading = false;
        },
        error: (error) =>{
          
          console.log('data service',this.data)
          console.error('Erreur', error);
          this.errorMessage = 'Erreur lors de la création. Veuillez vérifier vos informations.';
          this.successMessage = null;
          this.isLoading = false;
        }
      })
    }
  }

}
