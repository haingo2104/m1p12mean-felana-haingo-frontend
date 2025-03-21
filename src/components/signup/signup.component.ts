import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SendUserService } from '../../services/SendUserService';

@Component({
  selector: 'app-signup',
  standalone : true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  data = {
    name :'',
    email : '',
    phone:'1224455',
    password : '',
    role:'manager'
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
