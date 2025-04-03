import { Component } from '@angular/core';
import { UsersServiceService } from '../../../services/users-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clients : any[] = []
  roleName = "client"
 constructor(private apiService: UsersServiceService) {}

  ngOnInit(){
    this.apiService.getClients(this.roleName).subscribe((clients) => {
      this.clients = clients;
    });
  }

}
