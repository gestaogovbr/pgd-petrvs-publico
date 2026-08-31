import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { of, Subject, delay } from 'rxjs';
import { GestaoPgdPage, Grafico } from './gestao-pgd.page';
import {
  PainelApiClient,
  FiltrosPainel,
  Indicador,
  SerieAdesao,
  UnidadeInicial,
  UnidadeHistorica,
} from '../../infra/painel-api.client';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';
import { EvolucaoAdesaoChartComponent } from '../components/evolucao-adesao-chart.component';
import { PdfPainelComponent } from '../components/pdf/pdf-painel.component';

// Stubs para child components
@Component({ selector: 'app-breadcrumb', standalone: true, template: '' })
class MockBreadcrumbComponent {}

@Component({ selector: 'painel-filtros', standalone: true, template: '' })
class MockPainelFiltrosComponent {
  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';
  @Input() modoData = '';
  @Input() unidadeSearchFn: any;
  @Output() filtrosChange = new EventEmitter();
  @Output() unidadeChange = new EventEmitter();
}

@Component({ selector: 'indicador-barra-horizontal', standalone: true, template: '' })
class MockIndicadorBarraHorizontalComponent {
  @Input() dados: any;
  @Input() carregando = false;
  @Input() titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() siglaPai = '';
  @Input() drillAtivo = false;
  @Output() unidadeClick = new EventEmitter();
  @Output() voltarClick = new EventEmitter();
}

@Component({ selector: 'evolucao-adesao-chart', standalone: true, template: '' })
class MockEvolucaoAdesaoChartComponent {
  @Input() serie: any[] = [];
  @Input() titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() carregando = false;
  @Input() labelPositivo = '';
  @Input() labelNegativo = '';
  @Input() campoPositivo = '';
  @Input() campoNegativo = '';
}

@Component({ selector: 'pdf-painel', standalone: true, template: '' })
class MockPdfPainelComponent {
  imprimir = jasmine.createSpy();
}

function mockIndicador(total = 10): Indicador {
  return {
    segmentos: ['A', 'B'],
    distribuicoes: [{ unidade_id: 'u1', unidade_sigla: 'SIG', valores: [5, 5], total }],
  };
}

function mockSerieAdesao(): SerieAdesao {
  return {
    serie: [{ periodo: '2024-01', executoras: 5, nao_executoras: 3 }],
  };
}

describe('GestaoPgdPage', () => {
  let component: GestaoPgdPage;
  let fixture: ComponentFixture<GestaoPgdPage>;
  let apiSpy: jasmine.SpyObj<PainelApiClient>;

  let unidadeInicial$: Subject<UnidadeInicial>;
  let unidadesExec$: Subject<Indicador>;
  let evolucaoUni$: Subject<SerieAdesao>;
  let participantes$: Subject<Indicador>;
  let evolucaoPart$: Subject<SerieAdesao>;

  beforeEach(async () => {
    unidadeInicial$ = new Subject();
    unidadesExec$ = new Subject();
    evolucaoUni$ = new Subject();
    participantes$ = new Subject();
    evolucaoPart$ = new Subject();

    apiSpy = jasmine.createSpyObj('PainelApiClient', [
      'getUnidadeInicial',
      'getUnidadesExecutoras',
      'getEvolucaoUnidades',
      'getParticipantesPGD',
      'getEvolucaoParticipantes',
      'getUnidadesHistoricas',
    ]);

    apiSpy.getUnidadeInicial.and.returnValue(unidadeInicial$.asObservable());
    apiSpy.getUnidadesExecutoras.and.returnValue(unidadesExec$.asObservable());
    apiSpy.getEvolucaoUnidades.and.returnValue(evolucaoUni$.asObservable());
    apiSpy.getParticipantesPGD.and.returnValue(participantes$.asObservable());
    apiSpy.getEvolucaoParticipantes.and.returnValue(evolucaoPart$.asObservable());
    apiSpy.getUnidadesHistoricas.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [GestaoPgdPage],
      providers: [
        { provide: PainelApiClient, useValue: apiSpy },
      ],
    })
      .overrideComponent(GestaoPgdPage, {
        remove: {
          imports: [
            BreadcrumbComponent,
            PainelFiltrosComponent,
            IndicadorBarraHorizontalComponent,
            EvolucaoAdesaoChartComponent,
            PdfPainelComponent,
          ],
        },
        add: {
          imports: [
            MockBreadcrumbComponent,
            MockPainelFiltrosComponent,
            MockIndicadorBarraHorizontalComponent,
            MockEvolucaoAdesaoChartComponent,
            MockPdfPainelComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(GestaoPgdPage);
    component = fixture.componentInstance;
  });

  describe('Inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve carregar unidade inicial e disparar 4 chamadas ao API', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      expect(apiSpy.getUnidadesExecutoras).toHaveBeenCalledWith(jasmine.objectContaining({
        tipo_consulta: 'situacao_atual',
        unidade_id: 'u1',
      }));
      expect(apiSpy.getEvolucaoUnidades).toHaveBeenCalled();
      expect(apiSpy.getParticipantesPGD).toHaveBeenCalled();
      expect(apiSpy.getEvolucaoParticipantes).toHaveBeenCalled();
    });

    it('não deve disparar chamadas se unidade_id for null', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: null, unidade_sigla: null, unidade_nome: null, unidade_raiz_id: null, unidade_raiz_sigla: null });

      expect(apiSpy.getUnidadesExecutoras).not.toHaveBeenCalled();
    });

    it('deve atualizar sinais de unidade inicial', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      expect(component.unidadeInicialId()).toBe('u1');
      expect(component.unidadeInicialSigla()).toBe('SIG');
      expect(component.unidadeInicialNome()).toBe('Nome');
    });
  });

  describe('Chamadas API concorrentes', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });
    });

    it('deve ativar todos os flags de carregamento ao iniciar chamadas', () => {
      expect(component.carregandoUnidadesExec()).toBeTrue();
      expect(component.carregandoEvolucaoUni()).toBeTrue();
      expect(component.carregandoParticipantes()).toBeTrue();
      expect(component.carregandoEvolucaoPart()).toBeTrue();
    });

    it('deve atualizar dados independentemente conforme cada API responde', () => {
      // Responde apenas unidades executoras
      unidadesExec$.next(mockIndicador());
      expect(component.unidadesExecutoras()).not.toBeNull();
      expect(component.carregandoUnidadesExec()).toBeFalse();

      // Outros ainda carregando
      expect(component.carregandoEvolucaoUni()).toBeTrue();
      expect(component.carregandoParticipantes()).toBeTrue();
      expect(component.carregandoEvolucaoPart()).toBeTrue();
    });

    it('deve desativar flag de carregamento em caso de erro', () => {
      unidadesExec$.error(new Error('fail'));
      expect(component.carregandoUnidadesExec()).toBeFalse();
      expect(component.unidadesExecutoras()).toBeNull();
    });

    it('carregandoAlgum deve ser true enquanto ao menos um estiver carregando', () => {
      expect(component.carregandoAlgum()).toBeTrue();

      unidadesExec$.next(mockIndicador());
      expect(component.carregandoAlgum()).toBeTrue();

      evolucaoUni$.next(mockSerieAdesao());
      expect(component.carregandoAlgum()).toBeTrue();

      participantes$.next(mockIndicador());
      expect(component.carregandoAlgum()).toBeTrue();

      evolucaoPart$.next(mockSerieAdesao());
      expect(component.carregandoAlgum()).toBeFalse();
    });
  });

  describe('Troca rápida de filtros (race condition)', () => {
    it('deve limpar dados anteriores ao receber novos filtros', () => {
      // Simula primeiro carregamento completo
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });
      unidadesExec$.next(mockIndicador());
      evolucaoUni$.next(mockSerieAdesao());
      participantes$.next(mockIndicador());
      evolucaoPart$.next(mockSerieAdesao());

      expect(component.unidadesExecutoras()).not.toBeNull();

      // Reset subjects para novo ciclo
      unidadesExec$ = new Subject();
      evolucaoUni$ = new Subject();
      participantes$ = new Subject();
      evolucaoPart$ = new Subject();
      apiSpy.getUnidadesExecutoras.and.returnValue(unidadesExec$.asObservable());
      apiSpy.getEvolucaoUnidades.and.returnValue(evolucaoUni$.asObservable());
      apiSpy.getParticipantesPGD.and.returnValue(participantes$.asObservable());
      apiSpy.getEvolucaoParticipantes.and.returnValue(evolucaoPart$.asObservable());

      // Troca de filtro
      component.onFiltrosChange({ tipo_consulta: 'historico', unidade_id: 'u2', data_inicio: '2024-01-01', data_fim: '2024-06-30' });

      // Dados devem ter sido limpos
      expect(component.unidadesExecutoras()).toBeNull();
      expect(component.evolucaoUnidades()).toBeNull();
      expect(component.participantesPGD()).toBeNull();
      expect(component.evolucaoParticipantes()).toBeNull();

      // Flags de carregamento reativados
      expect(component.carregandoUnidadesExec()).toBeTrue();
      expect(component.carregandoEvolucaoUni()).toBeTrue();
    });

    it('deve disparar novas chamadas ao mudar filtros rapidamente (sem cancelamento explícito)', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      // Troca rápida sem esperar resposta anterior
      apiSpy.getUnidadesExecutoras.calls.reset();
      apiSpy.getEvolucaoUnidades.calls.reset();
      apiSpy.getParticipantesPGD.calls.reset();
      apiSpy.getEvolucaoParticipantes.calls.reset();

      // Configura novos subjects
      const newUE$ = new Subject<Indicador>();
      const newEU$ = new Subject<SerieAdesao>();
      const newP$ = new Subject<Indicador>();
      const newEP$ = new Subject<SerieAdesao>();
      apiSpy.getUnidadesExecutoras.and.returnValue(newUE$.asObservable());
      apiSpy.getEvolucaoUnidades.and.returnValue(newEU$.asObservable());
      apiSpy.getParticipantesPGD.and.returnValue(newP$.asObservable());
      apiSpy.getEvolucaoParticipantes.and.returnValue(newEP$.asObservable());

      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(apiSpy.getUnidadesExecutoras).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u2' }));
      expect(apiSpy.getEvolucaoUnidades).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u2' }));
    });

    it('deve resetar drill-down ao trocar filtros', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      // Simula drill-down
      component['drillUnidadesExecutoras'].set('SUB1');
      component['drillParticipantes'].set('SUB2');

      // Reset subjects
      apiSpy.getUnidadesExecutoras.and.returnValue(new Subject<Indicador>().asObservable());
      apiSpy.getEvolucaoUnidades.and.returnValue(new Subject<SerieAdesao>().asObservable());
      apiSpy.getParticipantesPGD.and.returnValue(new Subject<Indicador>().asObservable());
      apiSpy.getEvolucaoParticipantes.and.returnValue(new Subject<SerieAdesao>().asObservable());

      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(component.drillUnidadesExecutoras()).toBeNull();
      expect(component.drillParticipantes()).toBeNull();
    });
  });

  describe('Drill-down', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });
      unidadesExec$.next(mockIndicador());
      evolucaoUni$.next(mockSerieAdesao());
      participantes$.next(mockIndicador());
      evolucaoPart$.next(mockSerieAdesao());
    });

    it('deve carregar dados da subunidade para UNIDADES_EXECUTORAS', () => {
      const newUE$ = new Subject<Indicador>();
      const newEU$ = new Subject<SerieAdesao>();
      apiSpy.getUnidadesExecutoras.and.returnValue(newUE$.asObservable());
      apiSpy.getEvolucaoUnidades.and.returnValue(newEU$.asObservable());

      component.onDrillDown(Grafico.UNIDADES_EXECUTORAS, { unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(component.drillUnidadesExecutoras()).toBe('SUB1');
      expect(component.carregandoUnidadesExec()).toBeTrue();
      expect(component.carregandoEvolucaoUni()).toBeTrue();
      expect(apiSpy.getUnidadesExecutoras).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'sub1' }));
    });

    it('deve carregar dados da subunidade para PARTICIPANTES_PGD', () => {
      const newP$ = new Subject<Indicador>();
      const newEP$ = new Subject<SerieAdesao>();
      apiSpy.getParticipantesPGD.and.returnValue(newP$.asObservable());
      apiSpy.getEvolucaoParticipantes.and.returnValue(newEP$.asObservable());

      component.onDrillDown(Grafico.PARTICIPANTES_PGD, { unidade_id: 'sub2', unidade_sigla: 'SUB2' });

      expect(component.drillParticipantes()).toBe('SUB2');
      expect(component.carregandoParticipantes()).toBeTrue();
      expect(component.carregandoEvolucaoPart()).toBeTrue();
    });

    it('deve voltar ao nível principal ao chamar onVoltarDrill', () => {
      const newUE$ = new Subject<Indicador>();
      const newEU$ = new Subject<SerieAdesao>();
      apiSpy.getUnidadesExecutoras.and.returnValue(newUE$.asObservable());
      apiSpy.getEvolucaoUnidades.and.returnValue(newEU$.asObservable());

      component['drillUnidadesExecutoras'].set('SUB1');
      component.onVoltarDrill(Grafico.UNIDADES_EXECUTORAS);

      expect(component.drillUnidadesExecutoras()).toBeNull();
      expect(apiSpy.getUnidadesExecutoras).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
    });

    it('onDrillDown não deve fazer nada se filtrosAtuais for null', () => {
      component['filtrosAtuais'].set(null);
      apiSpy.getUnidadesExecutoras.calls.reset();

      component.onDrillDown(Grafico.UNIDADES_EXECUTORAS, { unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(apiSpy.getUnidadesExecutoras).not.toHaveBeenCalled();
    });
  });

  describe('Computed signals de dados vazios', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });
    });

    it('semDadosUnidadesExec deve ser true quando dados vazios e não carregando', () => {
      unidadesExec$.next({ segmentos: ['A', 'B'], distribuicoes: [{ unidade_id: 'u1', unidade_sigla: 'SIG', valores: [0, 0], total: 0 }] });
      expect(component.semDadosUnidadesExec()).toBeTrue();
    });

    it('semDadosUnidadesExec deve ser false enquanto carregando', () => {
      expect(component.carregandoUnidadesExec()).toBeTrue();
      expect(component.semDadosUnidadesExec()).toBeFalse();
    });

    it('semDadosParticipantes deve ser true quando dados com total zero', () => {
      participantes$.next({ segmentos: ['X'], distribuicoes: [{ unidade_id: 'u1', unidade_sigla: 'SIG', valores: [0], total: 0 }] });
      expect(component.semDadosParticipantes()).toBeTrue();
    });
  });

  describe('onUnidadeChange', () => {
    it('deve atualizar sigla e nome da unidade', () => {
      component.onUnidadeChange({ sigla: 'NOVA', nome: 'Nova Unidade' });
      expect(component.unidadeInicialSigla()).toBe('NOVA');
      expect(component.unidadeInicialNome()).toBe('Nova Unidade');
    });
  });

  describe('unidadeSearchFn (cache de unidades históricas)', () => {
    it('deve chamar API na primeira busca e cachear resultado', (done: DoneFn) => {
      const unidades: UnidadeHistorica[] = [
        { id: 'u1', sigla: 'ABC', nome: 'Unidade ABC' },
        { id: 'u2', sigla: 'DEF', nome: 'Unidade DEF' },
      ];
      apiSpy.getUnidadesHistoricas.and.returnValue(of(unidades));

      component.unidadeSearchFn('ABC', 1, 10).subscribe(result => {
        expect(result.data.length).toBe(1);
        expect(apiSpy.getUnidadesHistoricas).toHaveBeenCalledTimes(1);

        // Segunda chamada - deve usar cache
        component.unidadeSearchFn('DEF', 1, 10).subscribe(result2 => {
          expect(result2.data.length).toBe(1);
          expect(apiSpy.getUnidadesHistoricas).toHaveBeenCalledTimes(1); // Não chamou novamente
          done();
        });
      });
    });

    it('deve paginar resultados corretamente', (done: DoneFn) => {
      const unidades: UnidadeHistorica[] = Array.from({ length: 25 }, (_, i) => ({
        id: `u${i}`,
        sigla: `SIG${i}`,
        nome: `Unidade ${i}`,
      }));
      apiSpy.getUnidadesHistoricas.and.returnValue(of(unidades));

      component.unidadeSearchFn(null, 1, 10).subscribe(result => {
        expect(result.data.length).toBe(10);
        expect(result.total).toBe(25);
        expect(result.last_page).toBe(3);
        expect(result.current_page).toBe(1);
        done();
      });
    });
  });
});
