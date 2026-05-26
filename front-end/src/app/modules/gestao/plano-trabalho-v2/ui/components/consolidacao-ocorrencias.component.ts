import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Consolidacao, PlanoTrabalho } from '../../domain/types';
import { ConsolidacaoFacade } from '../../application/consolidacao.facade';
import { ConsolidacaoPolicy } from '../../application/consolidacao.policy';
import { OcorrenciaFormComponent } from './ocorrencia-form.component';

@Component({
  selector: 'app-consolidacao-ocorrencias',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, OcorrenciaFormComponent],
  templateUrl: './consolidacao-ocorrencias.component.html',
})
export class ConsolidacaoOcorrenciasComponent {
  @Input({ required: true }) consolidacao!: Consolidacao;
  @Input({ required: true }) planoTrabalho!: PlanoTrabalho;

  readonly facade = inject(ConsolidacaoFacade);
  readonly consolidacaoPolicy = inject(ConsolidacaoPolicy);

  podeRegistrar(): boolean {
    return this.consolidacaoPolicy.podeRegistrar(this.planoTrabalho);
  }

  ocorrenciaEmEdicaoNesta(): boolean {
    return this.facade.ocorrenciaEmEdicao()?.consolidacaoId === this.consolidacao.id;
  }
}
