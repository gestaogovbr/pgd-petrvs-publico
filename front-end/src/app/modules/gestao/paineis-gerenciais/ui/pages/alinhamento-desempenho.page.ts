import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelApiClient, FiltrosPainel, Indicador } from '../../infra/painel-api.client';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';

@Component({
  selector: 'alinhamento-desempenho-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    PainelFiltrosComponent,
    IndicadorBarraHorizontalComponent,
  ],
  templateUrl: './alinhamento-desempenho.page.html',
})
export class AlinhamentoDesempenhoPage implements OnInit {
  private readonly api = inject(PainelApiClient);

  readonly unidadeInicialId = signal('');
  readonly unidadeInicialSigla = signal('');
  readonly unidadeInicialNome = signal('');

  readonly alinhamentoInstitucional = signal<Indicador | null>(null);
  readonly avaliacoesPlanoEntrega = signal<Indicador | null>(null);
  readonly avaliacoesPlanoTrabalho = signal<Indicador | null>(null);

  readonly carregandoAlinhamento = signal(false);
  readonly carregandoAvaliacoesPE = signal(false);
  readonly carregandoAvaliacoesPT = signal(false);

  ngOnInit(): void {
    this.api.getUnidadeInicial().subscribe(unidade => {
      if (!unidade.unidade_id) return;

      this.unidadeInicialId.set(unidade.unidade_id);
      this.unidadeInicialSigla.set(unidade.unidade_sigla ?? '');
      this.unidadeInicialNome.set(unidade.unidade_nome ?? '');

      this.carregarDados({
        tipo_consulta: 'situacao_atual',
        unidade_id: unidade.unidade_id,
      });
    });
  }

  onFiltrosChange(filtros: FiltrosPainel): void {
    this.carregarDados(filtros);
  }

  private carregarDados(filtros: FiltrosPainel): void {
    this.carregandoAlinhamento.set(true);
    this.carregandoAvaliacoesPE.set(true);
    this.carregandoAvaliacoesPT.set(true);

    this.api.getAlinhamentoInstitucional(filtros).subscribe({
      next: dados => { this.alinhamentoInstitucional.set(dados); this.carregandoAlinhamento.set(false); },
      error: () => this.carregandoAlinhamento.set(false),
    });

    this.api.getAvaliacoesPlanoEntrega(filtros).subscribe({
      next: dados => { this.avaliacoesPlanoEntrega.set(dados); this.carregandoAvaliacoesPE.set(false); },
      error: () => this.carregandoAvaliacoesPE.set(false),
    });

    this.api.getAvaliacoesPlanoTrabalho(filtros).subscribe({
      next: dados => { this.avaliacoesPlanoTrabalho.set(dados); this.carregandoAvaliacoesPT.set(false); },
      error: () => this.carregandoAvaliacoesPT.set(false),
    });
  }
}
