import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelApiClient, FiltrosPainel, Indicador } from '../../infra/painel-api.client';
import { PainelPdfService } from '../../infra/painel-pdf.service';
import { ORIGEM_DADOS } from '../../infra/painel.constants';
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

  readonly origemDados = ORIGEM_DADOS;

  readonly textos = {
    alinhamento: {
      titulo: 'Alinhamento institucional das Unidades por nível estratégico',
      info: 'Apresenta a distribuição percentual das entregas de acordo com seu nível de alinhamento institucional, considerando entregas vinculadas ao Planejamento Institucional, à Cadeia de Valor, a ambos e entregas sem vinculação. São consideradas vinculadas ao Planejamento Institucional as entregas cujo encadeamento alcance o nível mais alto do planejamento (nível 1). São consideradas vinculadas à Cadeia de Valor as entregas cujo encadeamento alcance, no mínimo, o terceiro nível de processo (nível 3). A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    avaliacoesPE: {
      titulo: 'Notas das avaliações dos Planos de Entregas por Unidade organizacional',
      info: 'Apresenta a distribuição percentual das notas atribuídas aos Planos de Entregas por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    avaliacoesPT: {
      titulo: 'Notas das avaliações dos Planos de Trabalho de acordo com as Unidades',
      info: 'Apresenta a distribuição percentual das notas atribuídas aos períodos avaliativos dos Planos de Trabalho por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
  };

  readonly unidadeInicialId = signal('');
  readonly unidadeInicialSigla = signal('');
  readonly unidadeInicialNome = signal('');

  readonly alinhamentoInstitucional = signal<Indicador | null>(null);
  readonly avaliacoesPlanoEntrega = signal<Indicador | null>(null);
  readonly avaliacoesPlanoTrabalho = signal<Indicador | null>(null);

  readonly carregandoAlinhamento = signal(false);
  readonly carregandoAvaliacoesPE = signal(false);
  readonly carregandoAvaliacoesPT = signal(false);

  readonly drillAlinhamento = signal<string | null>(null);
  readonly drillAvaliacoesPE = signal<string | null>(null);
  readonly drillAvaliacoesPT = signal<string | null>(null);

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
      { dados: this.alinhamentoInstitucional(), titulo: this.textos.alinhamento.titulo, info: this.textos.alinhamento.info },
      { dados: this.avaliacoesPlanoEntrega(), titulo: this.textos.avaliacoesPE.titulo, info: this.textos.avaliacoesPE.info },
      { dados: this.avaliacoesPlanoTrabalho(), titulo: this.textos.avaliacoesPT.titulo, info: this.textos.avaliacoesPT.info },
    ];

    const indicadores = indicadoresData.map((item, i) => {
      const temDados = item.dados && item.dados.distribuicoes.length > 0 && item.dados.distribuicoes.some(d => d.total > 0);
      const canvasEl = indicadorEls[i]?.querySelector('canvas') as HTMLCanvasElement | null;
      return {
        titulo: item.titulo,
        informacaoAdicional: item.info,
        origemDados: ORIGEM_DADOS,
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

    this.alinhamentoInstitucional.set(null);
    this.avaliacoesPlanoEntrega.set(null);
    this.avaliacoesPlanoTrabalho.set(null);

    this.drillAlinhamento.set(null);
    this.drillAvaliacoesPE.set(null);
    this.drillAvaliacoesPT.set(null);

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

  onDrillDown(grafico: number, unidade: { unidade_id: string; unidade_sigla: string }): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    const drillFiltros: FiltrosPainel = { ...filtros, unidade_id: unidade.unidade_id };
    this.setDrillSignal(grafico, unidade.unidade_sigla);
    this.carregarGraficoIndividual(grafico, drillFiltros);
  }

  onVoltarDrill(grafico: number): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    this.setDrillSignal(grafico, null);
    this.carregarGraficoIndividual(grafico, filtros);
  }

  private setDrillSignal(grafico: number, valor: string | null): void {
    const signals = [this.drillAlinhamento, this.drillAvaliacoesPE, this.drillAvaliacoesPT];
    signals[grafico - 1]?.set(valor);
  }

  private carregarGraficoIndividual(grafico: number, filtros: FiltrosPainel): void {
    const carregandoSignals = [this.carregandoAlinhamento, this.carregandoAvaliacoesPE, this.carregandoAvaliacoesPT];
    const dadosSignals = [this.alinhamentoInstitucional, this.avaliacoesPlanoEntrega, this.avaliacoesPlanoTrabalho];
    const apiFns = [
      (f: FiltrosPainel) => this.api.getAlinhamentoInstitucional(f),
      (f: FiltrosPainel) => this.api.getAvaliacoesPlanoEntrega(f),
      (f: FiltrosPainel) => this.api.getAvaliacoesPlanoTrabalho(f),
    ];

    const idx = grafico - 1;
    carregandoSignals[idx].set(true);
    dadosSignals[idx].set(null);

    apiFns[idx](filtros).subscribe({
      next: d => { dadosSignals[idx].set(d); carregandoSignals[idx].set(false); },
      error: () => carregandoSignals[idx].set(false),
    });
  }
}
