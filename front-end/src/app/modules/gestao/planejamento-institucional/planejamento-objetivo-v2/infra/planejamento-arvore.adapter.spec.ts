import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PlanejamentoArvoreAdapter, PLANEJAMENTO_ARVORE_CONFIG } from './planejamento-arvore.adapter';
import { PlanejamentoObjetivoEsforcoApiClient, type ObjetivoPainelResumoApi } from './planejamento-objetivo-esforco-api.client';
import { NavigateService } from 'src/app/services/navigate.service';
import type { ArvoreApiResponse, ArvoreNodeApi } from 'src/app/v2/components/arvore-institucional/domain/types';

describe('PlanejamentoArvoreAdapter', () => {
  let adapter: PlanejamentoArvoreAdapter;
  let apiSpy: jasmine.SpyObj<PlanejamentoObjetivoEsforcoApiClient>;
  let navigateSpy: jasmine.SpyObj<NavigateService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj('PlanejamentoObjetivoEsforcoApiClient', [
      'getArvoreVisualizacao',
      'getPainelResumo',
      'getEntregasDetalhamento'
    ]);
    navigateSpy = jasmine.createSpyObj('NavigateService', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        PlanejamentoArvoreAdapter,
        { provide: PlanejamentoObjetivoEsforcoApiClient, useValue: apiSpy },
        { provide: NavigateService, useValue: navigateSpy }
      ]
    });

    adapter = TestBed.inject(PlanejamentoArvoreAdapter);
  });

  // ─── Helpers ───────────────────────────────────────────────────────────────────

  function makeApiNode(overrides: Partial<ArvoreNodeApi> & { id: string }): ArvoreNodeApi {
    return {
      nome: overrides.id,
      container_nome: 'Planejamento X',
      tipo_nome: null,
      parent_id: null,
      secondary_parent_id: null,
      filhos_ids: [],
      filhos_secondary_ids: [],
      total_vinculos: 0,
      esforco_disponivel_horas: 0,
      esforco_proprio_horas: 0,
      esforco_total_horas: 0,
      planejado_percentual_disponivel: 0,
      ...overrides
    };
  }

  function makeResumoApi(): ObjetivoPainelResumoApi {
    return {
      objetivo_id: 'obj-1',
      nome: 'Objetivo teste',
      planejamento_nome: 'Planejamento ABC',
      tipo_objetivo_nome: 'Estratégico',
      eixo_tematico_nome: 'Inovação',
      item: {
        esforco: {
          disponivel_horas: 100,
          planejado_horas: 80,
          executado_horas: 60,
          planejado_percentual_disponivel: 80,
          executado_percentual_planejado: 75,
          mostrar_disponivel: true,
          mostrar_planejado: true,
          mostrar_executado: true
        },
        pessoas: {
          total_participantes: 5,
          participantes_somente_unidade_propria: 3,
          participantes_somente_outras_unidades: 1,
          participantes_em_ambas: 1
        },
        entregas: {
          total_entregas: 10,
          entregas_concluidas: 4,
          percentual_concluidas: 40
        }
      },
      consolidado: {
        esforco: {
          disponivel_horas: 500,
          planejado_horas: 400,
          executado_horas: 300,
          planejado_percentual_disponivel: 80,
          executado_percentual_planejado: 75,
          mostrar_disponivel: true,
          mostrar_planejado: true,
          mostrar_executado: true
        },
        pessoas: {
          total_participantes: 20,
          participantes_somente_unidade_propria: 12,
          participantes_somente_outras_unidades: 4,
          participantes_em_ambas: 4
        },
        entregas: {
          total_entregas: 50,
          entregas_concluidas: 20,
          percentual_concluidas: 40
        }
      },
      filtro_unidades: [
        { id: 'u-1', label: 'Unidade A' },
        { id: 'u-2', label: 'Unidade B' }
      ]
    };
  }

  // ─── carregarArvore ────────────────────────────────────────────────────────────

  describe('carregarArvore', () => {
    it('deve mapear resposta da API para ArvoreData', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'obj-1',
        nos: {
          'obj-1': makeApiNode({ id: 'obj-1', filhos_ids: ['obj-2'] }),
          'obj-2': makeApiNode({ id: 'obj-2', parent_id: 'obj-1' })
        },
        metadata: { planejamento_id: 'plan-1' }
      };
      apiSpy.getArvoreVisualizacao.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ id: 'obj-1' }).subscribe(data => {
        expect(data.focalId).toBe('obj-1');
        expect(Object.keys(data.nos)).toEqual(['obj-1', 'obj-2']);
        expect(data.metadata).toEqual({ planejamento_id: 'plan-1' });
        done();
      });
    });

    it('deve mapear campos snake_case da API para camelCase no domain', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'obj-1',
        nos: {
          'obj-1': makeApiNode({
            id: 'obj-1',
            container_nome: 'Plano Estratégico',
            tipo_nome: 'Tático',
            parent_id: 'pai-1',
            secondary_parent_id: 'sup-1',
            filhos_ids: ['f1', 'f2'],
            filhos_secondary_ids: ['fs1'],
            total_vinculos: 5,
            esforco_disponivel_horas: 100,
            esforco_proprio_horas: 40,
            esforco_total_horas: 80,
            planejado_percentual_disponivel: 75.5
          })
        },
        metadata: {}
      };
      apiSpy.getArvoreVisualizacao.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ id: 'obj-1' }).subscribe(data => {
        const node = data.nos['obj-1'];
        expect(node.containerNome).toBe('Plano Estratégico');
        expect(node.tipoNome).toBe('Tático');
        expect(node.parentId).toBe('pai-1');
        expect(node.secondaryParentId).toBe('sup-1');
        expect(node.filhosIds).toEqual(['f1', 'f2']);
        expect(node.filhosSecondaryIds).toEqual(['fs1']);
        expect(node.totalVinculos).toBe(5);
        expect(node.esforcoDisponivel).toBe(100);
        expect(node.esforcoProprioHoras).toBe(40);
        expect(node.esforcoTotalHoras).toBe(80);
        expect(node.planejadoPercentualDisponivel).toBe(75.5);
        done();
      });
    });

    it('deve usar defaults quando campos opcionais são undefined', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'obj-1',
        nos: {
          'obj-1': {
            id: 'obj-1',
            nome: 'Teste',
            container_nome: 'Plan',
            tipo_nome: null,
            parent_id: null,
            secondary_parent_id: null,
            filhos_ids: undefined as any,
            filhos_secondary_ids: undefined as any,
            total_vinculos: undefined as any,
            esforco_disponivel_horas: undefined as any,
            esforco_proprio_horas: undefined as any,
            esforco_total_horas: undefined as any,
            planejado_percentual_disponivel: undefined as any
          }
        },
        metadata: {}
      };
      apiSpy.getArvoreVisualizacao.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ id: 'obj-1' }).subscribe(data => {
        const node = data.nos['obj-1'];
        expect(node.filhosIds).toEqual([]);
        expect(node.filhosSecondaryIds).toEqual([]);
        expect(node.totalVinculos).toBe(0);
        expect(node.esforcoDisponivel).toBe(0);
        expect(node.esforcoProprioHoras).toBe(0);
        expect(node.esforcoTotalHoras).toBe(0);
        expect(node.planejadoPercentualDisponivel).toBe(0);
        done();
      });
    });

    it('deve converter tipo_nome vazio para null', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'obj-1',
        nos: {
          'obj-1': makeApiNode({ id: 'obj-1', tipo_nome: '' as any })
        },
        metadata: {}
      };
      apiSpy.getArvoreVisualizacao.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ id: 'obj-1' }).subscribe(data => {
        expect(data.nos['obj-1'].tipoNome).toBeNull();
        done();
      });
    });

    it('deve usar string vazia como id quando params não tem "id"', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: '',
        nos: {},
        metadata: {}
      };
      apiSpy.getArvoreVisualizacao.and.returnValue(of(apiResponse));

      adapter.carregarArvore({}).subscribe(() => {
        expect(apiSpy.getArvoreVisualizacao).toHaveBeenCalledWith('');
        done();
      });
    });
  });

  // ─── carregarResumo ────────────────────────────────────────────────────────────

  describe('carregarResumo', () => {
    it('deve mapear resposta do resumo para PainelResumoData', (done) => {
      const resumoApi = makeResumoApi();
      apiSpy.getPainelResumo.and.returnValue(of(resumoApi));

      adapter.carregarResumo('obj-1').subscribe(data => {
        expect(data.informacoesGerais['nome']).toBe('Objetivo teste');
        expect(data.informacoesGerais['planejamento_nome']).toBe('Planejamento ABC');
        expect(data.informacoesGerais['tipo_objetivo_nome']).toBe('Estratégico');
        expect(data.informacoesGerais['eixo_tematico_nome']).toBe('Inovação');
        expect(data.item).toEqual(resumoApi.item);
        expect(data.consolidado).toEqual(resumoApi.consolidado);
        expect(data.filtro_unidades.length).toBe(2);
        done();
      });
    });

    it('deve usar "—" como default quando tipo/eixo é vazio', (done) => {
      const resumoApi = makeResumoApi();
      resumoApi.tipo_objetivo_nome = '';
      resumoApi.eixo_tematico_nome = '';
      apiSpy.getPainelResumo.and.returnValue(of(resumoApi));

      adapter.carregarResumo('obj-1').subscribe(data => {
        expect(data.informacoesGerais['tipo_objetivo_nome']).toBe('—');
        expect(data.informacoesGerais['eixo_tematico_nome']).toBe('—');
        done();
      });
    });

    it('deve passar filtro unidade_id para o API client', (done) => {
      apiSpy.getPainelResumo.and.returnValue(of(makeResumoApi()));

      adapter.carregarResumo('obj-1', { unidade_id: 'u-123' }).subscribe(() => {
        expect(apiSpy.getPainelResumo).toHaveBeenCalledWith('obj-1', { unidade_id: 'u-123' });
        done();
      });
    });
  });

  // ─── carregarEntregasDetalhamento ──────────────────────────────────────────────

  describe('carregarEntregasDetalhamento', () => {
    it('deve retornar itens, filtro_entregas e filtro_unidades', (done) => {
      const detalhamento = {
        objetivo_id: 'obj-1',
        itens: [{ plano_entrega_entrega_id: 'e-1' } as any],
        filtro_entregas: [{ id: 'e-1', label: 'Entrega 1' }],
        filtro_unidades: [{ id: 'u-1', label: 'Unidade A' }]
      };
      apiSpy.getEntregasDetalhamento.and.returnValue(of(detalhamento));

      adapter.carregarEntregasDetalhamento('obj-1', {}).subscribe(data => {
        expect(data.itens.length).toBe(1);
        expect(data.filtro_entregas.length).toBe(1);
        expect(data.filtro_unidades.length).toBe(1);
        done();
      });
    });

    it('deve funcionar sem filtros', (done) => {
      const detalhamento = {
        objetivo_id: 'obj-1',
        itens: [],
        filtro_entregas: [],
        filtro_unidades: []
      };
      apiSpy.getEntregasDetalhamento.and.returnValue(of(detalhamento));

      adapter.carregarEntregasDetalhamento('obj-1').subscribe(data => {
        expect(data.itens).toEqual([]);
        expect(apiSpy.getEntregasDetalhamento).toHaveBeenCalledWith('obj-1', {});
        done();
      });
    });
  });

  // ─── navegarParaNo ─────────────────────────────────────────────────────────────

  describe('navegarParaNo', () => {
    it('deve navegar para a rota correta do planejamento', () => {
      adapter.navegarParaNo('obj-123');

      expect(navigateSpy.navigate).toHaveBeenCalledWith({
        route: ['gestao', 'planejamento', 'objetivo-arvore', 'obj-123']
      });
    });

    it('não deve navegar quando nodeId é vazio', () => {
      adapter.navegarParaNo('');

      expect(navigateSpy.navigate).not.toHaveBeenCalled();
    });
  });

  // ─── Configuração ──────────────────────────────────────────────────────────────

  describe('PLANEJAMENTO_ARVORE_CONFIG', () => {
    it('deve ter título correto', () => {
      expect(PLANEJAMENTO_ARVORE_CONFIG.titulo).toBe('Árvore de objetivos');
    });

    it('deve ter rotaNavegacao correta', () => {
      expect(PLANEJAMENTO_ARVORE_CONFIG.rotaNavegacao).toEqual(['gestao', 'planejamento', 'objetivo-arvore']);
    });

    it('deve ter breadcrumb para Planejamentos Institucionais', () => {
      expect(PLANEJAMENTO_ARVORE_CONFIG.breadcrumbParents[0].label).toBe('Planejamentos Institucionais');
    });

    it('deve ter campos de informações gerais esperados', () => {
      const campos = PLANEJAMENTO_ARVORE_CONFIG.camposInfoGeral.map(c => c.campo);
      expect(campos).toContain('nome');
      expect(campos).toContain('planejamento_nome');
      expect(campos).toContain('tipo_objetivo_nome');
      expect(campos).toContain('eixo_tematico_nome');
    });

    it('deve ter tooltips definidos', () => {
      expect(PLANEJAMENTO_ARVORE_CONFIG.tooltips).not.toBeNull();
    });
  });
});
