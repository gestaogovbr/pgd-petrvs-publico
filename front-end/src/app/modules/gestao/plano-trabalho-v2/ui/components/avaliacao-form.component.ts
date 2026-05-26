import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { NotaAvaliacao } from '../../domain/types';

@Component({
  selector: 'app-avaliacao-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './avaliacao-form.component.html',
})
export class AvaliacaoFormComponent {
  @Input({ required: true }) consolidacaoId!: string;
  @Input({ required: true }) notas: NotaAvaliacao[] = [];
  @Input() notaSelecionadaId = '';
  @Input() justificativa = '';
  @Input() justificativaObrigatoria = false;
  @Input() emAndamento = false;

  @Output() notaSelecionada = new EventEmitter<string>();
  @Output() justificativaChange = new EventEmitter<string>();
  @Output() submeter = new EventEmitter<void>();

  private readonly notaPalette = ['#c0392b', '#e67e22', '#27ae60', '#1589c0', '#1351b4'];
  private readonly notaIcones = ['fa-frown', 'fa-frown', 'fa-smile', 'fa-smile', 'fa-smile'];

  get podeSalvar(): boolean {
    return !!this.notaSelecionadaId && (!this.justificativaObrigatoria || !!this.justificativa.trim());
  }

  notaColor(index: number, total: number): string {
    if (total <= 1) return this.notaPalette[2];
    const step = (this.notaPalette.length - 1) / (total - 1);
    return this.notaPalette[Math.round(index * step)];
  }

  notaIcone(index: number, total: number): string {
    if (total <= 1) return this.notaIcones[2];
    const step = (this.notaIcones.length - 1) / (total - 1);
    return this.notaIcones[Math.round(index * step)];
  }
}
