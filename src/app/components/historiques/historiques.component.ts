import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoriqueService } from '../../services/historique.service';

@Component({
  selector: 'app-historiques',
  imports: [FormsModule,CommonModule],
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.css'
})
export class HistoriquesComponent implements OnInit {
  historiques: any[] = [];
  clientId: string | null = localStorage.getItem('userId');

  constructor(private historiqueService: HistoriqueService) {}

  ngOnInit(): void {
    this.loadHistoriques();
  }

  loadHistoriques(): void {
    if (this.clientId) {
      this.historiqueService.getHistoriques(this.clientId).subscribe(
        (data) => {
          console.log("Données reçues :", data);
          this.historiques = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des historiques de rendez vous:', error);
        }
      );
    } else {
      console.warn("Aucun ID de client trouvé dans le localStorage.");
    }
  }
}
