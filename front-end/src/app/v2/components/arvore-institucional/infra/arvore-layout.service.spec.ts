import { ArvoreLayoutService, CANVAS_PAD, H_GAP, NODE_H, NODE_HALF_H, NODE_HALF_W, NODE_W, V_GAP, type GetDownLinksFn, type GetUpLinkFn } from './arvore-layout.service';
import type { ArvoreNodeData } from '../domain/types';

describe('ArvoreLayoutService', () => {
  let service: ArvoreLayoutService;

  beforeEach(() => {
    service = new ArvoreLayoutService();
  });

  // ─── Helpers ───────────────────────────────────────────────────────────────────

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

  const defaultGetUpLink: GetUpLinkFn = (nodeId, nos) => {
    const n = nos[nodeId];
    if (!n) return null;
    if (n.parentId && nos[n.parentId]) return { id: n.parentId, link: 'PRIMARY' };
    if (n.secondaryParentId && nos[n.secondaryParentId]) return { id: n.secondaryParentId, link: 'SECONDARY' };
    return null;
  };

  const defaultGetDownLinks: GetDownLinksFn = (nodeId, nos) => {
    const n = nos[nodeId];
    if (!n) return [];
    const links: Array<{ id: string; link: 'PRIMARY' | 'SECONDARY' }> = [];
    const seen = new Set<string>();
    for (const id of n.filhosIds) {
      if (nos[id] && !seen.has(id)) { seen.add(id); links.push({ id, link: 'PRIMARY' }); }
    }
    for (const id of n.filhosSecondaryIds) {
      if (nos[id] && !seen.has(id)) { seen.add(id); links.push({ id, link: 'SECONDARY' }); }
    }
    return links;
  };

  // ─── buildUpChain ──────────────────────────────────────────────────────────────

  describe('buildUpChain', () => {
    it('deve retornar cadeia vazia quando nó não tem pai', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A' })
      };

      const result = service.buildUpChain('A', nos, defaultGetUpLink);

      expect(result).toEqual([]);
    });

    it('deve retornar um step quando nó tem um pai', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', parentId: 'B' }),
        'B': makeNode({ id: 'B' })
      };

      const result = service.buildUpChain('A', nos, defaultGetUpLink);

      expect(result.length).toBe(1);
      expect(result[0]).toEqual({ id: 'B', link: 'PRIMARY', childId: 'A' });
    });

    it('deve construir cadeia completa de ancestrais (avô → pai → focal)', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'C': makeNode({ id: 'C', parentId: 'B' }),
        'B': makeNode({ id: 'B', parentId: 'A' }),
        'A': makeNode({ id: 'A' })
      };

      const result = service.buildUpChain('C', nos, defaultGetUpLink);

      expect(result.length).toBe(2);
      expect(result[0]).toEqual({ id: 'B', link: 'PRIMARY', childId: 'C' });
      expect(result[1]).toEqual({ id: 'A', link: 'PRIMARY', childId: 'B' });
    });

    it('deve usar vínculo SECONDARY quando não há parentId', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', secondaryParentId: 'B' }),
        'B': makeNode({ id: 'B' })
      };

      const result = service.buildUpChain('A', nos, defaultGetUpLink);

      expect(result.length).toBe(1);
      expect(result[0].link).toBe('SECONDARY');
    });

    it('deve parar quando pai referenciado não existe no mapa', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', parentId: 'INEXISTENTE' })
      };

      const result = service.buildUpChain('A', nos, defaultGetUpLink);

      expect(result).toEqual([]);
    });

    it('deve retornar cadeia vazia quando focalId não existe no mapa', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A' })
      };

      const result = service.buildUpChain('INEXISTENTE', nos, defaultGetUpLink);

      expect(result).toEqual([]);
    });
  });

  // ─── maxDescendantDepth ────────────────────────────────────────────────────────

  describe('maxDescendantDepth', () => {
    it('deve retornar 0 quando nó não tem filhos', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A' })
      };

      const result = service.maxDescendantDepth('A', nos, defaultGetDownLinks);

      expect(result).toBe(0);
    });

    it('deve retornar 1 quando nó tem apenas filhos diretos', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B', 'C'] }),
        'B': makeNode({ id: 'B', parentId: 'A' }),
        'C': makeNode({ id: 'C', parentId: 'A' })
      };

      const result = service.maxDescendantDepth('A', nos, defaultGetDownLinks);

      expect(result).toBe(1);
    });

    it('deve retornar profundidade máxima em árvore desbalanceada', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B', 'C'] }),
        'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['D'] }),
        'C': makeNode({ id: 'C', parentId: 'A' }),
        'D': makeNode({ id: 'D', parentId: 'B', filhosIds: ['E'] }),
        'E': makeNode({ id: 'E', parentId: 'D' })
      };

      const result = service.maxDescendantDepth('A', nos, defaultGetDownLinks);

      expect(result).toBe(3);
    });

    it('deve lidar com ciclos sem loop infinito', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['A'] })
      };

      const result = service.maxDescendantDepth('A', nos, defaultGetDownLinks);

      expect(result).toBeGreaterThanOrEqual(1);
    });

    it('deve contar filhos secondary na profundidade', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosSecondaryIds: ['B'] }),
        'B': makeNode({ id: 'B', secondaryParentId: 'A' })
      };

      const result = service.maxDescendantDepth('A', nos, defaultGetDownLinks);

      expect(result).toBe(1);
    });
  });

  // ─── collectDescendantsByDepth ─────────────────────────────────────────────────

  describe('collectDescendantsByDepth', () => {
    it('deve retornar mapa vazio quando maxDepth é 0', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A' })
      };

      const result = service.collectDescendantsByDepth('A', 0, nos, defaultGetDownLinks);

      expect(result.size).toBe(0);
    });

    it('deve retornar filhos diretos no depth 1', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B', 'C'] }),
        'B': makeNode({ id: 'B', parentId: 'A' }),
        'C': makeNode({ id: 'C', parentId: 'A' })
      };

      const result = service.collectDescendantsByDepth('A', 1, nos, defaultGetDownLinks);

      expect(result.size).toBe(1);
      expect(result.get(1)?.sort()).toEqual(['B', 'C']);
    });

    it('deve coletar múltiplos níveis de profundidade', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['C'] }),
        'C': makeNode({ id: 'C', parentId: 'B' })
      };

      const result = service.collectDescendantsByDepth('A', 3, nos, defaultGetDownLinks);

      expect(result.size).toBe(2);
      expect(result.get(1)).toEqual(['B']);
      expect(result.get(2)).toEqual(['C']);
    });

    it('deve parar antes de maxDepth se não há mais descendentes', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A' })
      };

      const result = service.collectDescendantsByDepth('A', 5, nos, defaultGetDownLinks);

      expect(result.size).toBe(1);
      expect(result.get(1)).toEqual(['B']);
    });

    it('deve evitar duplicatas no mesmo nível', () => {
      // Dois pais apontam para o mesmo filho
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B', 'C'] }),
        'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['D'] }),
        'C': makeNode({ id: 'C', parentId: 'A', filhosIds: ['D'] }),
        'D': makeNode({ id: 'D', parentId: 'B' })
      };

      const result = service.collectDescendantsByDepth('A', 2, nos, defaultGetDownLinks);

      expect(result.get(2)!.length).toBe(1);
      expect(result.get(2)).toEqual(['D']);
    });
  });

  // ─── edgePath ──────────────────────────────────────────────────────────────────

  describe('edgePath', () => {
    it('deve gerar path SVG com cotovelo entre pai e filho na mesma coluna', () => {
      const parent = { x: 400, y: 100 };
      const child = { x: 400, y: 264 };

      const result = service.edgePath(parent, child);

      const y1 = parent.y + NODE_HALF_H;
      const y2 = child.y - NODE_HALF_H;
      const midY = (y1 + y2) / 2;
      expect(result).toBe(`M 400 ${y1} L 400 ${midY} L 400 ${midY} L 400 ${y2}`);
    });

    it('deve gerar path SVG com cotovelo quando filho está à direita', () => {
      const parent = { x: 400, y: 100 };
      const child = { x: 660, y: 264 };

      const result = service.edgePath(parent, child);

      const y1 = parent.y + NODE_HALF_H;
      const y2 = child.y - NODE_HALF_H;
      const midY = (y1 + y2) / 2;
      expect(result).toBe(`M 400 ${y1} L 400 ${midY} L 660 ${midY} L 660 ${y2}`);
    });
  });

  // ─── formatPercent ─────────────────────────────────────────────────────────────

  describe('formatPercent', () => {
    it('deve retornar "0%" para null', () => {
      expect(service.formatPercent(null)).toBe('0%');
    });

    it('deve retornar "0%" para undefined', () => {
      expect(service.formatPercent(undefined)).toBe('0%');
    });

    it('deve retornar "0%" para NaN', () => {
      expect(service.formatPercent(NaN)).toBe('0%');
    });

    it('deve retornar "0%" para Infinity', () => {
      expect(service.formatPercent(Infinity)).toBe('0%');
    });

    it('deve formatar valor numérico com até 2 casas decimais', () => {
      const result = service.formatPercent(45.678);
      // Formatação pt-BR: 45,68% (arredondado)
      expect(result).toContain('45,68');
      expect(result).toContain('%');
    });

    it('deve formatar 100 como "100%"', () => {
      expect(service.formatPercent(100)).toBe('100%');
    });

    it('deve formatar 0 como "0%"', () => {
      expect(service.formatPercent(0)).toBe('0%');
    });
  });

  // ─── formatHoras ───────────────────────────────────────────────────────────────

  describe('formatHoras', () => {
    it('deve retornar "0" para null', () => {
      expect(service.formatHoras(null)).toBe('0');
    });

    it('deve retornar "0" para undefined', () => {
      expect(service.formatHoras(undefined)).toBe('0');
    });

    it('deve retornar "0" para NaN', () => {
      expect(service.formatHoras(NaN)).toBe('0');
    });

    it('deve formatar 120.5 corretamente', () => {
      const result = service.formatHoras(120.5);
      expect(result).toContain('120,5');
    });

    it('deve formatar 0 como "0"', () => {
      expect(service.formatHoras(0)).toBe('0');
    });

    it('deve arredondar para até 2 casas decimais', () => {
      const result = service.formatHoras(10.999);
      expect(result).toContain('11');
    });
  });

  // ─── buildLayout ───────────────────────────────────────────────────────────────

  describe('buildLayout', () => {
    it('deve retornar layout vazio quando nos é undefined', () => {
      const result = service.buildLayout(undefined, 'A', 2, 2, defaultGetUpLink, defaultGetDownLinks);

      expect(result.treeNodes).toEqual([]);
      expect(result.edges).toEqual([]);
      expect(result.width).toBe(800);
      expect(result.height).toBe(520);
    });

    it('deve retornar layout vazio quando focalId é null', () => {
      const nos = { 'A': makeNode({ id: 'A' }) };
      const result = service.buildLayout(nos, null, 2, 2, defaultGetUpLink, defaultGetDownLinks);

      expect(result.treeNodes).toEqual([]);
    });

    it('deve retornar layout vazio quando focalId não existe nos nós', () => {
      const nos = { 'A': makeNode({ id: 'A' }) };
      const result = service.buildLayout(nos, 'INEXISTENTE', 2, 2, defaultGetUpLink, defaultGetDownLinks);

      expect(result.treeNodes).toEqual([]);
    });

    it('deve posicionar nó focal no centro', () => {
      const nos = { 'A': makeNode({ id: 'A' }) };
      const result = service.buildLayout(nos, 'A', 2, 2, defaultGetUpLink, defaultGetDownLinks);

      expect(result.treeNodes.length).toBe(1);
      const focal = result.treeNodes[0];
      expect(focal.isFocal).toBeTrue();
      expect(focal.id).toBe('A');
      expect(focal.level).toBe(0);
    });

    it('deve posicionar ancestrais acima do focal', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'C': makeNode({ id: 'C', parentId: 'B' }),
        'B': makeNode({ id: 'B', parentId: 'A' }),
        'A': makeNode({ id: 'A' })
      };

      const result = service.buildLayout(nos, 'C', 2, 2, defaultGetUpLink, defaultGetDownLinks);

      const focal = result.treeNodes.find(n => n.id === 'C')!;
      const pai = result.treeNodes.find(n => n.id === 'B')!;
      const avo = result.treeNodes.find(n => n.id === 'A')!;

      expect(focal.isFocal).toBeTrue();
      expect(pai.level).toBe(-1);
      expect(avo.level).toBe(-2);
      expect(pai.y).toBeLessThan(focal.y);
      expect(avo.y).toBeLessThan(pai.y);
    });

    it('deve posicionar descendentes abaixo do focal', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B', 'C'] }),
        'B': makeNode({ id: 'B', parentId: 'A' }),
        'C': makeNode({ id: 'C', parentId: 'A' })
      };

      const result = service.buildLayout(nos, 'A', 0, 2, defaultGetUpLink, defaultGetDownLinks);

      const focal = result.treeNodes.find(n => n.id === 'A')!;
      const filhoB = result.treeNodes.find(n => n.id === 'B')!;
      const filhoC = result.treeNodes.find(n => n.id === 'C')!;

      expect(filhoB.y).toBeGreaterThan(focal.y);
      expect(filhoC.y).toBeGreaterThan(focal.y);
      expect(filhoB.y).toBe(filhoC.y); // mesma linha
      expect(filhoB.level).toBe(1);
    });

    it('deve gerar edges PRIMARY entre pai e filhos', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A' })
      };

      const result = service.buildLayout(nos, 'A', 0, 1, defaultGetUpLink, defaultGetDownLinks);

      expect(result.edges.length).toBeGreaterThan(0);
      const edge = result.edges.find(e => e.key.includes('B') && e.key.includes('A'));
      expect(edge).toBeTruthy();
      expect(edge!.type).toBe('PRIMARY');
    });

    it('deve gerar edges SECONDARY para secondaryParentId', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosSecondaryIds: ['B'] }),
        'B': makeNode({ id: 'B', secondaryParentId: 'A' })
      };

      const result = service.buildLayout(nos, 'A', 0, 1, defaultGetUpLink, defaultGetDownLinks);

      const secondaryEdge = result.edges.find(e => e.type === 'SECONDARY');
      expect(secondaryEdge).toBeTruthy();
    });

    it('deve respeitar levelsAbove limitando ancestrais exibidos', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'D': makeNode({ id: 'D', parentId: 'C' }),
        'C': makeNode({ id: 'C', parentId: 'B' }),
        'B': makeNode({ id: 'B', parentId: 'A' }),
        'A': makeNode({ id: 'A' })
      };

      const result = service.buildLayout(nos, 'D', 1, 0, defaultGetUpLink, defaultGetDownLinks);

      // Com levelsAbove=1, só o pai direto deve aparecer, não avô/bisavô
      const ids = result.treeNodes.map(n => n.id);
      expect(ids).toContain('D');
      expect(ids).toContain('C');
      expect(ids).not.toContain('A'); // bisavô não exibido
    });

    it('deve respeitar levelsBelow limitando descendentes exibidos', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A', filhosIds: ['C'] }),
        'C': makeNode({ id: 'C', parentId: 'B', filhosIds: ['D'] }),
        'D': makeNode({ id: 'D', parentId: 'C' })
      };

      const result = service.buildLayout(nos, 'A', 0, 1, defaultGetUpLink, defaultGetDownLinks);

      const ids = result.treeNodes.map(n => n.id);
      expect(ids).toContain('A');
      expect(ids).toContain('B');
      expect(ids).not.toContain('C'); // depth 2 não exibido
    });

    it('deve calcular percentualDoPai para nós com pai visível', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'], esforcoTotalHoras: 100 }),
        'B': makeNode({ id: 'B', parentId: 'A', esforcoTotalHoras: 40 })
      };

      const result = service.buildLayout(nos, 'A', 0, 1, defaultGetUpLink, defaultGetDownLinks);

      const filhoB = result.treeNodes.find(n => n.id === 'B')!;
      expect(filhoB.percentualDoPai).toBe(40);
    });

    it('deve definir percentualDoPai como null para o nó focal', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', esforcoTotalHoras: 100 })
      };

      const result = service.buildLayout(nos, 'A', 0, 0, defaultGetUpLink, defaultGetDownLinks);

      const focal = result.treeNodes.find(n => n.id === 'A')!;
      expect(focal.percentualDoPai).toBeNull();
    });

    it('deve retornar percentualDoPai 0 quando paiHoras é 0', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'], esforcoTotalHoras: 0 }),
        'B': makeNode({ id: 'B', parentId: 'A', esforcoTotalHoras: 50 })
      };

      const result = service.buildLayout(nos, 'A', 0, 1, defaultGetUpLink, defaultGetDownLinks);

      const filhoB = result.treeNodes.find(n => n.id === 'B')!;
      expect(filhoB.percentualDoPai).toBe(0);
    });

    it('deve não duplicar edges para o mesmo par de nós', () => {
      const nos: Record<string, ArvoreNodeData> = {
        'A': makeNode({ id: 'A', filhosIds: ['B'] }),
        'B': makeNode({ id: 'B', parentId: 'A' })
      };

      const result = service.buildLayout(nos, 'A', 0, 1, defaultGetUpLink, defaultGetDownLinks);

      const keys = result.edges.map(e => e.key);
      const uniqueKeys = new Set(keys);
      expect(keys.length).toBe(uniqueKeys.size);
    });

    it('deve garantir dimensões mínimas do canvas', () => {
      const nos = { 'A': makeNode({ id: 'A' }) };
      const result = service.buildLayout(nos, 'A', 0, 0, defaultGetUpLink, defaultGetDownLinks);

      expect(result.width).toBeGreaterThanOrEqual(800);
      expect(result.height).toBeGreaterThanOrEqual(520);
    });
  });
});
