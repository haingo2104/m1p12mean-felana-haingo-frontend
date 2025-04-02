import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  data = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private readonly apiService: ContactService) {}
  onSubmit() {
    if (this.data) {
      this.apiService.sendData({ data: this.data }).subscribe({
        next: (response) => {
          console.log(this.data)
          this.resetForm();
          this.showToast();
          console.log("Réponse de l'API:", response);
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

  resetForm() {
    this.data = {
      name: '',
      email: '',
      message: '',
    };
  }
}
