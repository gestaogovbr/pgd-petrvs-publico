import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'indicador-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="indicador">
      <div class="indicador__header">
        <h3 class="indicador__titulo">{{ titulo }}</h3>
        @if (informacaoAdicional) {
          <span class="indicador__info" [title]="informacaoAdicional" aria-label="Informação adicional">
            <i class="bi bi-info-circle" aria-hidden="true"></i>
          </span>
        }
      </div>

      @if (carregando) {
        <div class="d-flex justify-content-center py-4">
          <div class="br-loading" aria-label="Carregando dados"></div>
        </div>
      } @else if (semDados) {
        <p class="indicador__vazio">Sem dados para exibir.</p>
      } @else {
        <ng-content></ng-content>
      }

      @if (origemDados) {
        <p class="indicador__origem">{{ origemDados }}</p>
      }
    </div>
  `,
  styleUrls: ['./indicador-card.component.scss'],
})
export class IndicadorCardComponent {
  @Input({ required: true }) titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() carregando = false;
  @Input() semDados = false;
}
