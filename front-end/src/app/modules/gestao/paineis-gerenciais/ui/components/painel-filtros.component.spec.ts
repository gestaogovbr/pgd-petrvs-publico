import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { of, Subject } from 'rxjs';
import { PainelFiltrosComponent, UnidadeOption } from './painel-filtros.component';
import { PainelApiClient, FiltrosPainel } from '../../infra/painel-api.client';
import { UnidadeSelectEvent } from 'src/app/v2/components/unidade-select/unidade-select.component';

@Component({ selector: 'unidade-select', standalone: true, template: '' })
class MockUnidadeSelectComponent {}

describe('PainelFiltrosComponent', () => {
  let component: PainelFiltrosComponent;
  let fixture: ComponentFixture<PainelFiltrosComponent>;
  let apiSpy: jasmine.SpyObj<PainelApiClient>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('PainelApiClient', ['getPeriodosDisponiveisPorUnidade']);
    apiSpy.getPeriodosDisponiveisPorUnidade.and.returnValue(of(['2024-01', '2024-02', '2024-03']));

    await TestBed.configureTestingModule({
      imports: [PainelFiltrosComponent],
      providers: [
        { provide: PainelApiClient, useValue: apiSpy },
      ],
    })
      .overrideComponent(PainelFiltrosComponent, {
        remove: { imports: [/* UnidadeSelectComponent */ ] },
        add: { imports: [MockUnidadeSelectComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PainelFiltrosComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Troca do tipo de consulta', () => {
    it('deve iniciar com tipo_consulta = situacao_atual', () => {
      expect(component.tipoConsulta()).toBe('situacao_atual');
    });

    it('deve alterar para historico ao chamar onTipoConsultaChange', () => {
      component.onTipoConsultaChange({ target: { value: 'historico' } });
      expect(component.tipoConsulta()).toBe('historico');
    });

    it('deve limpar periodos e periodoSelecionado ao trocar tipo de consulta', () => {
      component.onTipoConsultaChange({ target: { value: 'historico' } });
      expect(component.periodos()).toEqual([]);
      expect(component.periodoSelecionado()).toBe('');
    });

    it('não deve alterar se o valor for o mesmo', () => {
      spyOn(component.filtrosChange, 'emit');
      component.onTipoConsultaChange({ target: { value: 'situacao_atual' } });
      expect(component.filtrosChange.emit).not.toHaveBeenCalled();
    });

    it('não deve alterar para valores inválidos', () => {
      component.onTipoConsultaChange({ target: { value: 'invalido' } });
      expect(component.tipoConsulta()).toBe('situacao_atual');
    });

    it('deve limpar a unidade selecionada quando modoData=referencia e troca tipo consulta', () => {
      component.modoData = 'referencia';
      const unidade: UnidadeOption = { id: 'u1', sigla: 'SIG', nome: 'Nome' };
      component['unidadeSelecionada'].set(unidade);

      component.onTipoConsultaChange({ target: { value: 'historico' } });
      expect(component['unidadeSelecionada']()).toBeNull();
    });

    it('NÃO deve limpar a unidade selecionada quando modoData=range e troca tipo consulta', () => {
      component.modoData = 'range';
      const unidade: UnidadeOption = { id: 'u1', sigla: 'SIG', nome: 'Nome' };
      component['unidadeSelecionada'].set(unidade);

      component.onTipoConsultaChange({ target: { value: 'historico' } });
      expect(component['unidadeSelecionada']()).toEqual(unidade);
    });

    it('deve aceitar event.detail como fonte do valor (web components)', () => {
      component.onTipoConsultaChange({ detail: 'historico' });
      expect(component.tipoConsulta()).toBe('historico');
    });

    it('deve aceitar valor direto como string', () => {
      component.onTipoConsultaChange('historico');
      expect(component.tipoConsulta()).toBe('historico');
    });
  });

  describe('Sincronização da unidade selecionada', () => {
    it('deve atualizar unidade selecionada via ngOnChanges quando unidadeInicialId muda', () => {
      component.unidadeInicialId = 'u1';
      component.unidadeInicialSigla = 'SIG';
      component.unidadeInicialNome = 'Nome Unidade';
      component.ngOnChanges({
        unidadeInicialId: { currentValue: 'u1', previousValue: '', firstChange: true, isFirstChange: () => true },
      });

      expect(component['unidadeSelecionada']()).toEqual({ id: 'u1', sigla: 'SIG', nome: 'Nome Unidade' });
    });

    it('deve emitir unidadeChange ao selecionar uma unidade', () => {
      spyOn(component.unidadeChange, 'emit');
      const event: UnidadeSelectEvent = { id: 'u2', sigla: 'NOVA', nome: 'Nova Unidade' };

      component.selecionarUnidade(event);

      expect(component.unidadeChange.emit).toHaveBeenCalledWith({ sigla: 'NOVA', nome: 'Nova Unidade' });
    });

    it('deve atualizar unidadeSelecionada ao selecionar uma nova unidade', () => {
      const event: UnidadeSelectEvent = { id: 'u3', sigla: 'X', nome: 'Y' };
      component.selecionarUnidade(event);
      expect(component['unidadeSelecionada']()).toEqual({ id: 'u3', sigla: 'X', nome: 'Y' });
    });

    it('deve limpar periodoSelecionado ao selecionar nova unidade', () => {
      component['periodoSelecionado'].set('2024-01');
      const event: UnidadeSelectEvent = { id: 'u4', sigla: 'Z', nome: 'W' };
      component.selecionarUnidade(event);
      expect(component.periodoSelecionado()).toBe('');
    });
  });

  describe('Emissão de filtros', () => {
    it('não deve emitir filtros se nenhuma unidade estiver selecionada', () => {
      spyOn(component.filtrosChange, 'emit');
      component.onTipoConsultaChange({ target: { value: 'historico' } });
      expect(component.filtrosChange.emit).not.toHaveBeenCalled();
    });

    it('deve emitir filtros de situacao_atual ao selecionar unidade (modoData=range)', () => {
      component.modoData = 'range';
      spyOn(component.filtrosChange, 'emit');

      component.selecionarUnidade({ id: 'u1', sigla: 'S', nome: 'N' });

      expect(component.filtrosChange.emit).toHaveBeenCalledWith({
        tipo_consulta: 'situacao_atual',
        unidade_id: 'u1',
      });
    });

    it('não deve emitir filtros de historico sem datas preenchidas (modoData=range)', () => {
      component.modoData = 'range';
      component['unidadeSelecionada'].set({ id: 'u1', sigla: 'S', nome: 'N' });
      spyOn(component.filtrosChange, 'emit');

      component.onTipoConsultaChange({ target: { value: 'historico' } });
      expect(component.filtrosChange.emit).not.toHaveBeenCalled();
    });

    it('deve emitir filtros de historico com datas preenchidas (modoData=range)', () => {
      component.modoData = 'range';
      component['unidadeSelecionada'].set({ id: 'u1', sigla: 'S', nome: 'N' });
      component['tipoConsulta'].set('historico');
      component['dataInicio'].set('2024-01-01');
      spyOn(component.filtrosChange, 'emit');

      component.onDataFimChange({ target: { value: '2024-06-30' } } as any);

      expect(component.filtrosChange.emit).toHaveBeenCalledWith({
        tipo_consulta: 'historico',
        unidade_id: 'u1',
        data_inicio: '2024-01-01',
        data_fim: '2024-06-30',
      });
    });

    it('deve emitir filtros de situacao_atual em modoData=referencia', () => {
      component.modoData = 'referencia';
      spyOn(component.filtrosChange, 'emit');

      component.selecionarUnidade({ id: 'u1', sigla: 'S', nome: 'N' });

      expect(component.filtrosChange.emit).toHaveBeenCalledWith({
        tipo_consulta: 'situacao_atual',
        unidade_id: 'u1',
      });
    });

    it('não deve emitir filtros de historico referencia sem periodo selecionado', () => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('historico');
      component['unidadeSelecionada'].set({ id: 'u1', sigla: 'S', nome: 'N' });
      spyOn(component.filtrosChange, 'emit');

      // force emit sem periodo
      component['emitirFiltros']();
      expect(component.filtrosChange.emit).not.toHaveBeenCalled();
    });

    it('deve emitir filtros de historico referencia com periodo selecionado', () => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('historico');
      component['unidadeSelecionada'].set({ id: 'u1', sigla: 'S', nome: 'N' });
      spyOn(component.filtrosChange, 'emit');

      component.onPeriodoChange({ target: { value: '2024-03' } });

      expect(component.filtrosChange.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        tipo_consulta: 'historico',
        unidade_id: 'u1',
        data_inicio: '2024-01-01',
        data_fim: '2024-03-31',
      }));
    });
  });

  describe('Carregamento de períodos', () => {
    it('deve carregar periodos ao selecionar unidade em modo referencia + historico', fakeAsync(() => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('historico');

      component.selecionarUnidade({ id: 'u1', sigla: 'S', nome: 'N' });
      tick();

      expect(apiSpy.getPeriodosDisponiveisPorUnidade).toHaveBeenCalledWith('u1');
      expect(component.periodos()).toEqual(['2024-01', '2024-02', '2024-03']);
    }));

    it('NÃO deve carregar periodos em modo range', fakeAsync(() => {
      component.modoData = 'range';
      component['tipoConsulta'].set('historico');

      component.selecionarUnidade({ id: 'u1', sigla: 'S', nome: 'N' });
      tick();

      expect(apiSpy.getPeriodosDisponiveisPorUnidade).not.toHaveBeenCalled();
    }));

    it('NÃO deve carregar periodos em situacao_atual', fakeAsync(() => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('situacao_atual');

      component.selecionarUnidade({ id: 'u1', sigla: 'S', nome: 'N' });
      tick();

      expect(apiSpy.getPeriodosDisponiveisPorUnidade).not.toHaveBeenCalled();
    }));
  });

  describe('Computed activeSearchFn', () => {
    it('deve retornar unidadeSearchFn em modo range', () => {
      component.modoData = 'range';
      const fn = jasmine.createSpy();
      component.unidadeSearchFn = fn;
      expect(component.activeSearchFn()).toBe(fn);
    });

    it('deve retornar unidadeSearchFn em modo referencia + historico', () => {
      component.modoData = 'referencia';
      const fn = jasmine.createSpy();
      component.unidadeSearchFn = fn;
      component['tipoConsulta'].set('historico');
      expect(component.activeSearchFn()).toBe(fn);
    });

    it('deve retornar undefined em modo referencia + situacao_atual', () => {
      component.modoData = 'referencia';
      component.unidadeSearchFn = jasmine.createSpy();
      component['tipoConsulta'].set('situacao_atual');
      expect(component.activeSearchFn()).toBeUndefined();
    });
  });

  describe('Computed mostrarPeriodo', () => {
    it('deve ser true em referencia + historico + unidade selecionada', () => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('historico');
      component['unidadeSelecionada'].set({ id: '1', sigla: 'X', nome: 'Y' });
      expect(component.mostrarPeriodo()).toBeTrue();
    });

    it('deve ser false se modoData não for referencia', () => {
      component.modoData = 'range';
      component['tipoConsulta'].set('historico');
      component['unidadeSelecionada'].set({ id: '1', sigla: 'X', nome: 'Y' });
      expect(component.mostrarPeriodo()).toBeFalse();
    });

    it('deve ser false se tipo consulta não for historico', () => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('situacao_atual');
      component['unidadeSelecionada'].set({ id: '1', sigla: 'X', nome: 'Y' });
      expect(component.mostrarPeriodo()).toBeFalse();
    });

    it('deve ser false se nenhuma unidade selecionada', () => {
      component.modoData = 'referencia';
      component['tipoConsulta'].set('historico');
      component['unidadeSelecionada'].set(null);
      expect(component.mostrarPeriodo()).toBeFalse();
    });
  });
});
