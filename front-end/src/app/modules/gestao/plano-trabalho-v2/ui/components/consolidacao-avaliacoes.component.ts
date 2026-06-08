import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Consolidacao, PlanoTrabalho } from '../../domain/types';
import { ConsolidacaoFacade } from '../../application/consolidacao.facade';
import { ConsolidacaoPolicy } from '../../application/consolidacao.policy';
import { AvaliacaoFormComponent } from './avaliacao-form.component';
import { RecursoFormComponent } from './recurso-form.component';

@Component({
  selector: 'app-consolidacao-avaliacoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, AvaliacaoFormComponent, RecursoFormComponent],
  templateUrl: './consolidacao-avaliacoes.component.html',
})
export class ConsolidacaoAvaliacoesComponent {
  @Input({ required: true }) consolidacao!: Consolidacao;
  @Input({ required: true }) planoTrabalho!: PlanoTrabalho;
  @Input() isGestorHierarquia = false;

  readonly facade = inject(ConsolidacaoFacade);
  readonly consolidacaoPolicy = inject(ConsolidacaoPolicy);

  private readonly notaPalette = ['#c0392b', '#e67e22', '#27ae60', '#1589c0', '#1351b4'];
  private readonly notaIcones = ['fa-frown', 'fa-frown', 'fa-smile', 'fa-smile', 'fa-smile'];

  notaLabel(nota: string | number | null | undefined): string {
    return String(nota ?? '').replace(/^"|"$/g, '');
  }

  notaIndexPorId(notaId: string, notaTexto?: string | number | null): number {
    const notas = this.facade.notas();
    const byId = notas.findIndex(n => n.id === notaId);
    if (byId !== -1) return byId;
    if (notaTexto) {
      const clean = this.notaLabel(notaTexto);
      return notas.findIndex(n => n.nota === clean);
    }
    return -1;
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
