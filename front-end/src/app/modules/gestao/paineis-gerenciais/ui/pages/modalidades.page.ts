import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelApiClient, FiltrosPainel, Indicador, IndicadorTeletrabalho, DrillTarget } from '../../infra/painel-api.client';
import { ORIGEM_DADOS } from '../../infra/painel.constants';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';
import { IndicadorBarraVerticalComponent } from '../components/indicador-barra-vertical.component';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';
import { CHART_COLORS } from 'src/app/services/chart';
import { PdfPainelComponent, PdfIndicadorConfig } from '../components/pdf/pdf-painel.component';

@Component({
  selector: 'modalidades-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PainelFiltrosComponent,
    IndicadorBarraVerticalComponent,
    IndicadorBarraHorizontalComponent,
    PdfPainelComponent,
  ],
  templateUrl: './modalidades.page.html',
})
export class ModalidadesPage implements OnInit {
  private readonly api = inject(PainelApiClient);

  @ViewChild(PdfPainelComponent) pdfPainel!: PdfPainelComponent;
  @ViewChildren(IndicadorBarraVerticalComponent) barrasVerticais!: QueryList<IndicadorBarraVerticalComponent>;
  @ViewChildren(IndicadorBarraHorizontalComponent) barrasHorizontais!: QueryList<IndicadorBarraHorizontalComponent>;

  readonly origemDados = ORIGEM_DADOS;

  readonly textos = computed(() => ({
    substituicao: {
      titulo: `Participação na modalidade Teletrabalho no Exterior (VIII, art. 12, D.11072/22 - substituição) - ${this.unidadeInicialSigla() || '...'}`,
      info: 'Apresenta o percentual de participantes em Teletrabalho no Exterior com fundamento no inciso VII (substituição) na Unidade Autorizadora, permitindo compará-lo ao limite legal aplicável. Para fins de conformidade, considera-se o limite legal vigente na data da concessão da autorização para participação nessa modalidade.',
    },
    discricionario: {
      titulo: `Participação na modalidade Teletrabalho no Exterior (§7º, art. 12, D.11072/22 - discricionário) - ${this.unidadeInicialSigla() || '...'}`,
      info: 'Apresenta o percentual de participantes em Teletrabalho no Exterior com fundamento no §7º, art. 12, D.11072/22 (discricionário) na Unidade Autorizadora, permitindo compará-lo ao limite legal aplicável. Para fins de conformidade, considera-se o limite legal vigente na data da concessão da autorização para participação nessa modalidade.',
    },
    modalidadesPorUnidade: {
      titulo: 'Modalidades de trabalho por unidade organizacional',
      info: 'Apresenta a distribuição percentual dos participantes do PGD por modalidade de trabalho, de acordo com a unidade organizacional. A primeira linha do gráfico apresenta os dados da unidade selecionada, considerando as informações da própria unidade e as informações de todas as suas unidades subordinadas.',
    },
  }));

  readonly unidadeInicialId = signal('');
  readonly unidadeInicialSigla = signal('');
  readonly unidadeInicialNome = signal('');

  readonly teletrabalhoSubstituicao = signal<IndicadorTeletrabalho | null>(null);
  readonly teletrabalhoDiscricionario = signal<IndicadorTeletrabalho | null>(null);
  readonly modalidadesPorUnidade = signal<Indicador | null>(null);

  readonly carregandoSubstituicao = signal(false);
  readonly carregandoDiscricionario = signal(false);
  readonly carregandoModalidades = signal(false);

  readonly drillUnidadeModalidades = signal<DrillTarget | null>(null);

  readonly carregandoAlgum = computed(() =>
    this.carregandoSubstituicao() || this.carregandoDiscricionario() || this.carregandoModalidades()
  );

  private readonly filtrosAtuais = signal<FiltrosPainel | null>(null);
  private readonly unidadeAtualLabel = signal('');

  readonly saibaMaisParamsSubstituicao = computed(() => this.buildSaibaMaisParams('no exterior substituicao'));
  readonly saibaMaisParamsDiscricionario = computed(() => this.buildSaibaMaisParams('no exterior'));
  readonly saibaMaisParamsModalidadesPorUnidade = computed(() => {
    const drill = this.drillUnidadeModalidades();
    const unidadeId = drill?.unidade_id ?? this.filtrosAtuais()?.unidade_id ?? '';
    return {
      unidade_id: unidadeId,
      incluir_unidades_subordinadas: 'true',
    };
  });

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
    this.unidadeInicialSigla.set(unidade.sigla);
    this.unidadeAtualLabel.set(`${unidade.sigla} - ${unidade.nome}`);
  }

  exportarPdf(): void {
    const cores = CHART_COLORS;
    const verticais = this.barrasVerticais.toArray();
    const horizontais = this.barrasHorizontais.toArray();

    const indicadores: PdfIndicadorConfig[] = [
      {
        titulo: this.textos().substituicao.titulo,
        informacaoAdicional: this.textos().substituicao.info,
        origemDados: ORIGEM_DADOS,
        chartComponent: verticais[0] ?? null,
        segmentos: [{ nome: 'Taxa de participação', cor: cores[3] }, { nome: 'Limite legal', cor: cores[2] }],
        distribuicoes: [],
      },
      {
        titulo: this.textos().discricionario.titulo,
        informacaoAdicional: this.textos().discricionario.info,
        origemDados: ORIGEM_DADOS,
        chartComponent: verticais[1] ?? null,
        segmentos: [{ nome: 'Taxa de participação', cor: cores[3] }, { nome: 'Limite legal', cor: cores[2] }],
        distribuicoes: [],
      },
      {
        titulo: this.textos().modalidadesPorUnidade.titulo,
        informacaoAdicional: this.textos().modalidadesPorUnidade.info,
        origemDados: ORIGEM_DADOS,
        chartComponent: horizontais[0] ?? null,
        segmentos: (this.modalidadesPorUnidade()?.segmentos ?? []).map((nome, j) => ({ nome, cor: cores[j] ?? '#ccc' })),
        distribuicoes: (this.modalidadesPorUnidade()?.distribuicoes ?? []).map(d => ({ sigla: d.unidade_sigla, total: d.total })),
      },
    ];

    this.pdfPainel.imprimir(
      {
        painel: 'Modalidades',
        unidade: this.unidadeAtualLabel(),
      },
      indicadores,
    );
  }

  private buildSaibaMaisParams(modalidade: string): Record<string, string> {
    return {
      modalidadeSouGov: modalidade,
      unidade_id: this.unidadeInicialId(),
      incluir_unidades_subordinadas: 'true',
    };
  }

  private carregarDados(filtros: FiltrosPainel): void {
    this.filtrosAtuais.set(filtros);

    this.teletrabalhoSubstituicao.set(null);
    this.teletrabalhoDiscricionario.set(null);
    this.modalidadesPorUnidade.set(null);

    this.drillUnidadeModalidades.set(null);

    this.carregandoSubstituicao.set(true);
    this.carregandoDiscricionario.set(true);
    this.carregandoModalidades.set(true);

    this.api.getTeletrabalhoSubstituicao(filtros).subscribe({
      next: dados => { this.teletrabalhoSubstituicao.set(dados); this.carregandoSubstituicao.set(false); },
      error: () => this.carregandoSubstituicao.set(false),
    });

    this.api.getTeletrabalhoDiscricionario(filtros).subscribe({
      next: dados => { this.teletrabalhoDiscricionario.set(dados); this.carregandoDiscricionario.set(false); },
      error: () => this.carregandoDiscricionario.set(false),
    });

    this.api.getModalidadesPorUnidade(filtros).subscribe({
      next: dados => { this.modalidadesPorUnidade.set(dados); this.carregandoModalidades.set(false); },
      error: () => this.carregandoModalidades.set(false),
    });
  }

  onDrillDown(unidade: DrillTarget): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    this.drillUnidadeModalidades.set(unidade);
    this.carregandoModalidades.set(true);
    this.modalidadesPorUnidade.set(null);

    const drillFiltros: FiltrosPainel = { ...filtros, unidade_id: unidade.unidade_id };
    this.api.getModalidadesPorUnidade(drillFiltros).subscribe({
      next: d => { this.modalidadesPorUnidade.set(d); this.carregandoModalidades.set(false); },
      error: () => this.carregandoModalidades.set(false),
    });
  }

  onVoltarDrill(): void {
    const filtros = this.filtrosAtuais();
    if (!filtros) return;

    this.drillUnidadeModalidades.set(null);
    this.carregandoModalidades.set(true);
    this.modalidadesPorUnidade.set(null);

    this.api.getModalidadesPorUnidade(filtros).subscribe({
      next: d => { this.modalidadesPorUnidade.set(d); this.carregandoModalidades.set(false); },
      error: () => this.carregandoModalidades.set(false),
    });
  }
}
