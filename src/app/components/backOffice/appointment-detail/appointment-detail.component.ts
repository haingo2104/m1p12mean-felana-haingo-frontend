import { Component, input, OnInit, SimpleChanges } from '@angular/core';
import { AppointmentServiceService } from '../../../services/appointment-service.service';
import { CommonModule } from '@angular/common';
import { MecanicienServiceService } from '../../../services/mecanicien-service.service';
import { FormsModule } from '@angular/forms';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-appointment-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.css'
})
export class AppointmentDetailComponent implements OnInit{
  appointmentId = input<string>('');     
  appointmentDetails: any | null = null;   
  roleName= 'mecanicien';
  mecaniciens: any[] = [];
  selectedMechanic: string = '';
  repairCost: string = '';

  constructor(private readonly appointService: AppointmentServiceService,private apiService: MecanicienServiceService) {}


  ngOnInit(): void {
    if (this.appointmentId) {
      this.fetchAppointmentDetail(this.appointmentId());
    }
    this.apiService.getMecaniciens(this.roleName).subscribe((mecaniciens) => {
      this.mecaniciens = mecaniciens;
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointmentId'] && changes['appointmentId'].currentValue) {
      this.fetchAppointmentDetail(changes['appointmentId'].currentValue);
    }
  }

  fetchAppointmentDetail(appointmentId: string): void {
    this.appointService.fetchAppointmentDetail(appointmentId).subscribe(
      (response) => {
        this.appointmentDetails = response.appointment;
        this.selectedMechanic = response.appointment.mecanicienId._id || '';  
        this.repairCost = response.repairCost || '';  
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du rendez-vous:', error);
      }
    );
  }

  assignMechanic(appointmentId : string) {
    if (!this.selectedMechanic && !this.repairCost) {
      alert('Veuillez sélectionner un mécanicien ou ajouter le prix.');
      return;
    }

    this.appointService.assignMechanic(appointmentId,this.selectedMechanic, this.repairCost).subscribe(
      (response) => {
        this.showToast();
        this.ngOnInit();
        console.log('Réponse du serveur :', response);
      },
      (error) => {
        console.error('Erreur lors de l’assignation du mécanicien :', error);
      }
    );
  }

   // Fonction pour afficher le toast Bootstrap
   showToast() {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}
