import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceConfigService } from '../../../services/service-config.service';

@Component({
  selector: 'app-service-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-config.component.html',
  styleUrls: ['./service-config.component.css'],
})
export class ServiceConfigComponent {
  services: any[] = [];
  constructor(
    private readonly serviceApi: ServiceConfigService
  ) {}

  ngOnInit() {

    this.serviceApi.getAllServices().subscribe((services) => {
      this.services = services;
    });
  }
}
