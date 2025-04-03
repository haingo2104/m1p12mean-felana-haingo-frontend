import { Component ,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationServiceService } from '../../services/authentification-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  data = {
    email : '',
    password : '',
  }
  role: string = 'client'; // Valeur par défaut

  errorMessage: string | null = null; // Message d'erreur
  successMessage: string | null = null; // Message de succès
  isLoading: boolean = false;

  constructor(private readonly apiService: AuthentificationServiceService,private route: ActivatedRoute){}

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      console.log('URL Segments:', urlSegments);
  
      const roleFromUrl = urlSegments.length > 1 ? urlSegments[1]?.path : 'client';  
  
  
      if (['mecanicien', 'manager'].includes(roleFromUrl)) {
        this.role = roleFromUrl;
      } else {
        this.role = 'client';  // Si aucun rôle spécifique, on définit le client par défaut
      }
  
      this.setDefaultCredentials(this.role);
    });
  }
  
  
  // Définir les valeurs par défaut pour chaque rôle
  setDefaultCredentials(role: string) {
    const defaultCredentials : any = {
      client: { email: 'haingo.softwell@gmail.com', password: 'client123' },
      mecanicien: { email: 'fara.haingonirina@gmail.com', password: '123456' },
      manager: { email: 'randy.rajaonson@gmail.com', password: '123456' }
    };

    this.data = { ...defaultCredentials[role] };
  }

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
