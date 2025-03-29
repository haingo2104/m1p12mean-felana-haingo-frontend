import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule , NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  appointmentData: ChartData = {
    labels: ['Confirmé', 'Annulé', 'En attente'], 
    datasets: [{ 
      data: [0, 0, 0], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  doughnutChartOptions: ChartOptions = { responsive: true };
  doughnutChartType: ChartType = 'doughnut'; // 📊 Ajout du type

  repairsStatusData: ChartData = {
    labels: ['En cours', 'Terminé'],
    datasets: [{
      data: [0, 0],  // Initialisation des données à zéro
      backgroundColor: ['#FF6384', '#36A2EB'],
    }]
  };

  doughnutChartOptionsRepairs: ChartOptions = { responsive: true };
  doughnutChartTypeRepairs: ChartType = 'doughnut';

  pendingAppointmentsCount = 0;
  totalRepairs = 0;
  

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    const startDate = '2025-01-01'; // Exemple de date de début
    const endDate = '2026-12-31'; // Exemple de date de fin

    this.dashboardService.getAppointmentsSummary(startDate, endDate).subscribe({
      next: (data) => {
        console.log('Données récupérées pour les rendez-vous :', data);  // Affiche les données retournées
    
        // Vérifier que les données sont valides
        if (data && Array.isArray(data) && data.length > 0) {
          // Extraire les statuts et leurs comptages
          const labels = data.map(item => item.status);
          const counts = data.map(item => item.count);
    
          // Gérer les couleurs dynamiquement en fonction des statuts
          const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56']; // Définir un tableau de couleurs statiques
          const colors = backgroundColors.slice(0, data.length); // Utiliser les couleurs en fonction du nombre de statuts
    
          this.appointmentData = {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: colors // Appliquer les couleurs
            }]
          };
        } else {
          console.error('Aucune donnée valide pour les rendez-vous');
        }
      },
      error: (error) => {
        console.error('Erreur chargement rendez-vous', error);
      },
      complete: () => console.log('✅ Chargement des rendez-vous terminé')
    });
    
  
    this.dashboardService.getPendingAppointmentsCount().subscribe({
      next: (data) => {
        console.log('Données pour rendez-vous en attente :', data); // Affiche les données pour rendez-vous en attente
        this.pendingAppointmentsCount = data.pendingAppointmentsCount;
      },
      error: (error) => console.error('Erreur chargement rendez-vous en attente', error),
      complete: () => console.log('✅ Chargement des rendez-vous en attente terminé')
    });
  
    this.dashboardService.getTotalRepairs(startDate, endDate).subscribe({
      next: (data) => {
        console.log('Données pour réparations :', data); // Affiche l'objet de données { totalRepairs: 1 }
        // Vous pouvez accéder à totalRepairs comme suit
        this.totalRepairs = data.totalRepairs;
      },
      error: (error) => console.error('Erreur chargement réparations', error),
      complete: () => console.log('✅ Chargement des réparations terminé')
    });
    
    this.dashboardService.getRepairsSummary(startDate, endDate).subscribe({
      next: (data) => {
        console.log('Données pour réparations :', data);
        // Vous pouvez accéder à enCours et termine ici
        this.repairsStatusData = {
          labels: ['En cours', 'Terminé'],
          datasets: [{
            data: [data.enCours, data.termine], // Utilisation des données reçues
            backgroundColor: ['#FF6384', '#36A2EB'],
          }]
        };
      },
      error: (error) => console.error('Erreur chargement réparations', error),
      complete: () => console.log('✅ Chargement des réparations terminé')
    });
  
  }
  
}
