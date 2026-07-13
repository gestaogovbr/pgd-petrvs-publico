import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Consolidacao, Ocorrencia, PlanoTrabalho } from '../../domain/types';
import { ConsolidacaoApiClient } from '../../infra/consolidacao-api.client';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-consolidacao-ocorrencias',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './consolidacao-ocorrencias.component.html',
})
export class ConsolidacaoOcorrenciasComponent implements OnInit {
  @Input({ required: true }) consolidacao!: Consolidacao;
  @Input({ required: true }) planoTrabalho!: PlanoTrabalho;

  private readonly api = inject(ConsolidacaoApiClient);

  readonly ocorrencias = signal<Ocorrencia[]>([]);
  readonly carregando = signal(false);

  ngOnInit(): void {
    this.carregando.set(true);
    this.api.getOcorrenciasConsolidacao(this.consolidacao.id)
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe(data => this.ocorrencias.set(data));
  }
}
