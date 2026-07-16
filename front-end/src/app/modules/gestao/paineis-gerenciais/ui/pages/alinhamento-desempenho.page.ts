import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelApiClient, FiltrosPainel, Indicador } from '../../infra/painel-api.client';
import { PainelPdfService } from '../../infra/painel-pdf.service';
import { CHART_COLORS } from 'src/app/services/chart';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';

@Component({
  selector: 'alinhamento-desempenho-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PainelFiltrosComponent,
    IndicadorBarraHorizontalComponent,
  ],
  templateUrl: './alinhamento-desempenho.page.html',
})
export class AlinhamentoDesempenhoPage implements OnInit {
  private readonly api = inject(PainelApiClient);
  private readonly pdfService = inject(PainelPdfService);

  readonly unidadeInicialId = signal('');
  readonly unidadeInicialSigla = signal('');
  readonly unidadeInicialNome = signal('');

  readonly alinhamentoInstitucional = signal<Indicador | null>(null);
  readonly avaliacoesPlanoEntrega = signal<Indicador | null>(null);
  readonly avaliacoesPlanoTrabalho = signal<Indicador | null>(null);

  readonly carregandoAlinhamento = signal(false);
  readonly carregandoAvaliacoesPE = signal(false);
  readonly carregandoAvaliacoesPT = signal(false);

  readonly carregandoAlgum = computed(() =>
    this.carregandoAlinhamento() || this.carregandoAvaliacoesPE() || this.carregandoAvaliacoesPT()
  );

  private readonly filtrosAtuais = signal<FiltrosPainel | null>(null);
  private readonly unidadeAtualLabel = signal('');

  readonly tipoConsultaLabel = computed(() => {
    const filtros = this.filtrosAtuais();
    return filtros?.tipo_consulta === 'historico' ? 'Histórico' : 'Situação Atual';
  });

  readonly unidadeLabel = computed(() => this.unidadeAtualLabel());

  readonly periodoLabel = computed(() => {
    const filtros = this.filtrosAtuais();
    if (!filtros?.data_inicio || !filtros?.data_fim) return '';
    return `${filtros.data_inicio} a ${filtros.data_fim}`;
  });

  readonly dataGeracaoLabel = () => new Date().toLocaleString('pt-BR');

  ngOnInit(): void {
    this.api.getUnidadeInicial().subscribe(unidade => {
      if (!unidade.unidade_id) return;

      this.unidadeInicialId.set(unidade.unidade_id);
      this.unidadeInicialSigla.set(unidade.unidade_sigla ?? '');
      this.unidadeInicialNome.set(unidade.unidade_nome ?? '');
      this.unidadeAtualLabel.set(`${unidade.unidade_sigla ?? ''} - ${unidade.unidade_nome ?? ''}`);

      this.carregarDados({
        tipo_consulta: 'situacao_atual',
        unidade_id: unidade.unidade_id,
      });
    });
  }

  onFiltrosChange(filtros: FiltrosPainel): void {
    this.carregarDados(filtros);
  }

  onUnidadeChange(unidade: { sigla: string; nome: string }): void {
    this.unidadeAtualLabel.set(`${unidade.sigla} - ${unidade.nome}`);
  }

  exportarPdf(): void {
    const container = document.querySelector('alinhamento-desempenho-page');
    if (!container) return;

    const indicadorEls = container.querySelectorAll('indicador-barra-horizontal');
    const cores = CHART_COLORS;

    const indicadoresData = [
      { dados: this.alinhamentoInstitucional(), titulo: 'Alinhamento institucional das Unidades por nível estratégico', info: 'Apresenta a distribuição percentual das entregas de acordo com seu nível de alinhamento institucional, considerando entregas vinculadas ao Planejamento Institucional, à Cadeia de Valor e entregas sem vinculação.' },
      { dados: this.avaliacoesPlanoEntrega(), titulo: 'Notas das avaliações dos Planos de Entregas por Unidade organizacional', info: 'Apresenta a distribuição percentual das notas atribuídas aos Planos de Entregas por unidade organizacional.' },
      { dados: this.avaliacoesPlanoTrabalho(), titulo: 'Notas das avaliações dos Planos de Trabalho de acordo com as Unidades', info: 'Apresenta a distribuição percentual das notas atribuídas aos períodos avaliativos dos Planos de Trabalho por unidade organizacional.' },
    ];

    const indicadores = indicadoresData.map((item, i) => {
      const temDados = item.dados && item.dados.distribuicoes.length > 0 && item.dados.distribuicoes.some(d => d.total > 0);
      const canvasEl = indicadorEls[i]?.querySelector('canvas') as HTMLCanvasElement | null;
      return {
        titulo: item.titulo,
        informacaoAdicional: item.info,
        origemDados: 'Sistema PGD Petrvs',
        canvasEl: temDados ? canvasEl : null,
        segmentos: (item.dados?.segmentos ?? []).map((nome, j) => ({ nome, cor: cores[j] ?? '#ccc' })),
        distribuicoes: (item.dados?.distribuicoes ?? []).map(d => ({ sigla: d.unidade_sigla, total: d.total })),
      };
    });

    this.pdfService.exportar(
      {
        painel: 'Alinhamento e Desempenho',
        tipoConsulta: this.tipoConsultaLabel(),
        unidade: this.unidadeLabel(),
        periodo: this.periodoLabel() || undefined,
      },
      indicadores,
    );
  }

  private carregarDados(filtros: FiltrosPainel): void {
    this.filtrosAtuais.set(filtros);

    // Limpa dados anteriores para evitar estado inconsistente
    this.alinhamentoInstitucional.set(null);
    this.avaliacoesPlanoEntrega.set(null);
    this.avaliacoesPlanoTrabalho.set(null);

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
