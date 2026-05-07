import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, computed, signal } from '@angular/core';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

type ObjetivoNode = {
  id: string;
  nome: string;
  planejamento: 'ATUAL' | 'SUPERIOR';
  parentId?: string;
  objetivoSuperiorId?: string;
  x: number;
  y: number;
};

type EdgeType = 'PAI' | 'SUPERIOR';

type ObjetivoEdge = {
  source: string;
  target: string;
  type: EdgeType;
};

@Component({
  selector: 'app-objetivos-relacionamento-grafo',
  standalone: true,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './objetivos-relacionamento-grafo.component.html',
  styleUrl: './objetivos-relacionamento-grafo.component.scss'
})
export class ObjetivosRelacionamentoGrafoComponent {
  @ViewChild('svgRef', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  private readonly initialNodes: ObjetivoNode[] = [
    { id: 'sup-1', nome: 'Aprimorar governança institucional', planejamento: 'SUPERIOR', x: 170, y: 110 },
    { id: 'sup-2', nome: 'Ampliar maturidade digital', planejamento: 'SUPERIOR', x: 170, y: 250, parentId: 'sup-1' },
    { id: 'sup-3', nome: 'Fortalecer gestão por desempenho', planejamento: 'SUPERIOR', x: 170, y: 390, parentId: 'sup-1' },
    { id: 'at-1', nome: 'Consolidar indicadores do órgão', planejamento: 'ATUAL', x: 560, y: 130, objetivoSuperiorId: 'sup-3' },
    { id: 'at-2', nome: 'Automatizar fluxo de monitoramento', planejamento: 'ATUAL', x: 560, y: 270, parentId: 'at-1', objetivoSuperiorId: 'sup-2' },
    { id: 'at-3', nome: 'Implantar painel de metas', planejamento: 'ATUAL', x: 560, y: 410, parentId: 'at-1', objetivoSuperiorId: 'sup-2' },
    { id: 'at-4', nome: 'Evoluir modelo de avaliação', planejamento: 'ATUAL', x: 840, y: 260, parentId: 'at-2', objetivoSuperiorId: 'sup-3' }
  ];

  readonly nodes = signal<ObjetivoNode[]>(this.initialNodes.map(node => ({ ...node })));
  readonly showPaiRelations = signal(true);
  readonly showSuperiorRelations = signal(true);
  readonly selectedNodeId = signal<string | null>(null);
  readonly expandedNodeIds = signal<Set<string>>(new Set());

  private dragState: { nodeId: string; offsetX: number; offsetY: number } | null = null;

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
        edges.push({ source: node.parentId, target: node.id, type: 'PAI' });
      }
      if (node.objetivoSuperiorId && this.showSuperiorRelations()) {
        edges.push({ source: node.objetivoSuperiorId, target: node.id, type: 'SUPERIOR' });
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
    this.nodes.set(this.initialNodes.map(node => ({ ...node })));
    this.selectedNodeId.set(null);
    this.expandedNodeIds.set(new Set());
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
    const nextX = Math.max(90, Math.min(910, position.x - this.dragState.offsetX));
    const nextY = Math.max(70, Math.min(450, position.y - this.dragState.offsetY));

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

  nodeFill(node: ObjetivoNode): string {
    if (this.selectedNodeId() === node.id) return '#1351b4';
    return node.planejamento === 'SUPERIOR' ? '#dbe8fb' : '#d7f4dd';
  }

  nodeStroke(node: ObjetivoNode): string {
    if (this.selectedNodeId() === node.id) return '#071d41';
    return node.planejamento === 'SUPERIOR' ? '#1351b4' : '#216e39';
  }

  private getSvgRelativePosition(event: PointerEvent): { x: number; y: number } {
    const svg = this.svgRef.nativeElement;
    const rect = svg.getBoundingClientRect();
    const scaleX = 1000 / rect.width;
    const scaleY = 520 / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
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
}
