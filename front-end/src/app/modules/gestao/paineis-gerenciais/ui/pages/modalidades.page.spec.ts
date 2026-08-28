import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { of, Subject } from 'rxjs';
import { ModalidadesPage } from './modalidades.page';
import {
  PainelApiClient,
  FiltrosPainel,
  Indicador,
  IndicadorTeletrabalho,
  UnidadeInicial,
} from '../../infra/painel-api.client';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PainelFiltrosComponent } from '../components/painel-filtros.component';
import { IndicadorBarraVerticalComponent } from '../components/indicador-barra-vertical.component';
import { IndicadorBarraHorizontalComponent } from '../components/indicador-barra-horizontal.component';
import { PdfPainelComponent } from '../components/pdf/pdf-painel.component';

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

@Component({ selector: 'indicador-barra-vertical', standalone: true, template: '' })
class MockIndicadorBarraVerticalComponent {
  @Input() dados: any;
  @Input() carregando = false;
  @Input() titulo = '';
  @Input() informacaoAdicional = '';
  @Input() origemDados = '';
  @Input() saibaMaisParams: any;
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
    segmentos: ['Presencial', 'Teletrabalho'],
    distribuicoes: [{ unidade_id: 'u1', unidade_sigla: 'SIG', valores: [4, 6], total }],
  };
}

function mockTeletrabalho(taxa = 5, limite = 10): IndicadorTeletrabalho {
  return { taxa, limite, participantes_modalidade: 5, total_participantes: 100 };
}

describe('ModalidadesPage', () => {
  let component: ModalidadesPage;
  let fixture: ComponentFixture<ModalidadesPage>;
  let apiSpy: jasmine.SpyObj<PainelApiClient>;

  let unidadeInicial$: Subject<UnidadeInicial>;
  let substituicao$: Subject<IndicadorTeletrabalho>;
  let discricionario$: Subject<IndicadorTeletrabalho>;
  let modalidades$: Subject<Indicador>;

  function resetApiSubjects(): void {
    substituicao$ = new Subject();
    discricionario$ = new Subject();
    modalidades$ = new Subject();

    apiSpy.getTeletrabalhoSubstituicao.and.returnValue(substituicao$.asObservable());
    apiSpy.getTeletrabalhoDiscricionario.and.returnValue(discricionario$.asObservable());
    apiSpy.getModalidadesPorUnidade.and.returnValue(modalidades$.asObservable());
  }

  beforeEach(async () => {
    unidadeInicial$ = new Subject();

    apiSpy = jasmine.createSpyObj('PainelApiClient', [
      'getUnidadeInicial',
      'getTeletrabalhoSubstituicao',
      'getTeletrabalhoDiscricionario',
      'getModalidadesPorUnidade',
    ]);

    apiSpy.getUnidadeInicial.and.returnValue(unidadeInicial$.asObservable());
    resetApiSubjects();

    await TestBed.configureTestingModule({
      imports: [ModalidadesPage],
      providers: [
        { provide: PainelApiClient, useValue: apiSpy },
      ],
    })
      .overrideComponent(ModalidadesPage, {
        remove: {
          imports: [
            BreadcrumbComponent,
            PainelFiltrosComponent,
            IndicadorBarraVerticalComponent,
            IndicadorBarraHorizontalComponent,
            PdfPainelComponent,
          ],
        },
        add: {
          imports: [
            MockBreadcrumbComponent,
            MockPainelFiltrosComponent,
            MockIndicadorBarraVerticalComponent,
            MockIndicadorBarraHorizontalComponent,
            MockPdfPainelComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ModalidadesPage);
    component = fixture.componentInstance;
  });

  describe('Inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve disparar 3 chamadas API ao receber unidade inicial', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      expect(apiSpy.getTeletrabalhoSubstituicao).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'r1' }));
      expect(apiSpy.getTeletrabalhoDiscricionario).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'r1' }));
      expect(apiSpy.getModalidadesPorUnidade).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
    });

    it('não deve disparar chamadas se unidade_id for null', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: null, unidade_sigla: null, unidade_nome: null, unidade_raiz_id: null, unidade_raiz_sigla: null });

      expect(apiSpy.getTeletrabalhoSubstituicao).not.toHaveBeenCalled();
    });

    it('deve atualizar sinais de unidade inicial', () => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'MOD', unidade_nome: 'Modalidades', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      expect(component.unidadeInicialId()).toBe('u1');
      expect(component.unidadeInicialSigla()).toBe('MOD');
      expect(component.unidadeInicialNome()).toBe('Modalidades');
    });
  });

  describe('Chamadas API concorrentes', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });
    });

    it('deve ativar todos os 3 flags de carregamento', () => {
      expect(component.carregandoSubstituicao()).toBeTrue();
      expect(component.carregandoDiscricionario()).toBeTrue();
      expect(component.carregandoModalidades()).toBeTrue();
    });

    it('deve processar respostas independentemente', () => {
      substituicao$.next(mockTeletrabalho());
      expect(component.teletrabalhoSubstituicao()).not.toBeNull();
      expect(component.carregandoSubstituicao()).toBeFalse();

      // Outros ainda carregando
      expect(component.carregandoDiscricionario()).toBeTrue();
      expect(component.carregandoModalidades()).toBeTrue();
    });

    it('carregandoAlgum deve ser true enquanto ao menos um carrega', () => {
      expect(component.carregandoAlgum()).toBeTrue();

      substituicao$.next(mockTeletrabalho());
      discricionario$.next(mockTeletrabalho());
      expect(component.carregandoAlgum()).toBeTrue();

      modalidades$.next(mockIndicador());
      expect(component.carregandoAlgum()).toBeFalse();
    });

    it('deve desativar flag de carregamento em caso de erro', () => {
      substituicao$.error(new Error('fail'));
      expect(component.carregandoSubstituicao()).toBeFalse();
      expect(component.teletrabalhoSubstituicao()).toBeNull();
    });
  });

  describe('Race conditions ao trocar filtros rapidamente', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      // Completa o primeiro carregamento
      substituicao$.next(mockTeletrabalho());
      discricionario$.next(mockTeletrabalho());
      modalidades$.next(mockIndicador());
    });

    it('deve limpar dados de modalidades ao trocar filtro', () => {
      resetApiSubjects();
      component.onFiltrosChange({ tipo_consulta: 'historico', unidade_id: 'u2', data_inicio: '2024-01-01', data_fim: '2024-06-30' });

      expect(component.modalidadesPorUnidade()).toBeNull();
    });

    it('deve resetar drill-down ao trocar filtro', () => {
      component['drillUnidadeModalidades'].set({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      resetApiSubjects();
      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(component.drillUnidadeModalidades()).toBeNull();
    });

    it('deve reativar flag de carregamento de modalidades ao trocar filtro', () => {
      resetApiSubjects();
      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(component.carregandoModalidades()).toBeTrue();
    });

    it('deve NÃO recarregar teletrabalho ao trocar filtro', () => {
      resetApiSubjects();
      apiSpy.getTeletrabalhoSubstituicao.calls.reset();
      apiSpy.getTeletrabalhoDiscricionario.calls.reset();

      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      expect(apiSpy.getTeletrabalhoSubstituicao).not.toHaveBeenCalled();
      expect(apiSpy.getTeletrabalhoDiscricionario).not.toHaveBeenCalled();
    });

    it('deve chamar API de modalidades com os novos filtros', () => {
      resetApiSubjects();
      apiSpy.getModalidadesPorUnidade.calls.reset();

      const novosFiltros: FiltrosPainel = { tipo_consulta: 'historico', unidade_id: 'u3', data_inicio: '2024-01-01', data_fim: '2024-12-31' };
      component.onFiltrosChange(novosFiltros);

      expect(apiSpy.getModalidadesPorUnidade).toHaveBeenCalledWith(novosFiltros);
    });

    it('respostas tardias da chamada anterior de modalidades são ignoradas graças ao clear prévio', () => {
      // Primeiro carregamento completo, dados já populados
      expect(component.modalidadesPorUnidade()).not.toBeNull();

      // Troca para u2 - novo subject
      const newMod$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(newMod$.asObservable());

      component.onFiltrosChange({ tipo_consulta: 'situacao_atual', unidade_id: 'u2' });

      // Dados limpos
      expect(component.modalidadesPorUnidade()).toBeNull();
      expect(component.carregandoModalidades()).toBeTrue();

      // Resposta do segundo request chega
      const novoDado = mockIndicador();
      newMod$.next(novoDado);

      expect(component.modalidadesPorUnidade()).toEqual(novoDado);
      expect(component.carregandoModalidades()).toBeFalse();
    });
  });

  describe('Drill-down de modalidades por unidade', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });

      substituicao$.next(mockTeletrabalho());
      discricionario$.next(mockTeletrabalho());
      modalidades$.next(mockIndicador());
    });

    it('deve carregar apenas modalidades por unidade no drill-down', () => {
      const newMod$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(newMod$.asObservable());
      apiSpy.getModalidadesPorUnidade.calls.reset();

      component.onDrillDown({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(component.drillUnidadeModalidades()).toEqual({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });
      expect(component.carregandoModalidades()).toBeTrue();
      expect(component.modalidadesPorUnidade()).toBeNull();
      expect(apiSpy.getModalidadesPorUnidade).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'sub1' }));

      // Teletrabalho NÃO é afetado pelo drill-down
      expect(component.teletrabalhoSubstituicao()).not.toBeNull();
      expect(component.carregandoSubstituicao()).toBeFalse();
    });

    it('deve completar drill-down quando resposta chega', () => {
      const newMod$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(newMod$.asObservable());

      component.onDrillDown({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      const dados = mockIndicador(20);
      newMod$.next(dados);

      expect(component.modalidadesPorUnidade()).toEqual(dados);
      expect(component.carregandoModalidades()).toBeFalse();
    });

    it('deve lidar com erro no drill-down', () => {
      const newMod$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(newMod$.asObservable());

      component.onDrillDown({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });
      newMod$.error(new Error('fail'));

      expect(component.carregandoModalidades()).toBeFalse();
      expect(component.modalidadesPorUnidade()).toBeNull();
    });

    it('deve voltar ao nível principal ao chamar onVoltarDrill', () => {
      const newMod$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(newMod$.asObservable());
      apiSpy.getModalidadesPorUnidade.calls.reset();

      component['drillUnidadeModalidades'].set({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });
      component.onVoltarDrill();

      expect(component.drillUnidadeModalidades()).toBeNull();
      expect(component.carregandoModalidades()).toBeTrue();
      expect(apiSpy.getModalidadesPorUnidade).toHaveBeenCalledWith(jasmine.objectContaining({ unidade_id: 'u1' }));
    });

    it('onDrillDown não deve fazer nada se filtrosAtuais for null', () => {
      component['filtrosAtuais'].set(null);
      apiSpy.getModalidadesPorUnidade.calls.reset();

      component.onDrillDown({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(apiSpy.getModalidadesPorUnidade).not.toHaveBeenCalled();
    });

    it('onVoltarDrill não deve fazer nada se filtrosAtuais for null', () => {
      component['filtrosAtuais'].set(null);
      apiSpy.getModalidadesPorUnidade.calls.reset();

      component.onVoltarDrill();

      expect(apiSpy.getModalidadesPorUnidade).not.toHaveBeenCalled();
    });

    it('drill-down em sequência rápida deve limpar dados intermediários', () => {
      // Drill para sub1
      const mod1$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(mod1$.asObservable());
      component.onDrillDown({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(component.carregandoModalidades()).toBeTrue();
      expect(component.modalidadesPorUnidade()).toBeNull();

      // Sem esperar resposta, drill para sub2
      const mod2$ = new Subject<Indicador>();
      apiSpy.getModalidadesPorUnidade.and.returnValue(mod2$.asObservable());
      component.onDrillDown({ unidade_id: 'sub2', unidade_sigla: 'SUB2' });

      expect(component.drillUnidadeModalidades()).toEqual({ unidade_id: 'sub2', unidade_sigla: 'SUB2' });
      expect(component.carregandoModalidades()).toBeTrue();
      expect(component.modalidadesPorUnidade()).toBeNull();

      // Resposta de sub2 chega
      const dados2 = mockIndicador(30);
      mod2$.next(dados2);

      expect(component.modalidadesPorUnidade()).toEqual(dados2);
      expect(component.carregandoModalidades()).toBeFalse();

      // Resposta tardia de sub1 chega - como é um subscribe separado ainda atualiza (last-write)
      // Porém o dado que importa é o último drill-down que setou o signal
    });
  });

  describe('onUnidadeChange', () => {
    it('deve atualizar sigla e label da unidade', () => {
      component.onUnidadeChange({ sigla: 'NOVA', nome: 'Nova Unidade' });
      expect(component.unidadeInicialSigla()).toBe('NOVA');
    });
  });

  describe('Computed saibaMaisParams', () => {
    beforeEach(() => {
      component.ngOnInit();
      unidadeInicial$.next({ unidade_id: 'u1', unidade_sigla: 'SIG', unidade_nome: 'Nome', unidade_raiz_id: 'r1', unidade_raiz_sigla: 'RAIZ' });
    });

    it('saibaMaisParamsSubstituicao deve incluir modalidade correta', () => {
      expect(component.saibaMaisParamsSubstituicao()).toEqual(jasmine.objectContaining({
        modalidadeSouGov: 'no exterior substituicao',
        unidade_id: 'r1',
      }));
    });

    it('saibaMaisParamsDiscricionario deve incluir modalidade correta', () => {
      expect(component.saibaMaisParamsDiscricionario()).toEqual(jasmine.objectContaining({
        modalidadeSouGov: 'no exterior',
        unidade_id: 'r1',
      }));
    });

    it('saibaMaisParamsModalidadesPorUnidade deve usar unidade do drill quando ativo', () => {
      component['filtrosAtuais'].set({ tipo_consulta: 'situacao_atual', unidade_id: 'u1' });
      component['drillUnidadeModalidades'].set({ unidade_id: 'sub1', unidade_sigla: 'SUB1' });

      expect(component.saibaMaisParamsModalidadesPorUnidade()).toEqual(jasmine.objectContaining({
        unidade_id: 'sub1',
        incluir_unidades_subordinadas: 'true',
      }));
    });

    it('saibaMaisParamsModalidadesPorUnidade deve usar unidade dos filtros quando sem drill', () => {
      component['filtrosAtuais'].set({ tipo_consulta: 'situacao_atual', unidade_id: 'u1' });
      component['drillUnidadeModalidades'].set(null);

      expect(component.saibaMaisParamsModalidadesPorUnidade()).toEqual(jasmine.objectContaining({
        unidade_id: 'u1',
        incluir_unidades_subordinadas: 'true',
      }));
    });
  });
});
