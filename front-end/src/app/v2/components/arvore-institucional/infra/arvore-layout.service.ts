import type { AncestorStep, ArvoreNodeData, EdgeVm, TreeNodeVm } from '../domain/types';

// ─── Constantes de layout ──────────────────────────────────────────────────────

export const NODE_W = 220;
export const NODE_H = 128;
export const NODE_HALF_W = NODE_W / 2;
export const NODE_HALF_H = NODE_H / 2;
export const H_GAP = 40;
export const V_GAP = 36;
export const CANVAS_PAD = 56;
export const DEFAULT_LEVELS = 2;

// ─── Tipos internos ────────────────────────────────────────────────────────────

export type LayoutResult = {
  treeNodes: TreeNodeVm[];
  edges: EdgeVm[];
  width: number;
  height: number;
};

/**
 * Função que retorna os links descendentes de um nó.
 * Cada link indica o ID do filho e o tipo de conexão (PRIMARY = hierarquia direta, SECONDARY = vínculo entre contextos).
 */
export type GetDownLinksFn = (
  nodeId: string,
  nos: Record<string, ArvoreNodeData>
) => Array<{ id: string; link: 'PRIMARY' | 'SECONDARY' }>;

/**
 * Função que retorna o link ascendente de um nó (para construir a cadeia de ancestrais).
 * Retorna null se não há ancestral.
 */
export type GetUpLinkFn = (
  nodeId: string,
  nos: Record<string, ArvoreNodeData>
) => { id: string; link: 'PRIMARY' | 'SECONDARY' } | null;

// ─── Serviço de Layout ─────────────────────────────────────────────────────────

/**
 * Serviço de layout SVG para a árvore institucional.
 * Contém lógica pura de posicionamento, sem dependências Angular.
 * Injetável como classe simples (sem decorator — providers definem na rota).
 */
export class ArvoreLayoutService {

  /**
   * Constrói a cadeia de ancestrais (subindo do focal para a raiz).
   */
  buildUpChain(
    focalId: string,
    nos: Record<string, ArvoreNodeData>,
    getUpLink: GetUpLinkFn
  ): AncestorStep[] {
    const steps: AncestorStep[] = [];
    let cur = focalId;

    while (true) {
      const link = getUpLink(cur, nos);
      if (!link || !nos[link.id]) {
        break;
      }
      steps.push({ id: link.id, link: link.link, childId: cur });
      cur = link.id;
    }

    return steps;
  }

  /**
   * Calcula a profundidade máxima de descendentes a partir do focal.
   */
  maxDescendantDepth(
    focalId: string,
    nos: Record<string, ArvoreNodeData>,
    getDownLinks: GetDownLinksFn
  ): number {
    let max = 0;

    const walk = (id: string, depth: number, visited: Set<string>): void => {
      if (visited.has(id)) {
        return;
      }
      visited.add(id);
      max = Math.max(max, depth);

      for (const { id: childId } of getDownLinks(id, nos)) {
        walk(childId, depth + 1, visited);
      }
    };

    for (const { id } of getDownLinks(focalId, nos)) {
      walk(id, 1, new Set());
    }

    return max;
  }

  /**
   * Coleta descendentes agrupados por profundidade (BFS nível a nível).
   */
  collectDescendantsByDepth(
    focalId: string,
    maxDepth: number,
    nos: Record<string, ArvoreNodeData>,
    getDownLinks: GetDownLinksFn
  ): Map<number, string[]> {
    const byDepth = new Map<number, string[]>();
    if (maxDepth <= 0) {
      return byDepth;
    }

    let frontier = [focalId];

    for (let depth = 1; depth <= maxDepth; depth++) {
      const idsAtDepth: string[] = [];
      const seenAtDepth = new Set<string>();
      const nextFrontier: string[] = [];

      for (const parentId of frontier) {
        for (const { id } of getDownLinks(parentId, nos)) {
          if (seenAtDepth.has(id)) {
            continue;
          }
          seenAtDepth.add(id);
          idsAtDepth.push(id);
          nextFrontier.push(id);
        }
      }

      if (idsAtDepth.length === 0) {
        break;
      }

      byDepth.set(depth, idsAtDepth);
      frontier = nextFrontier;
    }

    return byDepth;
  }

  /**
   * Monta o layout completo: posiciona nós e gera edges.
   */
  buildLayout(
    nos: Record<string, ArvoreNodeData> | undefined,
    focalId: string | null,
    levelsAbove: number,
    levelsBelow: number,
    getUpLink: GetUpLinkFn,
    getDownLinks: GetDownLinksFn
  ): LayoutResult {
    if (!nos || !focalId || !nos[focalId]) {
      return { treeNodes: [], edges: [], width: 800, height: 520 };
    }

    const upSteps = this.buildUpChain(focalId, nos, getUpLink).slice(0, levelsAbove);
    const descendants = this.collectDescendantsByDepth(focalId, levelsBelow, nos, getDownLinks);

    const centerX = 400;
    const centerY = CANVAS_PAD + levelsAbove * (NODE_H + V_GAP) + NODE_HALF_H;

    const nodeById = new Map<string, TreeNodeVm>();
    const edges: EdgeVm[] = [];
    const edgeKeys = new Set<string>();

    const pushEdge = (edge: EdgeVm): void => {
      if (edgeKeys.has(edge.key)) {
        return;
      }
      edgeKeys.add(edge.key);
      edges.push(edge);
    };

    // Posicionar ancestrais (acima do focal)
    for (let i = 0; i < upSteps.length; i++) {
      const step = upSteps[i];
      const n = nos[step.id];
      if (!n) {
        continue;
      }
      const level = -(i + 1);
      const y = centerY + level * (NODE_H + V_GAP);
      nodeById.set(step.id, this.toNodeVm(n, false, level, centerX, y));
    }

    // Posicionar nó focal
    const focal = nos[focalId];
    nodeById.set(focalId, this.toNodeVm(focal, true, 0, centerX, centerY));

    // Edges dos ancestrais
    for (const step of upSteps) {
      const parent = nodeById.get(step.id);
      const child = nodeById.get(step.childId);
      if (parent && child) {
        pushEdge({
          key: `${step.link}:${step.childId}:${step.id}`,
          type: step.link,
          path: this.edgePath(parent, child)
        });
      }
    }

    // Posicionar descendentes
    for (const [depth, ids] of [...descendants.entries()].sort((a, b) => a[0] - b[0])) {
      const rowSpan = ids.length;
      ids.forEach((id, index) => {
        const n = nos[id];
        if (!n) {
          return;
        }
        const x = centerX + (index - (rowSpan - 1) / 2) * (NODE_W + H_GAP);
        const y = centerY + depth * (NODE_H + V_GAP);
        nodeById.set(id, this.toNodeVm(n, false, depth, x, y));
      });
    }

    // Edges hierárquicos (PRIMARY para parentId, SECONDARY para secondaryParentId)
    for (const [id, vm] of nodeById) {
      const n = nos[id];
      if (!n) {
        continue;
      }

      if (n.parentId && nodeById.has(n.parentId)) {
        pushEdge({
          key: `PRIMARY:${id}:${n.parentId}`,
          type: 'PRIMARY',
          path: this.edgePath(nodeById.get(n.parentId)!, vm)
        });
      }

      if (n.secondaryParentId && nodeById.has(n.secondaryParentId) && n.secondaryParentId !== n.parentId) {
        pushEdge({
          key: `SECONDARY:${id}:${n.secondaryParentId}`,
          type: 'SECONDARY',
          path: this.edgePath(nodeById.get(n.secondaryParentId)!, vm)
        });
      }
    }

    // Calcular percentual do pai para cada nó
    for (const [id, vm] of nodeById) {
      const n = nos[id];
      if (!n) {
        continue;
      }
      const parentId = n.parentId && nodeById.has(n.parentId)
        ? n.parentId
        : n.secondaryParentId && nodeById.has(n.secondaryParentId)
          ? n.secondaryParentId
          : null;

      if (!parentId) {
        vm.percentualDoPai = null;
        continue;
      }

      const parent = nodeById.get(parentId)!;
      vm.percentualDoPai = this.percentualContribuicao(vm.esforcoTotalHoras, parent.esforcoTotalHoras);
    }

    // Calcular dimensões do canvas
    const treeNodes = [...nodeById.values()];
    const xs = treeNodes.map(n => n.x);
    const ys = treeNodes.map(n => n.y);
    const minX = Math.min(...xs, centerX) - NODE_HALF_W - CANVAS_PAD;
    const maxX = Math.max(...xs, centerX) + NODE_HALF_W + CANVAS_PAD;
    const minY = Math.min(...ys, centerY) - NODE_HALF_H - CANVAS_PAD;
    const maxY = Math.max(...ys, centerY) + NODE_HALF_H + CANVAS_PAD;

    return {
      treeNodes,
      edges,
      width: Math.max(800, maxX - minX),
      height: Math.max(520, maxY - minY)
    };
  }

  /**
   * Gera o path SVG de uma edge (linha com cotovelo) entre pai e filho.
   */
  edgePath(parent: { x: number; y: number }, child: { x: number; y: number }): string {
    const x1 = parent.x;
    const y1 = parent.y + NODE_HALF_H;
    const x2 = child.x;
    const y2 = child.y - NODE_HALF_H;
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  }

  // ─── Utilitários ───────────────────────────────────────────────────────────────

  formatPercent(value: number | null | undefined): string {
    if (value === null || value === undefined || !Number.isFinite(value)) {
      return '0%';
    }
    return `${(Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;
  }

  formatHoras(value: number | null | undefined): string {
    if (value === null || value === undefined || !Number.isFinite(value)) {
      return '0';
    }
    return (Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }

  // ─── Internals ─────────────────────────────────────────────────────────────────

  private toNodeVm(
    n: ArvoreNodeData,
    isFocal: boolean,
    level: number,
    x: number,
    y: number
  ): TreeNodeVm {
    return {
      id: n.id,
      nome: n.nome,
      containerNome: n.containerNome,
      tipoNome: n.tipoNome,
      totalVinculos: n.totalVinculos,
      esforcoProprioHoras: n.esforcoProprioHoras,
      esforcoTotalHoras: n.esforcoTotalHoras,
      planejadoPercentualDisponivel: n.planejadoPercentualDisponivel,
      percentualDoPai: null,
      isFocal,
      level,
      x,
      y,
      extras: n.extras
    };
  }

  private percentualContribuicao(filhoHoras: number, paiHoras: number): number {
    if (paiHoras <= 0) {
      return 0;
    }
    return Math.round((filhoHoras / paiHoras) * 10000) / 100;
  }
}
