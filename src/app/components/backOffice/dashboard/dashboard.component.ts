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
      backgroundColor: ['#FF6384', 'green', '#FFCE56']
    }]
  };
  doughnutChartOptions: ChartOptions = { responsive: true };
  doughnutChartType: ChartType = 'doughnut'; // 📊 Ajout du type

  repairsStatusData: ChartData = {
    labels: ['A faire','En cours', 'Terminé'],
    datasets: [{
      data: [0, 0],  // Initialisation des données à zéro
      backgroundColor: ['#D50D0D', '#201866' , '#FFCE56'],
    }]
  };

  mechanicsRepairsData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Réparations terminées',
      data: [],
      backgroundColor: '#36A2EB'
    }]
  };
  
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,  // Supprime la grille verticale
        },
      },
      y: {
        grid: {
          display: false, // Supprime la grille horizontale si nécessaire
        },
        ticks: {
          stepSize: 1, // Affiche des valeurs entières
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Cache la légende si inutile
      },
    },
  };
  
  
  
  barChartType: ChartType = 'bar';

  doughnutChartOptionsRepairs: ChartOptions = { responsive: true };
  doughnutChartTypeRepairs: ChartType = 'pie';

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
    
        // Vérifier que les données sont valides
        if (data && Array.isArray(data) && data.length > 0) {
          // Extraire les statuts et leurs comptages
          const labels = data.map(item => item.status);
          const counts = data.map(item => item.count);
    
          // Gérer les couleurs dynamiquement en fonction des statuts
          const backgroundColors = ['#CEAC2D', '#115C5C', '#FFCE56']; // Définir un tableau de couleurs statiques
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
      complete: () => {}
    });
    
  
    this.dashboardService.getPendingAppointmentsCount().subscribe({
      next: (data) => {
        this.pendingAppointmentsCount = data.pendingAppointmentsCount;
      },
      error: (error) => console.error('Erreur chargement rendez-vous en attente', error),
      complete: () => {}
    });
  
    this.dashboardService.getTotalRepairs(startDate, endDate).subscribe({
      next: (data) => {
        // Vous pouvez accéder à totalRepairs comme suit
        this.totalRepairs = data.totalRepairs;
      },
      error: (error) => console.error('Erreur chargement réparations', error),
      complete: () => {}
    });
    
    this.dashboardService.getRepairsSummary(startDate, endDate).subscribe({
      next: (data) => {
        this.repairsStatusData = {
          labels: ['À faire', 'En cours', 'Terminé'],  // ➕ Ajout de "À faire"
          datasets: [{
            data: [data.aFaire, data.enCours, data.termine], // ➕ Inclure "À faire"
            backgroundColor: ['#D50D0D', '#201866', '#C4AE34'], // ➕ Nouvelle couleur pour "À faire"
          }]
        };
      },
      error: (error) => console.error('Erreur chargement réparations', error),
      complete: () =>{}
    });
    

    this.dashboardService.getMechanicsWithCompletedRepairs().subscribe({
      next: (data) => {
  
        if (data && Array.isArray(data) && data.length > 0) {
          this.mechanicsRepairsData = {
            labels: data.map(m => m.name),
            datasets: [{
              label: 'Réparations terminées',
              data: data.map(m => m.completedRepairs), // ✅ Arrondi à l'entier
              backgroundColor: '#34C4C4'
            }]
          };
        }
      },
      error: (error) => console.error('Erreur chargement réparations par mécanicien', error),
      complete: () =>{}
    });
  
  }
  
}
