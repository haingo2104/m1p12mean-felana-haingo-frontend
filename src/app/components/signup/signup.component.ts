import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersServiceService } from '../../services/users-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  confirmPassword: string = '';
  errorMessage: string | null = null; // Message d'erreur
  successMessage: string | null = null; // Message de succès
  isLoading: boolean = false;

  constructor(private readonly apiService: UsersServiceService ,  private router: Router){}
  
  onSubmit(){
    if(this.data) {
      if (!this.validateEmail(this.data.email)) {
        this.errorMessage = 'Email invalide.';
        return;
      }
  
      // Vérification de la longueur du mot de passe
      if (this.data.password.length < 8) {
        this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
        return;
      }
  
      // Vérification de la correspondance des mots de passe
      if (this.data.password !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }
      this.isLoading = true
      this.apiService.sendData({ data: this.data}).subscribe({
        next: (response) => {
          console.log("Réponse de l'API:", response);
          this.successMessage = 'Crée avec succès!'; // Afficher le message de succès
          this.errorMessage = null;
          this.isLoading = false;
          this.data = {
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'client'
          };
          this.router.navigate(['/login']);
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
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
