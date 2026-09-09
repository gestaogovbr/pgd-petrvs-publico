import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'indicador-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './indicador-card.component.html',
  styleUrls: ['./indicador-card.component.scss'],
})
export class IndicadorCardComponent {
  @Input({ required: true }) titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() carregando = false;
  @Input() semDados = false;
}
