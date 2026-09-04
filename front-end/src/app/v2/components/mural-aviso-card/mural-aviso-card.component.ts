import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mural-aviso-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mural-aviso-card.component.html'
})
export class MuralAvisoCardComponent {
  @Input() titulo: string = '';
  @Input() conteudo: string = '';
  @Input() remetente: string = '';
  @Input() dataFormatada: string = '';
  @Input() horaFormatada: string = '';
}
