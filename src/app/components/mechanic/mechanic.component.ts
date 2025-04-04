import { Component, OnInit } from '@angular/core';
import { RepairService } from '../../services/repair.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mechanic',
  imports: [CommonModule , FormsModule ],
  templateUrl: './mechanic.component.html',
  styleUrl: './mechanic.component.css',
})
export class MechanicComponent implements OnInit {
  repairs: any[] = [];
  mecanicienId: string | null = localStorage.getItem('userId');

  constructor(private repairService: RepairService) {}

  ngOnInit(): void {
    this.loadRepairs();
  }

  loadRepairs(): void {
    if (this.mecanicienId) {
      this.repairService.getMechanicRepairs(this.mecanicienId).subscribe(
        (data) => {
          this.repairs = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des réparations:', error);
        }
      );
    } else {
      console.warn("Aucun ID de mécanicien trouvé dans le localStorage.");
    }
  }
  updateStatus(id: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;  // Cast de l'élément en HTMLSelectElement
    const status = selectElement.value;  // Récupère la valeur du statut sélectionné
  
    this.repairService.updateRepairStatus(id, status).subscribe(
      (response) => {
        this.loadRepairs();  // Recharge les réparations après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    );
  }
  
  
  
}
