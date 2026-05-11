import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, computed, signal } from '@angular/core';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import objetivosDados from './dados.json';

type ObjetivoNode = {
  id: string;
  nome: string;
  planejamentoNome: string;
  planejamentoEhPai: boolean;
  entregasCount: number;
  esforcoTotalHoras: number;
  parentId?: string;
  objetivoSuperiorId?: string;
  x: number;
  y: number;
};

type ObjetivoDadosJson = {
  objetivo_id: string;
  objetivo_nome: string;
  planejamento_nome: string;
  planejamento_superior_id?: string | null;
  total_entregas: number;
  esforco_total_horas: number;
  objetivo_pai_id?: string | null;
  objetivo_superior_id?: string | null;
};

type PlanejamentoColor = {
  fill: string;
  stroke: string;
};

type EdgeType = 'PAI' | 'SUPERIOR';

type ObjetivoEdge = {
  source: string;
  target: string;
  type: EdgeType;
};

type EdgeSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type GraphViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Cartão do nó no SVG (centrado em x,y) — área maior para título + rodapé sem sobreposição. */
const CARD_W = 170;
const CARD_H = 82;
const CARD_HALF_W = CARD_W / 2;
const CARD_HALF_H = CARD_H / 2;
const GRAPH_W = 1400;
const GRAPH_H = 850;
const GRAPH_PADDING_Y = CARD_HALF_H + 45;
const ROOT_PLANEJAMENTO_X = 180;
const CHILD_PLANEJAMENTO_X = 1220;
const PLANEJAMENTO_PALETTE: PlanejamentoColor[] = [
  { fill: '#dbe8fb', stroke: '#1351b4' },
  { fill: '#ede7f6', stroke: '#5e35b1' },
  { fill: '#d7f4dd', stroke: '#216e39' },
  { fill: '#fff2cc', stroke: '#9c6f00' },
  { fill: '#fde2e2', stroke: '#b3261e' },
  { fill: '#dff7f6', stroke: '#0f766e' }
];

@Component({
  selector: 'app-objetivos-relacionamento-grafo',
  standalone: true,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './objetivos-relacionamento-grafo.component.html',
  styleUrl: './objetivos-relacionamento-grafo.component.scss'
})
export class ObjetivosRelacionamentoGrafoComponent {
  @ViewChild('svgRef', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  /** Expõe medidas do cartão ao template (foreignObject / rect). */
  readonly graphW = GRAPH_W;
  readonly graphH = GRAPH_H;
  readonly cardW = CARD_W;
  readonly cardH = CARD_H;
  readonly cardHalfW = CARD_HALF_W;
  readonly cardHalfH = CARD_HALF_H;

  private readonly allNodes: ObjetivoNode[] = this.buildNodesFromDados(objetivosDados as ObjetivoDadosJson[]);
  private readonly planejamentoColors = this.buildPlanejamentoColors(this.allNodes);

  readonly nodes = signal<ObjetivoNode[]>(this.cloneNodes(this.allNodes));
  readonly zoom = signal(1);
  readonly showPaiRelations = signal(true);
  readonly showSuperiorRelations = signal(true);
  readonly selectedNodeId = signal<string | null>(null);
  readonly expandedNodeIds = signal<Set<string>>(new Set());
  readonly planejamentoFilter = signal<string>('ALL');
  readonly maxNodes = signal<number>(50);
  readonly maxNodesOptions = [18, 30, 50, 75, 100, 150];
  readonly planejamentoOptions = computed(() => ['ALL', ...new Set(this.allNodes.map(node => node.planejamentoNome))]);
  readonly planejamentosLegenda = computed(() =>
    [...new Set(this.nodes().map(node => node.planejamentoNome))].map(nome => ({
      nome,
      color: this.planejamentoColor(nome)
    }))
  );
  readonly viewBox = computed<GraphViewBox>(() => {
    const zoom = this.zoom();
    const width = GRAPH_W / zoom;
    const height = GRAPH_H / zoom;

    return {
      x: (GRAPH_W - width) / 2,
      y: (GRAPH_H - height) / 2,
      width,
      height
    };
  });
  readonly viewBoxString = computed(() => {
    const viewBox = this.viewBox();
    return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
  });

  private dragState: { nodeId: string; offsetX: number; offsetY: number } | null = null;

  constructor() {
    this.applyDisplayFilters();
  }

  readonly rootNodeIds = computed<string[]>(() =>
    this.nodes()
      .filter(node => !node.parentId && !node.objetivoSuperiorId)
      .map(node => node.id)
  );

  readonly edges = computed<ObjetivoEdge[]>(() => {
    const nodes = this.nodes();
    const edges: ObjetivoEdge[] = [];

    for (const node of nodes) {
      if (node.parentId && this.showPaiRelations()) {
        edges.push({ source: node.id, target: node.parentId, type: 'PAI' });
      }
      if (node.objetivoSuperiorId && this.showSuperiorRelations()) {
        edges.push({ source: node.id, target: node.objetivoSuperiorId, type: 'SUPERIOR' });
      }
    }

    return edges;
  });

  readonly visibleNodeIds = computed<Set<string>>(() => {
    const visible = new Set<string>(this.rootNodeIds());
    const expanded = this.expandedNodeIds();

    for (const nodeId of expanded) {
      visible.add(nodeId);
      for (const neighbor of this.getNodeNeighbors(nodeId)) {
        visible.add(neighbor);
      }
    }

    return visible;
  });

  readonly visibleNodes = computed<ObjetivoNode[]>(() =>
    this.nodes().filter(node => this.visibleNodeIds().has(node.id))
  );

  readonly visibleEdges = computed<ObjetivoEdge[]>(() => {
    const visibleNodeIds = this.visibleNodeIds();
    return this.edges().filter(edge => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target));
  });

  readonly selectedNode = computed(() => {
    const id = this.selectedNodeId();
    if (!id) return null;
    return this.nodes().find(node => node.id === id) ?? null;
  });

  readonly selectedConnections = computed(() => {
    const selectedId = this.selectedNodeId();
    if (!selectedId) return { parents: [], children: [], superiores: [] } as const;

    const nodes = this.nodes();
    const byId = new Map(nodes.map(node => [node.id, node]));
    const selected = byId.get(selectedId);
    if (!selected) return { parents: [], children: [], superiores: [] } as const;

    const parents = selected.parentId && byId.get(selected.parentId) ? [byId.get(selected.parentId)!] : [];
    const children = nodes.filter(node => node.parentId === selected.id);
    const superiores = selected.objetivoSuperiorId && byId.get(selected.objetivoSuperiorId)
      ? [byId.get(selected.objetivoSuperiorId)!]
      : [];

    return { parents, children, superiores } as const;
  });

  selectNode(nodeId: string) {
    this.selectedNodeId.set(nodeId);
  }

  onNodeClick(nodeId: string) {
    this.selectNode(nodeId);
    if (!this.nodeHasRelations(nodeId)) return;

    this.expandedNodeIds.update(current => {
      const next = new Set(current);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  }

  onTogglePai(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.showPaiRelations.set(!!input?.checked);
  }

  onToggleSuperior(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.showSuperiorRelations.set(!!input?.checked);
  }

  resetLayout() {
    this.applyDisplayFilters();
    this.selectedNodeId.set(null);
    this.expandedNodeIds.set(new Set());
  }

  zoomIn() {
    this.zoom.update(value => Math.min(1.6, Number((value + 0.1).toFixed(2))));
  }

  zoomOut() {
    this.zoom.update(value => Math.max(0.55, Number((value - 0.1).toFixed(2))));
  }

  resetZoom() {
    this.zoom.set(1);
  }

  onPlanejamentoFilterChange(event: Event) {
    const input = event.target as HTMLSelectElement | null;
    this.planejamentoFilter.set(input?.value ?? 'ALL');
    this.applyDisplayFilters();
  }

  onMaxNodesChange(event: Event) {
    const input = event.target as HTMLSelectElement | null;
    const parsed = Number(input?.value ?? this.maxNodes());
    this.maxNodes.set(Number.isFinite(parsed) && parsed > 0 ? parsed : 50);
    this.applyDisplayFilters();
  }

  clearSelection() {
    this.selectedNodeId.set(null);
  }

  startDrag(event: PointerEvent, nodeId: string) {
    event.stopPropagation();
    const position = this.getSvgRelativePosition(event);
    const node = this.nodes().find(item => item.id === nodeId);
    if (!node) return;

    this.dragState = {
      nodeId,
      offsetX: position.x - node.x,
      offsetY: position.y - node.y
    };

    this.selectNode(nodeId);
  }

  @HostListener('window:pointermove', ['$event'])
  onWindowPointerMove(event: PointerEvent) {
    if (!this.dragState) return;

    const position = this.getSvgRelativePosition(event);
    const nextX = Math.max(CARD_HALF_W, Math.min(GRAPH_W - CARD_HALF_W, position.x - this.dragState.offsetX));
    const nextY = Math.max(CARD_HALF_H, Math.min(GRAPH_H - CARD_HALF_H, position.y - this.dragState.offsetY));

    this.nodes.update(nodes =>
      nodes.map(node =>
        node.id === this.dragState!.nodeId ? { ...node, x: nextX, y: nextY } : node
      )
    );
  }

  @HostListener('window:pointerup')
  onWindowPointerUp() {
    this.dragState = null;
  }

  isEdgeHighlighted(edge: ObjetivoEdge): boolean {
    const selectedId = this.selectedNodeId();
    if (!selectedId) return true;
    return edge.source === selectedId || edge.target === selectedId;
  }

  isExpanded(nodeId: string): boolean {
    return this.expandedNodeIds().has(nodeId);
  }

  hasExpandableRelations(nodeId: string): boolean {
    return this.nodeHasRelations(nodeId);
  }

  edgeSegment(source: ObjetivoNode, target: ObjetivoNode): EdgeSegment {
    const dx = target.x - source.x;
    const dy = target.y - source.y;

    if (dx === 0 && dy === 0) {
      return { x1: source.x, y1: source.y, x2: target.x, y2: target.y };
    }

    const sourceOffset = this.cardBoundaryOffset(dx, dy);
    const targetOffset = this.cardBoundaryOffset(dx, dy);

    return {
      x1: source.x + sourceOffset.x,
      y1: source.y + sourceOffset.y,
      x2: target.x - targetOffset.x,
      y2: target.y - targetOffset.y
    };
  }

  edgeTitle(edge: ObjetivoEdge, source: ObjetivoNode, target: ObjetivoNode): string {
    if (edge.type === 'PAI') {
      return `Filho -> pai: ${source.nome} -> ${target.nome}`;
    }

    return `Objetivo relacionado -> objetivo superior: ${source.nome} -> ${target.nome}`;
  }

  nodeFill(node: ObjetivoNode): string {
    return this.planejamentoColor(node.planejamentoNome).fill;
  }

  nodeStroke(node: ObjetivoNode): string {
    if (this.selectedNodeId() === node.id) return '#071d41';
    return this.planejamentoColor(node.planejamentoNome).stroke;
  }

  planejamentoColor(nome: string): PlanejamentoColor {
    return this.planejamentoColors.get(nome) ?? PLANEJAMENTO_PALETTE[0];
  }

  private getSvgRelativePosition(event: PointerEvent): { x: number; y: number } {
    const svg = this.svgRef.nativeElement;
    const rect = svg.getBoundingClientRect();
    const viewBox = this.viewBox();
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;

    return {
      x: viewBox.x + (event.clientX - rect.left) * scaleX,
      y: viewBox.y + (event.clientY - rect.top) * scaleY
    };
  }

  private cardBoundaryOffset(dx: number, dy: number): { x: number; y: number } {
    const safeDx = Math.abs(dx) || 0.0001;
    const safeDy = Math.abs(dy) || 0.0001;
    const scale = Math.min(CARD_HALF_W / safeDx, CARD_HALF_H / safeDy);

    return {
      x: dx * scale,
      y: dy * scale
    };
  }

  private nodeHasRelations(nodeId: string): boolean {
    return this.getNodeNeighbors(nodeId).length > 0;
  }

  private getNodeNeighbors(nodeId: string): string[] {
    const neighbors = new Set<string>();
    const nodes = this.nodes();
    const targetNode = nodes.find(node => node.id === nodeId);

    if (!targetNode) return [];

    if (targetNode.parentId && this.showPaiRelations()) {
      neighbors.add(targetNode.parentId);
    }

    if (targetNode.objetivoSuperiorId && this.showSuperiorRelations()) {
      neighbors.add(targetNode.objetivoSuperiorId);
    }

    for (const node of nodes) {
      if (this.showPaiRelations() && node.parentId === nodeId) {
        neighbors.add(node.id);
      }
      if (this.showSuperiorRelations() && node.objetivoSuperiorId === nodeId) {
        neighbors.add(node.id);
      }
    }

    return [...neighbors];
  }

  private cloneNodes(nodes: ObjetivoNode[]): ObjetivoNode[] {
    return nodes.map(node => ({ ...node }));
  }

  private buildNodesFromDados(dados: ObjetivoDadosJson[]): ObjetivoNode[] {
    const objetivos = dados.filter(item => item.objetivo_id?.length && item.objetivo_nome?.length && item.planejamento_nome?.length);
    const selected = objetivos;
    const planejamentoEhPaiByNome = this.buildPlanejamentoParentFlag(selected);

    const ordered = [...selected].sort((a, b) => {
      const aEhPai = planejamentoEhPaiByNome.get(a.planejamento_nome) ?? true;
      const bEhPai = planejamentoEhPaiByNome.get(b.planejamento_nome) ?? true;
      if (aEhPai !== bEhPai) return aEhPai ? -1 : 1;
      return a.objetivo_nome.localeCompare(b.objetivo_nome);
    });

    const positionByGroup = new Map<'PAI' | 'FILHO', number>();
    const totalByGroup = new Map<'PAI' | 'FILHO', number>();

    for (const item of ordered) {
      const group: 'PAI' | 'FILHO' = (planejamentoEhPaiByNome.get(item.planejamento_nome) ?? true) ? 'PAI' : 'FILHO';
      totalByGroup.set(group, (totalByGroup.get(group) ?? 0) + 1);
    }

    return ordered.map(item => {
      const planejamentoEhPai = planejamentoEhPaiByNome.get(item.planejamento_nome) ?? true;
      const group: 'PAI' | 'FILHO' = planejamentoEhPai ? 'PAI' : 'FILHO';
      const index = positionByGroup.get(group) ?? 0;
      positionByGroup.set(group, index + 1);

      return {
        id: item.objetivo_id,
        nome: item.objetivo_nome,
        planejamentoNome: item.planejamento_nome,
        planejamentoEhPai,
        entregasCount: item.total_entregas ?? 0,
        esforcoTotalHoras: item.esforco_total_horas ?? 0,
        parentId: item.objetivo_pai_id ?? undefined,
        objetivoSuperiorId: item.objetivo_superior_id ?? undefined,
        x: this.xByPlanejamentoParentFlag(planejamentoEhPai),
        y: this.yByGroupIndex(index, totalByGroup.get(group) ?? 1)
      };
    });
  }

  private buildPlanejamentoParentFlag(objetivos: ObjetivoDadosJson[]): Map<string, boolean> {
    const planningSuperiorValues = new Map<string, Set<string | null>>();

    for (const objetivo of objetivos) {
      const values = planningSuperiorValues.get(objetivo.planejamento_nome) ?? new Set<string | null>();
      values.add(objetivo.planejamento_superior_id ?? null);
      planningSuperiorValues.set(objetivo.planejamento_nome, values);
    }

    const result = new Map<string, boolean>();
    for (const [planningName, superiorValues] of planningSuperiorValues) {
      const hasSuperiorReference = [...superiorValues].some(value => !!value);
      result.set(planningName, !hasSuperiorReference);
    }

    return result;
  }

  private xByPlanejamentoParentFlag(planejamentoEhPai: boolean): number {
    return planejamentoEhPai ? ROOT_PLANEJAMENTO_X : CHILD_PLANEJAMENTO_X;
  }

  private yByGroupIndex(index: number, total: number): number {
    if (total <= 1) return GRAPH_H / 2;

    const availableHeight = GRAPH_H - GRAPH_PADDING_Y * 2;
    return GRAPH_PADDING_Y + index * (availableHeight / (total - 1));
  }

  private buildPlanejamentoColors(nodes: ObjetivoNode[]): Map<string, PlanejamentoColor> {
    const planejamentoNomes = [...new Set(nodes.map(node => node.planejamentoNome))].sort();

    return new Map(planejamentoNomes.map((nome, index) => [
      nome,
      PLANEJAMENTO_PALETTE[index % PLANEJAMENTO_PALETTE.length]
    ]));
  }

  private applyDisplayFilters() {
    const planejamento = this.planejamentoFilter();
    const limit = this.maxNodes();

    const filteredByPlanning = planejamento === 'ALL'
      ? this.allNodes
      : this.allNodes.filter(node => node.planejamentoNome === planejamento);

    const limited = filteredByPlanning.slice(0, Math.max(1, limit));
    const ids = new Set(limited.map(node => node.id));
    const normalized = limited.map(node => ({
      ...node,
      parentId: node.parentId && ids.has(node.parentId) ? node.parentId : undefined,
      objetivoSuperiorId: node.objetivoSuperiorId && ids.has(node.objetivoSuperiorId) ? node.objetivoSuperiorId : undefined
    }));

    this.nodes.set(this.cloneNodes(normalized));
    this.selectedNodeId.set(null);
    this.expandedNodeIds.set(new Set());
  }

  
}
