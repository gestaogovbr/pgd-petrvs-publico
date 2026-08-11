import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { UnidadeSearchFn } from 'src/app/v2/components/unidade-select/unidade-select.component';
import { UnidadeIndexResponse } from 'src/app/v2/services/unidade.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PainelApiClient, FiltrosPainel, Indicador, SerieAdesao, UnidadeHistorica } from '../../infra/painel-api.client';
import { PainelPdfService } from '../../infra/painel-pdf.service';
import { ORIGEM_DADOS, MESES_ABREVIADOS } from '../../infra/painel.constants';
import { CHART_COLORS } from 'src/app/services/chart';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';
import { IndicadorCardComponent } from '../components/indicador-card.component';
import { EvolucaoAdesaoChartComponent } from '../components/evolucao-adesao-chart.component';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';

export enum Grafico {
  UNIDADES_EXECUTORAS = 'unidades_executoras',
  PARTICIPANTES_PGD = 'participantes_pgd',
}

@Component({
  selector: 'gestao-pgd-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PainelFiltrosComponent,
    IndicadorBarraHorizontalComponent,
    IndicadorCardComponent,
    EvolucaoAdesaoChartComponent,
  ],
  templateUrl: './gestao-pgd.page.html',
})
export class GestaoPgdPage implements OnInit {
  private readonly api = inject(PainelApiClient);
  private readonly pdfService = inject(PainelPdfService);

  readonly Grafico = Grafico;

  private unidadesCache: UnidadeHistorica[] | null = null;

  readonly unidadeSearchFn: UnidadeSearchFn = (termo, page, size) => {
    if (this.unidadesCache) {
      return of(this.paginateUnidades(this.unidadesCache, termo, page, size));
    }

    return this.api.getUnidadesHistoricas().pipe(
      map(unidades => {
        this.unidadesCache = unidades;
        return this.paginateUnidades(unidades, termo, page, size);
      })
    );
  };

  readonly origemDados = ORIGEM_DADOS;

  readonly textos = {
    unidadesExecutoras: {
      titulo: 'Unidades Executoras por unidade organizacional',
      info: 'Apresenta a distribuição percentual das unidades organizacionais de acordo com sua classificação como Unidade Executora ou Unidade não Executora. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    evolucaoUnidades: {
      titulo: 'Evolução da adesão das Unidades ao PGD',
      info: 'Apresenta a evolução da adesão das unidades organizacionais ao PGD ao longo do período consultado.',
    },
    participantesPGD: {
      titulo: 'Participantes do PGD por unidade organizacional',
      info: 'Apresenta a distribuição percentual dos agentes públicos ativos de acordo com sua participação no PGD. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
    evolucaoParticipantes: {
      titulo: 'Evolução da adesão dos agentes públicos ao PGD',
      info: 'Apresenta a evolução da adesão dos agentes públicos ao PGD ao longo do período consultado.',
    },
  };

  readonly unidadeInicialId = signal('');
  readonly unidadeInicialSigla = signal('');
  readonly unidadeInicialNome = signal('');

  private readonly unidadeAtualLabel = signal('');
  private readonly periodoAtualLabel = signal('');
  private readonly filtrosAtuais = signal<FiltrosPainel | null>(null);

  readonly unidadesExecutoras = signal<Indicador | null>(null);
  readonly evolucaoUnidades = signal<SerieAdesao | null>(null);
  readonly participantesPGD = signal<Indicador | null>(null);
  readonly evolucaoParticipantes = signal<SerieAdesao | null>(null);

  readonly carregandoUnidadesExec = signal(false);
  readonly carregandoEvolucaoUni = signal(false);
  readonly carregandoParticipantes = signal(false);
  readonly carregandoEvolucaoPart = signal(false);

  readonly drillUnidadesExecutoras = signal<string | null>(null);
  readonly drillParticipantes = signal<string | null>(null);

  readonly semDadosUnidadesExec = computed(() =>
    !this.carregandoUnidadesExec() && (!this.unidadesExecutoras() || this.unidadesExecutoras()!.distribuicoes.every(d => d.total === 0))
  );

  readonly semDadosParticipantes = computed(() =>
    !this.carregandoParticipantes() && (!this.participantesPGD() || this.participantesPGD()!.distribuicoes.every(d => d.total === 0))
  );

  readonly carregandoAlgum = computed(() =>
    this.carregandoUnidadesExec() || this.carregandoEvolucaoUni() || this.carregandoParticipantes() || this.carregandoEvolucaoPart()
  );

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

  onUnidadeChange(unidade: { sigla: string; nome: string }): void {
    this.unidadeInicialSigla.set(unidade.sigla);
    this.unidadeInicialNome.set(unidade.nome);
  }

  exportarPdf(): void {
    const container = document.querySelector('gestao-pgd-page');
    if (!container) return;

    const canvasEls = container.querySelectorAll('canvas');
    const cores = CHART_COLORS;

    const indicadores = [
      {
        titulo: this.textos.unidadesExecutoras.titulo,
        informacaoAdicional: this.textos.unidadesExecutoras.info,
        origemDados: ORIGEM_DADOS,
        canvasEl: this.unidadesExecutoras() && !this.semDadosUnidadesExec() ? canvasEls[0] ?? null : null,
        segmentos: ['Executoras', 'Não Executoras'].map((nome, i) => ({ nome, cor: cores[i] ?? '#ccc' })),
        distribuicoes: (this.unidadesExecutoras()?.distribuicoes ?? []).map(d => ({ sigla: d.unidade_sigla, total: d.total })),
      },
      {
        titulo: this.textos.evolucaoUnidades.titulo,
        informacaoAdicional: this.textos.evolucaoUnidades.info,
        origemDados: ORIGEM_DADOS,
        canvasEl: this.evolucaoUnidades()?.serie?.length ? canvasEls[1] ?? null : null,
        segmentos: ['Executoras', 'Não Executoras'].map((nome, i) => ({ nome, cor: cores[i] ?? '#ccc' })),
        distribuicoes: [],
      },
      {
        titulo: this.textos.participantesPGD.titulo,
        informacaoAdicional: this.textos.participantesPGD.info,
        origemDados: ORIGEM_DADOS,
        canvasEl: this.participantesPGD() && !this.semDadosParticipantes() ? canvasEls[2] ?? null : null,
        segmentos: ['Participantes', 'Não Participantes'].map((nome, i) => ({ nome, cor: cores[i] ?? '#ccc' })),
        distribuicoes: (this.participantesPGD()?.distribuicoes ?? []).map(d => ({ sigla: d.unidade_sigla, total: d.total })),
      },
      {
        titulo: this.textos.evolucaoParticipantes.titulo,
        informacaoAdicional: this.textos.evolucaoParticipantes.info,
        origemDados: ORIGEM_DADOS,
        canvasEl: this.evolucaoParticipantes()?.serie?.length ? canvasEls[3] ?? null : null,
        segmentos: ['Participantes', 'Não Participantes'].map((nome, i) => ({ nome, cor: cores[i] ?? '#ccc' })),
        distribuicoes: [],
      },
    ];

    this.pdfService.exportar(
      {
        painel: 'Gestão do PGD',
        unidade: this.unidadeAtualLabel(),
        periodo: this.periodoAtualLabel() || undefined,
      },
      indicadores,
    );
  }

  private carregarDados(filtros: FiltrosPainel): void {
    this.filtrosAtuais.set(filtros);
    this.unidadeAtualLabel.set(`${this.unidadeInicialSigla()} - ${this.unidadeInicialNome()}`);

    if (filtros.data_fim) {
      const [ano, mesStr] = filtros.data_fim.split('-');
      this.periodoAtualLabel.set(`${MESES_ABREVIADOS[+mesStr - 1]}/${ano}`);
    } else {
      const now = new Date();
      this.periodoAtualLabel.set(`${MESES_ABREVIADOS[now.getMonth()]}/${now.getFullYear()}`);
    }

    this.unidadesExecutoras.set(null);
    this.evolucaoUnidades.set(null);
    this.participantesPGD.set(null);
    this.evolucaoParticipantes.set(null);

    this.drillUnidadesExecutoras.set(null);
    this.drillParticipantes.set(null);

    this.carregandoUnidadesExec.set(true);
    this.carregandoEvolucaoUni.set(true);
    this.carregandoParticipantes.set(true);
    this.carregandoEvolucaoPart.set(true);

    this.api.getUnidadesExecutoras(filtros).subscribe({
      next: dados => { this.unidadesExecutoras.set(dados); this.carregandoUnidadesExec.set(false); },
      error: () => this.carregandoUnidadesExec.set(false),
    });

    this.api.getEvolucaoUnidades(filtros).subscribe({
      next: dados => { this.evolucaoUnidades.set(dados); this.carregandoEvolucaoUni.set(false); },
      error: () => this.carregandoEvolucaoUni.set(false),
    });

    this.api.getParticipantesPGD(filtros).subscribe({
      next: dados => { this.participantesPGD.set(dados); this.carregandoParticipantes.set(false); },
      error: () => this.carregandoParticipantes.set(false),
    });

    this.api.getEvolucaoParticipantes(filtros).subscribe({
      next: dados => { this.evolucaoParticipantes.set(dados); this.carregandoEvolucaoPart.set(false); },
      error: () => this.carregandoEvolucaoPart.set(false),
    });
  }

  onDrillDown(grafico: Grafico, unidade: { unidade_id: string; unidade_sigla: string }): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    const drillFiltros = { ...filtros, unidade_id: unidade.unidade_id };

    if (grafico === Grafico.UNIDADES_EXECUTORAS) {
      this.drillUnidadesExecutoras.set(unidade.unidade_sigla);
      this.carregandoUnidadesExec.set(true);
      this.carregandoEvolucaoUni.set(true);
      this.unidadesExecutoras.set(null);
      this.evolucaoUnidades.set(null);

      this.api.getUnidadesExecutoras(drillFiltros).subscribe({
        next: d => { this.unidadesExecutoras.set(d); this.carregandoUnidadesExec.set(false); },
        error: () => this.carregandoUnidadesExec.set(false),
      });
      this.api.getEvolucaoUnidades(drillFiltros).subscribe({
        next: d => { this.evolucaoUnidades.set(d); this.carregandoEvolucaoUni.set(false); },
        error: () => this.carregandoEvolucaoUni.set(false),
      });
    }

    if (grafico === Grafico.PARTICIPANTES_PGD) {
      this.drillParticipantes.set(unidade.unidade_sigla);
      this.carregandoParticipantes.set(true);
      this.carregandoEvolucaoPart.set(true);
      this.participantesPGD.set(null);
      this.evolucaoParticipantes.set(null);

      this.api.getParticipantesPGD(drillFiltros).subscribe({
        next: d => { this.participantesPGD.set(d); this.carregandoParticipantes.set(false); },
        error: () => this.carregandoParticipantes.set(false),
      });
      this.api.getEvolucaoParticipantes(drillFiltros).subscribe({
        next: d => { this.evolucaoParticipantes.set(d); this.carregandoEvolucaoPart.set(false); },
        error: () => this.carregandoEvolucaoPart.set(false),
      });
    }
  }

  onVoltarDrill(grafico: Grafico): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    if (grafico === Grafico.UNIDADES_EXECUTORAS) {
      this.drillUnidadesExecutoras.set(null);
      this.carregandoUnidadesExec.set(true);
      this.carregandoEvolucaoUni.set(true);
      this.unidadesExecutoras.set(null);
      this.evolucaoUnidades.set(null);

      this.api.getUnidadesExecutoras(filtros).subscribe({
        next: d => { this.unidadesExecutoras.set(d); this.carregandoUnidadesExec.set(false); },
        error: () => this.carregandoUnidadesExec.set(false),
      });
      this.api.getEvolucaoUnidades(filtros).subscribe({
        next: d => { this.evolucaoUnidades.set(d); this.carregandoEvolucaoUni.set(false); },
        error: () => this.carregandoEvolucaoUni.set(false),
      });
    }

    if (grafico === Grafico.PARTICIPANTES_PGD) {
      this.drillParticipantes.set(null);
      this.carregandoParticipantes.set(true);
      this.carregandoEvolucaoPart.set(true);
      this.participantesPGD.set(null);
      this.evolucaoParticipantes.set(null);

      this.api.getParticipantesPGD(filtros).subscribe({
        next: d => { this.participantesPGD.set(d); this.carregandoParticipantes.set(false); },
        error: () => this.carregandoParticipantes.set(false),
      });
      this.api.getEvolucaoParticipantes(filtros).subscribe({
        next: d => { this.evolucaoParticipantes.set(d); this.carregandoEvolucaoPart.set(false); },
        error: () => this.carregandoEvolucaoPart.set(false),
      });
    }
  }

  private paginateUnidades(unidades: UnidadeHistorica[], termo: string | null, page: number, size: number): UnidadeIndexResponse {
    let filtered = unidades;

    if (termo) {
      const lower = termo.toLowerCase();
      filtered = unidades.filter(u =>
        u.sigla.toLowerCase().includes(lower) || u.nome.toLowerCase().includes(lower)
      );
    }

    const total = filtered.length;
    const lastPage = Math.max(1, Math.ceil(total / size));
    const start = (page - 1) * size;
    const data = filtered.slice(start, start + size).map(u => ({ id: u.id, sigla: u.sigla, nome: u.nome }) as unknown as Unidade);

    return { data, total, current_page: page, last_page: lastPage, per_page: size };
  }
}
