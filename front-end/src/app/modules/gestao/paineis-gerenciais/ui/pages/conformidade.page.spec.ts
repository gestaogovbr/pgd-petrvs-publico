import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { of, Subject } from 'rxjs';
import { ConformidadePage } from './conformidade.page';
import {
  PainelApiClient,
  FiltrosPainel,
  Indicador,
  UnidadeInicial,
} from '../../infra/painel-api.client';

@Component({ selector: 'app-breadcrumb', standalone: true, template: '' })
class MockBreadcrumbComponent {}

@Component({ selector: 'painel-filtros', standalone: true, template: '' })
class MockPainelFiltrosComponent {
  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';
  @Input() modoData = '';
  @Input() permitirHistorico = true;
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
  @Input() saibaMaisParams: any;
  @Output() unidadeClick = new EventEmitter();
  @Output() voltarClick = new EventEmitter();
}

@Component({ selector: 'pdf-painel', standalone: true, template: '' })
class MockPdfPainelComponent {
  imprimir = jasmine.createSpy();
}

function mockIndicador(total = 10): Indicador {
  return {
    segmentos: ['Pendente', 'Em dia'],
    distribuicoes: [{ unidade_id: 'u1', unidade_sigla: 'SIG', valores: [3, 7], total }],
  };
}

describe('ConformidadePage', () => {
  let component: ConformidadePage;
  let fixture: ComponentFixture<ConformidadePage>;
  let apiSpy: jasmine.SpyObj<PainelApiClient>;

  let unidadeInicial$: Subject<UnidadeInicial>;
  let registroExecPE$: Subject<Indicador>;
  let avaliacaoPE$: Subject<Indicador>;
  let registroExecPT$: Subject<Indicador>;
  let avaliacaoPT$: Subject<Indicador>;
  let unidadesExecPE$: Subject<Indicador>;

  function resetApiSubjects(): void {
    registroExecPE$ = new Subject();
    avaliacaoPE$ = new Subject();
    registroExecPT$ = new Subject();
    avaliacaoPT$ = new Subject();
    unidadesExecPE$ = new Subject();

    apiSpy.getConformidadeRegistroExecucaoPE.and.returnValue(registroExecPE$.asObservable());
    apiSpy.getConformidadeAvaliacaoPE.and.returnValue(avaliacaoPE$.asObservable());
    apiSpy.getConformidadeRegistroExecucaoPT.and.returnValue(registroExecPT$.asObservable());
    apiSpy.getConformidadeAvaliacaoPT.and.returnValue(avaliacaoPT$.asObservable());
    apiSpy.getConformidadeUnidadesExecutorasPE.and.returnValue(unidadesExecPE$.asObservable());
  }

  beforeEach(async () => {
    unidadeInicial$ = new Subject();

    apiSpy = jasmine.createSpyObj('PainelApiClient', [
      'getUnidadeInicial',
      'getConformidadeRegistroExecucaoPE',
      'getConformidadeAvaliacaoPE',
      'getConformidadeRegistroExecucaoPT',
      'getConformidadeAvaliacaoPT',
      'getConformidadeUnidadesExecutorasPE',
    ]);

    apiSpy.getUnidadeInicial.and.returnValue(unidadeInicial$.asObservable());
    resetApiSubjects();

    await TestBed.configureTestingModule({
      imports: [ConformidadePage],
      providers: [
        { provide: PainelApiClient, useValue: apiSpy },
      ],
    })
      .overrideComponent(ConformidadePage, {
        remove: { imports: [] },
        add: {
          imports: [
            MockBreadcrumbComponent,
            MockPainelFiltrosComponent,
            MockIndicadorBarraHorizontalComponent,
            MockPdfPainelComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ConformidadePage);
    component = fixture.componentInstance;
  });

  describe('Inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve disparar 5 chamadas API ao receber unidade inicial', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome' });

      expect(apiSpy.getConformidadeRegistroExecucaoPE).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
      expect(apiSpy.getConformidadeAvaliacaoPE).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
      expect(apiSpy.getConformidadeRegistroExecucaoPT).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
      expect(apiSpy.getConformidadeAvaliacaoPT).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
      expect(apiSpy.getConformidadeUnidadesExecutorasPE).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
    });

    it('não deve disparar chamadas se unidade_id for null', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: null, unidade_sigla: null, unidade_nome: null });

      expect(apiSpy.getConformidadeRegistroExecucaoPE).not.toHaveBeenCalled();
    });
  });

  describe('Chamadas API concorrentes', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome' });
    });

    it('deve ativar todos os 5 flags de carregamento', () => {
      expect(component.carregandoRegistroExecucaoPE()).toBeTrue();
      expect(component.carregandoAvaliacaoPE()).toBeTrue();
      expect(component.carregandoRegistroExecucaoPT()).toBeTrue();
      expect(component.carregandoAvaliacaoPT()).toBeTrue();
      expect(component.carregandoUnidadesExecutorasPE()).toBeTrue();
    });

    it('deve processar respostas independentemente', () => {
      registroExecPE$.next(mockIndicador());
      expect(component.registroExecucaoPE()).not.toBeNull();
      expect(component.carregandoRegistroExecucaoPE()).toBeFalse();

      // Outros ainda carregando
      expect(component.carregandoAvaliacaoPE()).toBeTrue();
      expect(component.carregandoRegistroExecucaoPT()).toBeTrue();
      expect(component.carregandoAvaliacaoPT()).toBeTrue();
      expect(component.carregandoUnidadesExecutorasPE()).toBeTrue();
    });

    it('carregandoAlgum deve ser true enquanto ao menos um carrega', () => {
      expect(component.carregandoAlgum()).toBeTrue();

      registroExecPE$.next(mockIndicador());
      avaliacaoPE$.next(mockIndicador());
      registroExecPT$.next(mockIndicador());
      avaliacaoPT$.next(mockIndicador());
      expect(component.carregandoAlgum()).toBeTrue();

      unidadesExecPE$.next(mockIndicador());
      expect(component.carregandoAlgum()).toBeFalse();
    });

    it('deve desativar flag de carregamento em caso de erro individual', () => {
      registroExecPE$.error(new Error('fail'));
      expect(component.carregandoRegistroExecucaoPE()).toBeFalse();
      expect(component.registroExecucaoPE()).toBeNull();

      // Outros não afetados
      expect(component.carregandoAvaliacaoPE()).toBeTrue();
    });
  });

  describe('Race conditions ao trocar filtros rapidamente', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome' });

      // Completa o primeiro carregamento
      registroExecPE$.next(mockIndicador());
      avaliacaoPE$.next(mockIndicador());
      registroExecPT$.next(mockIndicador());
      avaliacaoPT$.next(mockIndicador());
      unidadesExecPE$.next(mockIndicador());
    });

    it('deve limpar todos os dados anteriores ao trocar filtro', () => {
      resetApiSubjects();

      component.onFiltrosChange({ tipo_consulta: 'historico', unidade_id: 'u2', data_inicio: '2024-01-01', data_fim: '2024-06-30' });

      expect(component.registroExecucaoPE()).toBeNull();
      expect(component.avaliacaoPE()).toBeNull();
      expect(component.registroExecucaoPT()).toBeNull();
      expect(component.avaliacaoPT()).toBeNull();
      expect(component.unidadesExecutorasPE()).toBeNull();
    });

    it('deve resetar todos os drill-downs ao trocar filtro', () => {
      component['drillRegistroExecucaoPE'].set('SUB1');
      component['drillAvaliacaoPE'].set('SUB2');
      component['drillRegistroExecucaoPT'].set('SUB3');
      component['drillAvaliacaoPT'].set('SUB4');
      component['drillUnidadesExecutorasPE'].set('SUB5');

      resetApiSubjects();
      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(component['drillRegistroExecucaoPE']()).toBeNull();
      expect(component['drillAvaliacaoPE']()).toBeNull();
      expect(component['drillRegistroExecucaoPT']()).toBeNull();
      expect(component['drillAvaliacaoPT']()).toBeNull();
      expect(component['drillUnidadesExecutorasPE']()).toBeNull();
    });

    it('deve reativar flags de carregamento ao trocar filtro', () => {
      resetApiSubjects();
      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(component.carregandoRegistroExecucaoPE()).toBeTrue();
      expect(component.carregandoAvaliacaoPE()).toBeTrue();
      expect(component.carregandoRegistroExecucaoPT()).toBeTrue();
      expect(component.carregandoAvaliacaoPT()).toBeTrue();
      expect(component.carregandoUnidadesExecutorasPE()).toBeTrue();
    });

    it('deve fazer 5 chamadas com os novos filtros', () => {
      resetApiSubjects();
      apiSpy.getConformidadeRegistroExecucaoPE.calls.reset();
      apiSpy.getConformidadeAvaliacaoPE.calls.reset();
      apiSpy.getConformidadeRegistroExecucaoPT.calls.reset();
      apiSpy.getConformidadeAvaliacaoPT.calls.reset();
      apiSpy.getConformidadeUnidadesExecutorasPE.calls.reset();

      const novosFiltros: FiltrosPainel = { tipo_consulta: 'historico', unidade_id: 'u3', data_inicio: '2024-01-01', data_fim: '2024-12-31' };
      component.onFiltrosChange(novosFiltros);

      expect(apiSpy.getConformidadeRegistroExecucaoPE).toHaveBeenCalledWith(novosFiltros);
      expect(apiSpy.getConformidadeAvaliacaoPE).toHaveBeenCalledWith(novosFiltros);
      expect(apiSpy.getConformidadeRegistroExecucaoPT).toHaveBeenCalledWith(novosFiltros);
      expect(apiSpy.getConformidadeAvaliacaoPT).toHaveBeenCalledWith(novosFiltros);
      expect(apiSpy.getConformidadeUnidadesExecutorasPE).toHaveBeenCalledWith(novosFiltros);
    });

    it('respostas tardias da chamada anterior ainda atualizam dados (last-write-wins)', () => {
      // Primeiro carregamento completo - dados de u1 já populados

      // Troca para u2
      const secondRegExec$ = new Subject<Indicador>();
      apiSpy.getConformidadeRegistroExecucaoPE.and.returnValue(secondRegExec$.asObservable());
      apiSpy.getConformidadeAvaliacaoPE.and.returnValue(new Subject<Indicador>().asObservable());
      apiSpy.getConformidadeRegistroExecucaoPT.and.returnValue(new Subject<Indicador>().asObservable());
      apiSpy.getConformidadeAvaliacaoPT.and.returnValue(new Subject<Indicador>().asObservable());
      apiSpy.getConformidadeUnidadesExecutorasPE.and.returnValue(new Subject<Indicador>().asObservable());

      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(component.registroExecucaoPE()).toBeNull();
      expect(component.carregandoRegistroExecucaoPE()).toBeTrue();

      // Nova resposta chega
      const novoDado = mockIndicador(99);
      secondRegExec$.next(novoDado);

      expect(component.registroExecucaoPE()).toEqual(novoDado);
      expect(component.carregandoRegistroExecucaoPE()).toBeFalse();
    });
  });

  describe('Drill-down individual', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome' });
      registroExecPE$.next(mockIndicador());
      avaliacaoPE$.next(mockIndicador());
      registroExecPT$.next(mockIndicador());
      avaliacaoPT$.next(mockIndicador());
      unidadesExecPE$.next(mockIndicador());
    });

    it('deve carregar apenas o gráfico selecionado no drill-down (grafico=1)', () => {
      const newRegExec$ = new Subject<Indicador>();
      apiSpy.getConformidadeRegistroExecucaoPE.and.returnValue(newRegExec$.asObservable());
      apiSpy.getConformidadeRegistroExecucaoPE.calls.reset();

      component.onDrillDown(1, { unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(component['drillRegistroExecucaoPE']()).toBe('SUB1');
      expect(component.carregandoRegistroExecucaoPE()).toBeTrue();
      expect(component.registroExecucaoPE()).toBeNull();
      expect(apiSpy.getConformidadeRegistroExecucaoPE).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'sub1' }));

      // Outros indicadores NÃO foram afetados
      expect(component.avaliacaoPE()).not.toBeNull();
      expect(component.carregandoAvaliacaoPE()).toBeFalse();
    });

    it('deve carregar apenas o gráfico 5 (unidades executoras PE) no drill-down', () => {
      const newUE$ = new Subject<Indicador>();
      apiSpy.getConformidadeUnidadesExecutorasPE.and.returnValue(newUE$.asObservable());
      apiSpy.getConformidadeUnidadesExecutorasPE.calls.reset();

      component.onDrillDown(5, { unidade_id: 'sub5', unidade_sigla: 'SUB5' });

      expect(component['drillUnidadesExecutorasPE']()).toBe('SUB5');
      expect(component.carregandoUnidadesExecutorasPE()).toBeTrue();
      expect(apiSpy.getConformidadeUnidadesExecutorasPE).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'sub5' }));
    });

    it('deve voltar ao nível principal ao chamar onVoltarDrill', () => {
      const newRegExec$ = new Subject<Indicador>();
      apiSpy.getConformidadeRegistroExecucaoPE.and.returnValue(newRegExec$.asObservable());

      component['drillRegistroExecucaoPE'].set('SUB1');
      component.onVoltarDrill(1);

      expect(component['drillRegistroExecucaoPE']()).toBeNull();
      expect(apiSpy.getConformidadeRegistroExecucaoPE).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
    });

    it('onDrillDown não faz nada se filtrosAtuais for null', () => {
      component['filtrosAtuais'].set(null);
      apiSpy.getConformidadeRegistroExecucaoPE.calls.reset();

      component.onDrillDown(1, { unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(apiSpy.getConformidadeRegistroExecucaoPE).not.toHaveBeenCalled();
    });

    it('onVoltarDrill não faz nada se filtrosAtuais for null', () => {
      component['filtrosAtuais'].set(null);
      apiSpy.getConformidadeRegistroExecucaoPE.calls.reset();

      component.onVoltarDrill(1);

      expect(apiSpy.getConformidadeRegistroExecucaoPE).not.toHaveBeenCalled();
    });
  });

  describe('onUnidadeChange', () => {
    it('deve atualizar sigla e label da unidade', () => {
      component.onUnidadeChange({ sigla: 'NOVA', nome: 'Nova Unidade' });
      expect(component.unidadeInicialSigla()).toBe('NOVA');
      expect(component.unidadeLabel()).toBe('NOVA - Nova Unidade');
    });
  });

  describe('Computed tipoConsultaLabel e periodoLabel', () => {
    it('tipoConsultaLabel deve refletir os filtros atuais', () => {
      component['filtrosAtuais'].set({ tipo_consulta: 'historico', unidade_id: 'u1', data_inicio: '2024-01-01', data_fim: '2024-06-30' });
      expect(component.tipoConsultaLabel()).toBe('Histórico');
    });

    it('tipoConsultaLabel deve ser Situação Atual por padrão', () => {
      component['filtrosAtuais'].set({ tipo_consulta: 'situacao_atual', unidade_id: 'u1' });
      expect(component.tipoConsultaLabel()).toBe('Situação Atual');
    });

    it('periodoLabel deve mostrar intervalo quando filtros têm datas', () => {
      component['filtrosAtuais'].set({ tipo_consulta: 'historico', unidade_id: 'u1', data_inicio: '2024-01-01', data_fim: '2024-06-30' });
      expect(component.periodoLabel()).toBe('2024-01-01 a 2024-06-30');
    });

    it('periodoLabel deve ser vazio sem datas', () => {
      component['filtrosAtuais'].set({ tipo_consulta: 'situacao_atual', unidade_id: 'u1' });
      expect(component.periodoLabel()).toBe('');
    });
  });
});
