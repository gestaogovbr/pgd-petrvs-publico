import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CadeiaValorArvoreAdapter, CADEIA_VALOR_ARVORE_CONFIG } from './cadeia-valor-arvore.adapter';
import { CadeiaValorArvoreApiClient, type CadeiaValorResumoApi } from './cadeia-valor-arvore-api.client';
import { NavigateService } from 'src/app/services/navigate.service';
import type { ArvoreApiResponse, ArvoreNodeApi } from 'src/app/v2/components/arvore-institucional/domain/types';

describe('CadeiaValorArvoreAdapter', () => {
  let adapter: CadeiaValorArvoreAdapter;
  let apiSpy: jasmine.SpyObj<CadeiaValorArvoreApiClient>;
  let navigateSpy: jasmine.SpyObj<NavigateService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj('CadeiaValorArvoreApiClient', [
      'getArvore',
      'getResumo',
      'getEntregasDetalhamento'
    ]);
    navigateSpy = jasmine.createSpyObj('NavigateService', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        CadeiaValorArvoreAdapter,
        { provide: CadeiaValorArvoreApiClient, useValue: apiSpy },
        { provide: NavigateService, useValue: navigateSpy }
      ]
    });

    adapter = TestBed.inject(CadeiaValorArvoreAdapter);
  });

  // ─── Helpers ───────────────────────────────────────────────────────────────────

  function makeApiNode(overrides: Partial<ArvoreNodeApi> & { id: string }): ArvoreNodeApi {
    return {
      nome: overrides.id,
      container_nome: 'Cadeia X',
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

  function makeResumoApi(): CadeiaValorResumoApi {
    return {
      processo_id: 'proc-1',
      processo_nome: 'Processo de atendimento',
      tipo_elemento_nome: 'Macroprocesso',
      nivel: 2,
      item: {
        esforco: {
          disponivel_horas: 200,
          planejado_horas: 150,
          executado_horas: 100,
          planejado_percentual_disponivel: 75,
          executado_percentual_planejado: 66.7,
          mostrar_disponivel: true,
          mostrar_planejado: true,
          mostrar_executado: true
        },
        pessoas: {
          total_participantes: 8,
          participantes_somente_unidade_propria: 5,
          participantes_somente_outras_unidades: 2,
          participantes_em_ambas: 1
        },
        entregas: {
          total_entregas: 15,
          entregas_concluidas: 7,
          percentual_concluidas: 46.7
        }
      },
      consolidado: {
        esforco: {
          disponivel_horas: 800,
          planejado_horas: 600,
          executado_horas: 450,
          planejado_percentual_disponivel: 75,
          executado_percentual_planejado: 75,
          mostrar_disponivel: true,
          mostrar_planejado: true,
          mostrar_executado: true
        },
        pessoas: {
          total_participantes: 30,
          participantes_somente_unidade_propria: 18,
          participantes_somente_outras_unidades: 7,
          participantes_em_ambas: 5
        },
        entregas: {
          total_entregas: 60,
          entregas_concluidas: 30,
          percentual_concluidas: 50
        }
      },
      filtro_unidades: [
        { id: 'u-1', label: 'Unidade A' }
      ]
    };
  }

  // ─── carregarArvore ────────────────────────────────────────────────────────────

  describe('carregarArvore', () => {
    it('deve chamar API com cadeiaValorId e processoId', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: { 'proc-1': makeApiNode({ id: 'proc-1' }) },
        subtitulo: 'Cadeia Principal',
        metadata: { cross_cadeia_map: {} }
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ cadeiaValorId: 'cv-1', processoId: 'proc-1' }).subscribe(data => {
        expect(apiSpy.getArvore).toHaveBeenCalledWith('cv-1', 'proc-1');
        expect(data.focalId).toBe('proc-1');
        expect(data.subtitulo).toBe('Cadeia Principal');
        expect(data.metadata).toEqual({ cross_cadeia_map: {} });
        done();
      });
    });

    it('deve mapear campos snake_case da API para camelCase no domain', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: {
          'proc-1': makeApiNode({
            id: 'proc-1',
            container_nome: 'Cadeia ABC',
            tipo_nome: 'Macroprocesso',
            parent_id: 'proc-pai',
            filhos_ids: ['proc-filho'],
            total_vinculos: 3,
            esforco_disponivel_horas: 50,
            esforco_proprio_horas: 20,
            esforco_total_horas: 40,
            planejado_percentual_disponivel: 80
          })
        },
        subtitulo: null,
        metadata: {}
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ cadeiaValorId: 'cv-1', processoId: 'proc-1' }).subscribe(data => {
        const node = data.nos['proc-1'];
        expect(node.containerNome).toBe('Cadeia ABC');
        expect(node.tipoNome).toBe('Macroprocesso');
        expect(node.parentId).toBe('proc-pai');
        expect(node.filhosIds).toEqual(['proc-filho']);
        expect(node.totalVinculos).toBe(3);
        expect(node.esforcoDisponivel).toBe(50);
        expect(node.esforcoProprioHoras).toBe(20);
        expect(node.esforcoTotalHoras).toBe(40);
        expect(node.planejadoPercentualDisponivel).toBe(80);
        done();
      });
    });

    it('deve usar defaults para campos undefined da API', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: {
          'proc-1': {
            id: 'proc-1',
            nome: 'Processo',
            container_nome: 'Cadeia',
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
        subtitulo: null,
        metadata: {}
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ cadeiaValorId: 'cv-1', processoId: 'proc-1' }).subscribe(data => {
        const node = data.nos['proc-1'];
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

    it('deve armazenar cadeiaValorId para uso posterior', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: { 'proc-1': makeApiNode({ id: 'proc-1' }) },
        subtitulo: null,
        metadata: {}
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ cadeiaValorId: 'cv-99', processoId: 'proc-1' }).subscribe(() => {
        // Agora ao navegar deve usar o cadeiaValorId armazenado
        adapter.navegarParaNo('proc-2');
        expect(navigateSpy.navigate).toHaveBeenCalledWith({
          route: ['gestao', 'cadeia-valor', 'arvore', 'cv-99', 'proc-2']
        });
        done();
      });
    });
  });

  // ─── carregarResumo ────────────────────────────────────────────────────────────

  describe('carregarResumo', () => {
    beforeEach((done) => {
      // Precisamos carregar a árvore primeiro para setar cadeiaValorId
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: { 'proc-1': makeApiNode({ id: 'proc-1' }) },
        subtitulo: null,
        metadata: {}
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));
      adapter.carregarArvore({ cadeiaValorId: 'cv-1', processoId: 'proc-1' }).subscribe(() => done());
    });

    it('deve mapear resposta do resumo para PainelResumoData', (done) => {
      const resumoApi = makeResumoApi();
      apiSpy.getResumo.and.returnValue(of(resumoApi));

      adapter.carregarResumo('proc-1').subscribe(data => {
        expect(data.informacoesGerais['processo_nome']).toBe('Processo de atendimento');
        expect(data.informacoesGerais['tipo_elemento_nome']).toBe('Macroprocesso');
        expect(data.informacoesGerais['nivel']).toBe('2');
        expect(data.item).toEqual(resumoApi.item);
        expect(data.consolidado).toEqual(resumoApi.consolidado);
        expect(data.filtro_unidades.length).toBe(1);
        done();
      });
    });

    it('deve chamar API com cadeiaValorId armazenado e processoId', (done) => {
      apiSpy.getResumo.and.returnValue(of(makeResumoApi()));

      adapter.carregarResumo('proc-1', { unidade_id: 'u-5' }).subscribe(() => {
        expect(apiSpy.getResumo).toHaveBeenCalledWith('cv-1', 'proc-1', { unidade_id: 'u-5' });
        done();
      });
    });

    it('deve converter nível numérico para string nas informações gerais', (done) => {
      const resumo = makeResumoApi();
      resumo.nivel = 3;
      apiSpy.getResumo.and.returnValue(of(resumo));

      adapter.carregarResumo('proc-1').subscribe(data => {
        expect(data.informacoesGerais['nivel']).toBe('3');
        done();
      });
    });
  });

  // ─── carregarEntregasDetalhamento ──────────────────────────────────────────────

  describe('carregarEntregasDetalhamento', () => {
    beforeEach((done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: { 'proc-1': makeApiNode({ id: 'proc-1' }) },
        subtitulo: null,
        metadata: {}
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));
      adapter.carregarArvore({ cadeiaValorId: 'cv-1', processoId: 'proc-1' }).subscribe(() => done());
    });

    it('deve passar filtros como params para o API client', (done) => {
      const detalhamento = {
        processo_id: 'proc-1',
        itens: [],
        filtro_entregas: [],
        filtro_unidades: []
      };
      apiSpy.getEntregasDetalhamento.and.returnValue(of(detalhamento));

      adapter.carregarEntregasDetalhamento('proc-1', {
        plano_entrega_entrega_id: 'e-1',
        unidade_id: 'u-1',
        data_inicio: '2026-01-01',
        data_fim: '2026-12-31',
        abrangencia: 'item_e_subordinados'
      }).subscribe(() => {
        expect(apiSpy.getEntregasDetalhamento).toHaveBeenCalledWith('cv-1', 'proc-1', {
          plano_entrega_entrega_id: 'e-1',
          unidade_id: 'u-1',
          data_inicio: '2026-01-01',
          data_fim: '2026-12-31',
          abrangencia: 'item_e_subordinados'
        });
        done();
      });
    });

    it('deve não incluir filtros vazios nos params', (done) => {
      const detalhamento = {
        processo_id: 'proc-1',
        itens: [],
        filtro_entregas: [],
        filtro_unidades: []
      };
      apiSpy.getEntregasDetalhamento.and.returnValue(of(detalhamento));

      adapter.carregarEntregasDetalhamento('proc-1', {}).subscribe(() => {
        expect(apiSpy.getEntregasDetalhamento).toHaveBeenCalledWith('cv-1', 'proc-1', {});
        done();
      });
    });

    it('deve retornar itens, filtro_entregas e filtro_unidades', (done) => {
      const detalhamento = {
        processo_id: 'proc-1',
        itens: [{ plano_entrega_entrega_id: 'e-1' } as any],
        filtro_entregas: [{ id: 'e-1', label: 'Entrega X' }],
        filtro_unidades: [{ id: 'u-1', label: 'Unidade Y' }]
      };
      apiSpy.getEntregasDetalhamento.and.returnValue(of(detalhamento));

      adapter.carregarEntregasDetalhamento('proc-1').subscribe(data => {
        expect(data.itens.length).toBe(1);
        expect(data.filtro_entregas[0].label).toBe('Entrega X');
        expect(data.filtro_unidades[0].label).toBe('Unidade Y');
        done();
      });
    });
  });

  // ─── navegarParaNo ─────────────────────────────────────────────────────────────

  describe('navegarParaNo', () => {
    it('não deve navegar quando nodeId é vazio', () => {
      adapter.navegarParaNo('');
      expect(navigateSpy.navigate).not.toHaveBeenCalled();
    });

    it('não deve navegar quando cadeiaValorId não foi setado', () => {
      adapter.navegarParaNo('proc-1');
      expect(navigateSpy.navigate).not.toHaveBeenCalled();
    });

    it('deve navegar com rota correta quando cadeiaValorId está setado', (done) => {
      const apiResponse: ArvoreApiResponse = {
        focal_id: 'proc-1',
        nos: { 'proc-1': makeApiNode({ id: 'proc-1' }) },
        subtitulo: null,
        metadata: {}
      };
      apiSpy.getArvore.and.returnValue(of(apiResponse));

      adapter.carregarArvore({ cadeiaValorId: 'cv-42', processoId: 'proc-1' }).subscribe(() => {
        adapter.navegarParaNo('proc-7');
        expect(navigateSpy.navigate).toHaveBeenCalledWith({
          route: ['gestao', 'cadeia-valor', 'arvore', 'cv-42', 'proc-7']
        });
        done();
      });
    });
  });

  // ─── Configuração ──────────────────────────────────────────────────────────────

  describe('CADEIA_VALOR_ARVORE_CONFIG', () => {
    it('deve ter título correto', () => {
      expect(CADEIA_VALOR_ARVORE_CONFIG.titulo).toBe('Árvore da Cadeia de Valor');
    });

    it('deve ter rotaNavegacao correta', () => {
      expect(CADEIA_VALOR_ARVORE_CONFIG.rotaNavegacao).toEqual(['gestao', 'cadeia-valor', 'arvore']);
    });

    it('deve ter breadcrumb para Cadeias de Valor', () => {
      expect(CADEIA_VALOR_ARVORE_CONFIG.breadcrumbParents[0].label).toBe('Cadeias de Valor');
    });

    it('deve ter tooltips null (cadeia de valor não usa tooltips)', () => {
      expect(CADEIA_VALOR_ARVORE_CONFIG.tooltips).toBeNull();
    });

    it('não deve mais ter subtituloMetadataKey (subtítulo vem tipado da resposta)', () => {
      expect((CADEIA_VALOR_ARVORE_CONFIG as { subtituloMetadataKey?: string }).subtituloMetadataKey).toBeUndefined();
    });

    it('deve ter campos de informações gerais esperados', () => {
      const campos = CADEIA_VALOR_ARVORE_CONFIG.camposInfoGeral.map(c => c.campo);
      expect(campos).toContain('processo_nome');
      expect(campos).toContain('tipo_elemento_nome');
      expect(campos).toContain('nivel');
    });

    it('deve ter badgeFocal como "central"', () => {
      expect(CADEIA_VALOR_ARVORE_CONFIG.badgeFocal).toBe('central');
    });
  });
});
