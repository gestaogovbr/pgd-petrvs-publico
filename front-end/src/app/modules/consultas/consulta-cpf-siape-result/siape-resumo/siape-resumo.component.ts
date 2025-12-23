import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-siape-resumo',
  templateUrl: './siape-resumo.component.html',
  styleUrls: ['./siape-resumo.component.scss']
})
export class SiapeResumoComponent implements OnInit {

  @Input() resumo: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case 'sucesso': return 'success';
      case 'parcial': return 'warning';
      case 'erro': return 'danger';
      default: return 'secondary';
    }
  }

  public getStatusIcon(status: string): string {
    switch (status) {
      case 'sucesso': return 'bi bi-check-circle-fill';
      case 'parcial': return 'bi bi-exclamation-triangle-fill';
      case 'erro': return 'bi bi-x-circle-fill';
      default: return 'bi bi-info-circle-fill';
    }
  }

  public getStatusLabel(status: string): string {
    switch (status) {
      case 'sucesso': return 'Sucesso';
      case 'parcial': return 'Parcial';
      case 'erro': return 'Erro';
      default: return 'Desconhecido';
    }
  }
}
