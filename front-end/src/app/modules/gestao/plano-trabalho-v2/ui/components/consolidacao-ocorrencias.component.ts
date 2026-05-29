import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Consolidacao, PlanoTrabalho } from '../../domain/types';
import { ConsolidacaoFacade } from '../../application/consolidacao.facade';

@Component({
  selector: 'app-consolidacao-ocorrencias',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './consolidacao-ocorrencias.component.html',
})
export class ConsolidacaoOcorrenciasComponent {
  @Input({ required: true }) consolidacao!: Consolidacao;
  @Input({ required: true }) planoTrabalho!: PlanoTrabalho;

  readonly facade = inject(ConsolidacaoFacade);
}
