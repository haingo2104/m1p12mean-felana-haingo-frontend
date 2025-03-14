import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SendUserService } from '../../services/SendUserService';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data = {
    name :'',
    email : '',
    phone:'1224455',
    password : '',
    role:'client'
  }

  constructor(private readonly apiService: SendUserService){}
  onSubmit(){
    if(this.data) {
      this.apiService.sendData({ data: this.data}).subscribe({
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
