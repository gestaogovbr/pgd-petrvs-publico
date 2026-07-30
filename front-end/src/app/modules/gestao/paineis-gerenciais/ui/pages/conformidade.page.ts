import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelApiClient, FiltrosPainel, Indicador } from '../../infra/painel-api.client';
import { PainelPdfService } from '../../infra/painel-pdf.service';
import { ORIGEM_DADOS } from '../../infra/painel.constants';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';
import { CHART_COLORS } from 'src/app/services/chart';

@Component({
  selector: 'conformidade-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PainelFiltrosComponent,
    IndicadorBarraHorizontalComponent,
  ],
  templateUrl: './conformidade.page.html',
})
export class ConformidadePage implements OnInit {
  private readonly api = inject(PainelApiClient);
  private readonly pdfService = inject(PainelPdfService);

  readonly origemDados = ORIGEM_DADOS;

  readonly textos = {
    registroExecucaoPE: {
      titulo: 'Registro de execução dos Planos de Entregas por unidade organizacional',
      info: 'Apresenta a distribuição percentual da situação dos registros de execução dos Planos de Entregas por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    avaliacaoPE: {
      titulo: 'Avaliação dos Planos de Entregas por unidade organizacional',
      info: 'Apresenta a distribuição percentual da situação das avaliações dos Planos de Entregas por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    registroExecucaoPT: {
      titulo: 'Registro de execução dos Planos de Trabalho por unidade organizacional',
      info: 'Apresenta a distribuição percentual da situação dos registros de execução dos períodos avaliativos dos Planos de Trabalho por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    avaliacaoPT: {
      titulo: 'Avaliação dos Planos de Trabalho por unidade organizacional',
      info: 'Apresenta a distribuição percentual da situação das avaliações dos períodos avaliativos dos Planos de Trabalho por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    unidadesExecutorasPE: {
      titulo: 'Existência de Plano de Entregas vigente nas Unidades Executoras',
      info: 'Apresenta a distribuição percentual das Unidades Executoras que possuem e que não possuem Plano de Entregas vigente, por unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
  };

  readonly unidadeInicialId = signal('');
  readonly unidadeInicialSigla = signal('');
  readonly unidadeInicialNome = signal('');

  readonly registroExecucaoPE = signal<Indicador | null>(null);
  readonly avaliacaoPE = signal<Indicador | null>(null);
  readonly registroExecucaoPT = signal<Indicador | null>(null);
  readonly avaliacaoPT = signal<Indicador | null>(null);
  readonly unidadesExecutorasPE = signal<Indicador | null>(null);

  readonly carregandoRegistroExecucaoPE = signal(false);
  readonly carregandoAvaliacaoPE = signal(false);
  readonly carregandoRegistroExecucaoPT = signal(false);
  readonly carregandoAvaliacaoPT = signal(false);
  readonly carregandoUnidadesExecutorasPE = signal(false);

  readonly drillRegistroExecucaoPE = signal<string | null>(null);
  readonly drillAvaliacaoPE = signal<string | null>(null);
  readonly drillRegistroExecucaoPT = signal<string | null>(null);
  readonly drillAvaliacaoPT = signal<string | null>(null);
  readonly drillUnidadesExecutorasPE = signal<string | null>(null);

  readonly carregandoAlgum = computed(() =>
    this.carregandoRegistroExecucaoPE() || this.carregandoAvaliacaoPE() || this.carregandoRegistroExecucaoPT() || this.carregandoAvaliacaoPT() || this.carregandoUnidadesExecutorasPE()
  );

  private readonly filtrosAtuais = signal<FiltrosPainel | null>(null);
  private readonly unidadeAtualLabel = signal('');

  readonly tipoConsultaLabel = computed(() =>
    this.filtrosAtuais()?.tipo_consulta === 'historico' ? 'Histórico' : 'Situação Atual'
  );
  readonly unidadeLabel = computed(() => this.unidadeAtualLabel());
  readonly periodoLabel = computed(() => {
    const f = this.filtrosAtuais();
    return f?.data_inicio && f?.data_fim ? `${f.data_inicio} a ${f.data_fim}` : '';
  });

  readonly saibaMaisRegistroExecucaoPE = computed(() => this.buildSaibaMaisParams({situacao_conclusao: 'Pendente'}) as Record<string, string>);
  readonly saibaMaisAvaliacaoPE = computed(() => this.buildSaibaMaisParams({situacao_avaliacao: 'Pendente'}) as Record<string, string>);
  readonly saibaMaisRegistroExecucaoPT = computed(() => this.buildSaibaMaisParams({situacao_conclusao: 'Pendente'}) as Record<string, string>);
  readonly saibaMaisAvaliacaoPT = computed(() => this.buildSaibaMaisParams({situacao_avaliacao: 'Pendente'}) as Record<string, string>);
  readonly saibaMaisUnidadesExecutoras = computed(() => this.buildSaibaMaisParams({plano_entregas_vigente: '', executora: 'sim'}) as Record<string, string>);

  ngOnInit(): void {
    this.api.getUnidadeInicial().subscribe(unidade => {
      if (!unidade.unidade_id) return;

      this.unidadeInicialId.set(unidade.unidade_id);
      this.unidadeInicialSigla.set(unidade.unidade_sigla ?? '');
      this.unidadeInicialNome.set(unidade.unidade_nome ?? '');
      this.unidadeAtualLabel.set(`${unidade.unidade_sigla ?? ''} - ${unidade.unidade_nome ?? ''}`);

      this.carregarDados({ tipo_consulta: 'situacao_atual', unidade_id: unidade.unidade_id });
    });
  }

  onFiltrosChange(filtros: FiltrosPainel): void {
    this.carregarDados(filtros);
  }

  onUnidadeChange(unidade: { sigla: string; nome: string }): void {
    this.unidadeAtualLabel.set(`${unidade.sigla} - ${unidade.nome}`);
  }

  exportarPdf(): void {
    const container = document.querySelector('conformidade-page');
    if (!container) return;

    const indicadorEls = container.querySelectorAll('indicador-barra-horizontal');
    const cores = CHART_COLORS;

    const indicadoresConfig = [
      { dados: this.registroExecucaoPE(), titulo: this.textos.registroExecucaoPE.titulo, info: this.textos.registroExecucaoPE.info },
      { dados: this.avaliacaoPE(), titulo: this.textos.avaliacaoPE.titulo, info: this.textos.avaliacaoPE.info },
      { dados: this.registroExecucaoPT(), titulo: this.textos.registroExecucaoPT.titulo, info: this.textos.registroExecucaoPT.info },
      { dados: this.avaliacaoPT(), titulo: this.textos.avaliacaoPT.titulo, info: this.textos.avaliacaoPT.info },
      { dados: this.unidadesExecutorasPE(), titulo: this.textos.unidadesExecutorasPE.titulo, info: this.textos.unidadesExecutorasPE.info },
    ];

    const indicadores = indicadoresConfig.map((item, i) => {
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
        painel: 'Conformidade',
        tipoConsulta: this.tipoConsultaLabel(),
        unidade: this.unidadeLabel(),
        periodo: this.periodoLabel() || undefined,
      },
      indicadores,
    );
  }

  private buildSaibaMaisParams(extra: Record<string, string>): Record<string, string> {
    const filtros = this.filtrosAtuais();
    const params: Record<string, string> = { ...extra };
    if (filtros?.unidade_id) params['unidade_id'] = filtros.unidade_id;
    if (filtros?.data_inicio) params['periodo_inicio'] = filtros.data_inicio;
    if (filtros?.data_fim) params['periodo_fim'] = filtros.data_fim;
    return params;
  }

  private carregarDados(filtros: FiltrosPainel): void {
    this.filtrosAtuais.set(filtros);

    this.registroExecucaoPE.set(null);
    this.avaliacaoPE.set(null);
    this.registroExecucaoPT.set(null);
    this.avaliacaoPT.set(null);
    this.unidadesExecutorasPE.set(null);

    this.drillRegistroExecucaoPE.set(null);
    this.drillAvaliacaoPE.set(null);
    this.drillRegistroExecucaoPT.set(null);
    this.drillAvaliacaoPT.set(null);
    this.drillUnidadesExecutorasPE.set(null);

    this.carregandoRegistroExecucaoPE.set(true);
    this.carregandoAvaliacaoPE.set(true);
    this.carregandoRegistroExecucaoPT.set(true);
    this.carregandoAvaliacaoPT.set(true);
    this.carregandoUnidadesExecutorasPE.set(true);

    this.api.getConformidadeRegistroExecucaoPE(filtros).subscribe({
      next: d => { this.registroExecucaoPE.set(d); this.carregandoRegistroExecucaoPE.set(false); },
      error: () => this.carregandoRegistroExecucaoPE.set(false),
    });

    this.api.getConformidadeAvaliacaoPE(filtros).subscribe({
      next: d => { this.avaliacaoPE.set(d); this.carregandoAvaliacaoPE.set(false); },
      error: () => this.carregandoAvaliacaoPE.set(false),
    });

    this.api.getConformidadeRegistroExecucaoPT(filtros).subscribe({
      next: d => { this.registroExecucaoPT.set(d); this.carregandoRegistroExecucaoPT.set(false); },
      error: () => this.carregandoRegistroExecucaoPT.set(false),
    });

    this.api.getConformidadeAvaliacaoPT(filtros).subscribe({
      next: d => { this.avaliacaoPT.set(d); this.carregandoAvaliacaoPT.set(false); },
      error: () => this.carregandoAvaliacaoPT.set(false),
    });

    this.api.getConformidadeUnidadesExecutorasPE(filtros).subscribe({
      next: d => { this.unidadesExecutorasPE.set(d); this.carregandoUnidadesExecutorasPE.set(false); },
      error: () => this.carregandoUnidadesExecutorasPE.set(false),
    });
  }

  onDrillDown(grafico: number, unidade: { unidade_id: string; unidade_sigla: string }): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    const drillFiltros: FiltrosPainel = { ...filtros, unidade_id: unidade.unidade_id };
    this.drillSignals[grafico - 1].set(unidade.unidade_sigla);
    this.carregarGraficoIndividual(grafico, drillFiltros);
  }

  onVoltarDrill(grafico: number): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    this.drillSignals[grafico - 1].set(null);
    this.carregarGraficoIndividual(grafico, filtros);
  }

  private get drillSignals() {
    return [this.drillRegistroExecucaoPE, this.drillAvaliacaoPE, this.drillRegistroExecucaoPT, this.drillAvaliacaoPT, this.drillUnidadesExecutorasPE];
  }

  private carregarGraficoIndividual(grafico: number, filtros: FiltrosPainel): void {
    const carregandoSignals = [this.carregandoRegistroExecucaoPE, this.carregandoAvaliacaoPE, this.carregandoRegistroExecucaoPT, this.carregandoAvaliacaoPT, this.carregandoUnidadesExecutorasPE];
    const dadosSignals = [this.registroExecucaoPE, this.avaliacaoPE, this.registroExecucaoPT, this.avaliacaoPT, this.unidadesExecutorasPE];
    const apiFns = [
      (f: FiltrosPainel) => this.api.getConformidadeRegistroExecucaoPE(f),
      (f: FiltrosPainel) => this.api.getConformidadeAvaliacaoPE(f),
      (f: FiltrosPainel) => this.api.getConformidadeRegistroExecucaoPT(f),
      (f: FiltrosPainel) => this.api.getConformidadeAvaliacaoPT(f),
      (f: FiltrosPainel) => this.api.getConformidadeUnidadesExecutorasPE(f),
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
