import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from '../../services/AuthentificationService';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data = {
    email : '',
    password : '',
  }

  constructor(private readonly apiService: AuthentificationService){}
  onSubmit(){
    if(this.data) {
      this.apiService.login({ data: this.data}).subscribe({
        next: (response) => {
          console.log("Réponse de l'API:", response);
        },
        error: (error) =>{
          
          console.log('data service',this.data)
          console.error('Erreur', error);
        }
      })
    }
  }
}
