import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { ArvoreInstitucionalPage } from './arvore-institucional.page';
import { ArvoreLayoutService, DEFAULT_LEVELS } from '../infra/arvore-layout.service';
import { SvgPanZoomService } from 'src/app/v2/services/svg-pan-zoom.service';
import { ARVORE_CONFIG, ARVORE_DATA_PROVIDER } from '../tokens';
import type { ArvoreData, ArvoreDataProvider, ArvoreInstitucionalConfig, ArvoreNodeData } from '../domain/types';

describe('ArvoreInstitucionalPage', () => {
  let component: ArvoreInstitucionalPage;
  let providerSpy: jasmine.SpyObj<ArvoreDataProvider>;

  const mockConfig: ArvoreInstitucionalConfig = {
    titulo: 'Teste',
    legendaPrimary: 'primary',
    legendaSecondary: 'secondary',
    breadcrumbParents: [],
    rotaNavegacao: ['test'],
    camposCard: [{ campo: 'nome' }],
    camposInfoGeral: [{ label: 'Nome', campo: 'nome' }],
    tooltips: null,
    badgeFocal: 'focal',
    labelCentralizar: 'Centralizar',
    labelNoOrigem: 'Origem'
  };

  function makeNode(overrides: Partial<ArvoreNodeData> & { id: string }): ArvoreNodeData {
    return {
      nome: overrides.id,
      containerNome: 'Container',
      tipoNome: null,
      parentId: null,
      secondaryParentId: null,
      filhosIds: [],
      filhosSecondaryIds: [],
      totalVinculos: 0,
      esforcoDisponivel: 0,
      esforcoProprioHoras: 0,
      esforcoTotalHoras: 0,
      planejadoPercentualDisponivel: 0,
      ...overrides
    };
  }

  beforeEach(() => {
    providerSpy = jasmine.createSpyObj('ArvoreDataProvider', [
      'carregarArvore',
      'carregarResumo',
      'carregarEntregasDetalhamento',
      'navegarParaNo'
    ]);
    // Retornar EMPTY por default para evitar subscription no constructor
    providerSpy.carregarArvore.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      providers: [
        ArvoreInstitucionalPage,
        ArvoreLayoutService,
        SvgPanZoomService,
        { provide: ARVORE_DATA_PROVIDER, useValue: providerSpy },
        { provide: ARVORE_CONFIG, useValue: mockConfig },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: EMPTY }
        }
      ]
    });

    component = TestBed.inject(ArvoreInstitucionalPage);
  });

  // ─── Estado inicial ────────────────────────────────────────────────────────────

  describe('estado inicial', () => {
    it('deve iniciar com loading true', () => {
      expect(component.loading()).toBeTrue();
    });

    it('deve iniciar com dados null', () => {
      expect(component.dados()).toBeNull();
    });

    it('deve iniciar com selectedNodeId null', () => {
      expect(component.selectedNodeId()).toBeNull();
    });

    it('deve iniciar com levelsAbove e levelsBelow no padrão', () => {
      expect(component.levelsAbove()).toBe(DEFAULT_LEVELS);
      expect(component.levelsBelow()).toBe(DEFAULT_LEVELS);
    });
  });

  // ─── consultadoId ──────────────────────────────────────────────────────────────

  describe('consultadoId', () => {
    it('deve retornar null quando dados é null', () => {
      expect(component.consultadoId()).toBeNull();
    });

    it('deve retornar focalId quando dados está carregado', async () => {
      const data: ArvoreData = {
        focalId: 'obj-1',
        nos: { 'obj-1': makeNode({ id: 'obj-1' }) }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'obj-1' });

      expect(component.consultadoId()).toBe('obj-1');
    });
  });

  // ─── subtitulo ─────────────────────────────────────────────────────────────────

  describe('subtitulo', () => {
    it('deve retornar null quando dados é null', () => {
      expect(component.subtitulo()).toBeNull();
    });

    it('deve retornar o subtitulo dos dados carregados', async () => {
      const data: ArvoreData = {
        focalId: 'obj-1',
        nos: { 'obj-1': makeNode({ id: 'obj-1' }) },
        subtitulo: 'Minha Cadeia'
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'obj-1' });

      expect(component.subtitulo()).toBe('Minha Cadeia');
    });

    it('deve retornar null quando subtitulo dos dados é null', async () => {
      const data: ArvoreData = {
        focalId: 'obj-1',
        nos: { 'obj-1': makeNode({ id: 'obj-1' }) },
        subtitulo: null
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'obj-1' });

      expect(component.subtitulo()).toBeNull();
    });
  });

  // ─── canExpandUp / canExpandDown ───────────────────────────────────────────────

  describe('canExpandUp', () => {
    it('deve retornar false quando dados é null', () => {
      expect(component.canExpandUp()).toBeFalse();
    });

    it('deve retornar false quando não há mais ancestrais além dos exibidos', async () => {
      const data: ArvoreData = {
        focalId: 'C',
        nos: {
          'C': makeNode({ id: 'C', parentId: 'B' }),
          'B': makeNode({ id: 'B', parentId: 'A' }),
          'A': makeNode({ id: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'C' });

      // levelsAbove default é 2, cadeia tem exatamente 2 ancestrais
      expect(component.canExpandUp()).toBeFalse();
    });

    it('deve retornar true quando há mais ancestrais do que os exibidos', async () => {
      const data: ArvoreData = {
        focalId: 'D',
        nos: {
          'D': makeNode({ id: 'D', parentId: 'C' }),
          'C': makeNode({ id: 'C', parentId: 'B' }),
          'B': makeNode({ id: 'B', parentId: 'A' }),
          'A': makeNode({ id: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'D' });

      // levelsAbove default é 2, mas cadeia tem 3 ancestrais
      expect(component.canExpandUp()).toBeTrue();
    });
  });

  describe('canExpandDown', () => {
    it('deve retornar false quando dados é null', () => {
      expect(component.canExpandDown()).toBeFalse();
    });

    it('deve retornar false quando não há mais descendentes', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'] }),
          'B': makeNode({ id: 'B', parentId: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'A' });

      // maxDepth=1, levelsBelow default=2
      expect(component.canExpandDown()).toBeFalse();
    });

    it('deve retornar true quando há mais descendentes do que os exibidos', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'] }),
          'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['C'] }),
          'C': makeNode({ id: 'C', parentId: 'B', filhosIds: ['D'] }),
          'D': makeNode({ id: 'D', parentId: 'C' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'A' });

      // maxDepth=3, levelsBelow default=2
      expect(component.canExpandDown()).toBeTrue();
    });
  });

  // ─── expandUp / expandDown ─────────────────────────────────────────────────────

  describe('expandUp', () => {
    it('não deve alterar levels quando canExpandUp é false', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: { 'A': makeNode({ id: 'A' }) }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'A' });

      const levelsBefore = component.levelsAbove();
      component.expandUp();

      expect(component.levelsAbove()).toBe(levelsBefore);
    });

    it('deve incrementar levelsAbove e decrementar levelsBelow', async () => {
      const data: ArvoreData = {
        focalId: 'D',
        nos: {
          'D': makeNode({ id: 'D', parentId: 'C' }),
          'C': makeNode({ id: 'C', parentId: 'B' }),
          'B': makeNode({ id: 'B', parentId: 'A' }),
          'A': makeNode({ id: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'D' });

      const aboveBefore = component.levelsAbove();
      const belowBefore = component.levelsBelow();

      component.expandUp();

      expect(component.levelsAbove()).toBe(aboveBefore + 1);
      expect(component.levelsBelow()).toBe(belowBefore - 1);
    });

    it('não deve decrementar levelsBelow abaixo de 0', async () => {
      const data: ArvoreData = {
        focalId: 'D',
        nos: {
          'D': makeNode({ id: 'D', parentId: 'C' }),
          'C': makeNode({ id: 'C', parentId: 'B' }),
          'B': makeNode({ id: 'B', parentId: 'A' }),
          'A': makeNode({ id: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'D' });

      // Forçar levelsBelow para 0
      component.levelsBelow.set(0);
      component.expandUp();

      expect(component.levelsBelow()).toBe(0);
    });
  });

  describe('expandDown', () => {
    it('não deve alterar levels quando canExpandDown é false', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: { 'A': makeNode({ id: 'A' }) }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'A' });

      const levelsBefore = component.levelsBelow();
      component.expandDown();

      expect(component.levelsBelow()).toBe(levelsBefore);
    });

    it('deve incrementar levelsBelow e decrementar levelsAbove', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'] }),
          'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['C'] }),
          'C': makeNode({ id: 'C', parentId: 'B', filhosIds: ['D'] }),
          'D': makeNode({ id: 'D', parentId: 'C' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'A' });

      const aboveBefore = component.levelsAbove();
      const belowBefore = component.levelsBelow();

      component.expandDown();

      expect(component.levelsBelow()).toBe(belowBefore + 1);
      expect(component.levelsAbove()).toBe(aboveBefore - 1);
    });

    it('não deve decrementar levelsAbove abaixo de 0', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'] }),
          'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['C'] }),
          'C': makeNode({ id: 'C', parentId: 'B', filhosIds: ['D'] }),
          'D': makeNode({ id: 'D', parentId: 'C' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));
      await component.carregar({ id: 'A' });

      component.levelsAbove.set(0);
      component.expandDown();

      expect(component.levelsAbove()).toBe(0);
    });
  });

  // ─── carregar ──────────────────────────────────────────────────────────────────

  describe('carregar', () => {
    it('deve setar dados e selectedNodeId ao carregar com sucesso', async () => {
      const data: ArvoreData = {
        focalId: 'obj-1',
        nos: { 'obj-1': makeNode({ id: 'obj-1' }) }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'obj-1' });

      expect(component.dados()).toEqual(data);
      expect(component.selectedNodeId()).toBe('obj-1');
      expect(component.loading()).toBeFalse();
      expect(component.loadError()).toBeNull();
    });

    it('deve setar loadError quando provider lança erro', async () => {
      providerSpy.carregarArvore.and.returnValue(
        new (await import('rxjs')).Observable(subscriber => subscriber.error(new Error('Falha de rede')))
      );

      await component.carregar({ id: 'obj-1' });

      expect(component.dados()).toBeNull();
      expect(component.selectedNodeId()).toBeNull();
      expect(component.loadError()).toBe('Falha de rede');
      expect(component.loading()).toBeFalse();
    });

    it('deve resetar levels e panZoom ao carregar', async () => {
      component.levelsAbove.set(5);
      component.levelsBelow.set(5);

      const data: ArvoreData = {
        focalId: 'obj-1',
        nos: { 'obj-1': makeNode({ id: 'obj-1' }) }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'obj-1' });

      expect(component.levelsAbove()).toBe(DEFAULT_LEVELS);
      expect(component.levelsBelow()).toBe(DEFAULT_LEVELS);
    });
  });

  // ─── onNodeClick ───────────────────────────────────────────────────────────────

  describe('onNodeClick', () => {
    it('deve atualizar selectedNodeId', () => {
      const event = new MouseEvent('click');
      spyOn(event, 'stopPropagation');

      component.onNodeClick('node-42', event);

      expect(component.selectedNodeId()).toBe('node-42');
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  // ─── onCentralizar ─────────────────────────────────────────────────────────────

  describe('onCentralizar', () => {
    it('deve delegar para provider.navegarParaNo', () => {
      component.onCentralizar('node-7');

      expect(providerSpy.navegarParaNo).toHaveBeenCalledWith('node-7');
    });
  });

  // ─── layout computed ───────────────────────────────────────────────────────────

  describe('layout computed', () => {
    it('deve gerar treeNodes a partir dos dados carregados', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'] }),
          'B': makeNode({ id: 'B', parentId: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'A' });

      const nodes = component.treeNodes();
      expect(nodes.length).toBe(2);
      expect(nodes.find(n => n.id === 'A')!.isFocal).toBeTrue();
      expect(nodes.find(n => n.id === 'B')!.isFocal).toBeFalse();
    });

    it('deve gerar edges entre nós relacionados', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'] }),
          'B': makeNode({ id: 'B', parentId: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'A' });

      expect(component.edges().length).toBeGreaterThan(0);
    });

    it('deve considerar filhosSecondaryIds como links SECONDARY', async () => {
      const data: ArvoreData = {
        focalId: 'A',
        nos: {
          'A': makeNode({ id: 'A', filhosIds: ['B'], filhosSecondaryIds: ['C'] }),
          'B': makeNode({ id: 'B', parentId: 'A' }),
          'C': makeNode({ id: 'C', secondaryParentId: 'A' })
        }
      };
      providerSpy.carregarArvore.and.returnValue(of(data));

      await component.carregar({ id: 'A' });

      const secondaryEdge = component.edges().find(e => e.type === 'SECONDARY');
      expect(secondaryEdge).toBeTruthy();
    });

    it('deve retornar layout vazio quando não há dados', () => {
      expect(component.treeNodes()).toEqual([]);
      expect(component.edges()).toEqual([]);
    });
  });
});
