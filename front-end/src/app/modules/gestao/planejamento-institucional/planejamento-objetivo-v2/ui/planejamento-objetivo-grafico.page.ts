import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
  untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { firstValueFrom } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { NavigateService } from 'src/app/services/navigate.service';
import { PlanejamentoObjetivoEsforcoApiClient, type EsforcoObjetivoNodeApi, type ObjetivoEntregasListagemApi } from '../infra/planejamento-objetivo-esforco-api.client';

type ObjetivoGrafoDadosRow = {
  objetivo_id: string;
  objetivo_nome: string;
  planejamento_nome: string;
  planejamento_superior_id?: string | null;
  total_entregas: number;
  esforco_proprio?: number;
  esforco_total_horas: number;
  objetivo_pai_id?: string | null;
  objetivo_superior_id?: string | null;
};

type ObjetivoNode = {
  id: string;
  nome: string;
  planejamentoNome: string;
  planejamentoEhPai: boolean;
  entregasCount: number;
  /** Horas só do próprio nó (API `esforco_proprio`). */
  esforcoProprioHoras: number;
  esforcoTotalHoras: number;
  parentId?: string;
  objetivoSuperiorId?: string;
  /** Camada no layout; 0 = raiz consultado, negativo = ancestrais, positivo = descendentes. */
  layer: number;
  /** Marca o nó que originou a consulta para receber destaque visual. */
  isQueriedRoot: boolean;
  x: number;
  y: number;
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

const CARD_W = 176;
const CARD_H = 96;
const CARD_HALF_W = CARD_W / 2;
const CARD_HALF_H = CARD_H / 2;
const GRAPH_MIN_W = 1280;
const GRAPH_MIN_H = 760;
const GRAPH_PADDING_X = CARD_HALF_W + 28;
const GRAPH_PADDING_Y = CARD_HALF_H + 36;
const GRAPH_LAYER_X_SPACING = CARD_W + 85;
const GRAPH_NODE_Y_SPACING = CARD_H + 26;
const GRAPH_FIT_PADDING_X = 90;
const GRAPH_FIT_PADDING_Y = 70;
/** Recua o fim da aresta para a ponta da seta ficar fora do retângulo do nó. */
const EDGE_END_ARROW_INSET = 16;
/** Passagens alternadas do barycenter (redução de cruzamentos nas arestas). */
const BARYCENTER_SWEEP_ITERATIONS = 10;
/** Rota interna do módulo de gestão para reabrir o gráfico a outro objetivo (alinhado à listagem). */
const ROTA_GRAFICOS = ['gestao', 'planejamento', 'objetivo-grafico'] as const;
const PLANEJAMENTO_PALETTE: PlanejamentoColor[] = [
  { fill: '#dbe8fb', stroke: '#1351b4' },
  { fill: '#ede7f6', stroke: '#5e35b1' },
  { fill: '#d7f4dd', stroke: '#216e39' },
  { fill: '#fff2cc', stroke: '#9c6f00' },
  { fill: '#fde2e2', stroke: '#b3261e' },
  { fill: '#dff7f6', stroke: '#0f766e' }
];

@Component({
  selector: 'app-planejamento-objetivo-grafico-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './planejamento-objetivo-grafico.page.html',
  styleUrl: './planejamento-objetivo-grafico.page.scss'
})
export class PlanejamentoObjetivoGraficoPage {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly esforcoApi = inject(PlanejamentoObjetivoEsforcoApiClient);
  private readonly go = inject(NavigateService);

  @ViewChild('svgRef', { static: false }) svgRef?: ElementRef<SVGSVGElement>;

  /** Posições arrastadas pelo usuário (persistem ao mudar filtro/zoom até trocar objetivo ou resetar). */
  private readonly layoutOverrides = signal<Map<string, { x: number; y: number }>>(new Map());
  private previousRouteObjetivoId: string | null = null;

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  /** Linhas vindas da API; `undefined` = ainda não carregou ou em carga inicial. */
  readonly graficoDados = signal<ObjetivoGrafoDadosRow[] | undefined>(undefined);
  /** UUID do objetivo que disparou a consulta — usado para ancorar o layout e o destaque. */
  readonly queriedObjetivoId = signal<string | null>(null);

  readonly cardW = CARD_W;
  readonly cardH = CARD_H;
  readonly cardHalfW = CARD_HALF_W;
  readonly cardHalfH = CARD_HALF_H;

  /** Deslocamento da viewport em coordenadas do grafo (arrastar o fundo). */
  readonly panX = signal(0);
  readonly panY = signal(0);

  private readonly graphLayoutModel = computed(() => {
    const rows = this.graficoDados();
    if (rows === undefined) {
      return { nodes: [] as ObjetivoNode[], width: GRAPH_MIN_W, height: GRAPH_MIN_H };
    }
    return this.buildGraphLayoutFromDados(rows, this.queriedObjetivoId());
  });

  readonly fullNodeList = computed(() => this.graphLayoutModel().nodes);

  readonly graphCanvasW = computed(() => this.graphLayoutModel().width);

  readonly graphCanvasH = computed(() => this.graphLayoutModel().height);

  readonly planejamentoColorsMap = computed(() => this.buildPlanejamentoColors(this.fullNodeList()));

  readonly nodes = signal<ObjetivoNode[]>([]);
  readonly zoom = signal(1);
  readonly showPaiRelations = signal(true);
  readonly showSuperiorRelations = signal(true);
  readonly selectedNodeId = signal<string | null>(null);
  readonly expandedNodeIds = signal<Set<string>>(new Set());
  readonly planejamentoFilter = signal<string>('ALL');
  readonly maxNodes = signal<number>(50);
  readonly maxNodesOptions = [18, 30, 50, 75, 100, 150];

  readonly entregasResposta = signal<ObjetivoEntregasListagemApi | null>(null);
  readonly entregasLoading = signal(false);
  readonly entregasError = signal<string | null>(null);
  readonly entregasPainelAberto = signal(false);
  readonly planejamentoOptions = computed(() => ['ALL', ...new Set(this.fullNodeList().map(node => node.planejamentoNome))]);
  readonly planejamentosLegenda = computed(() =>
    [...new Set(this.nodes().map(node => node.planejamentoNome))].map(nome => ({
      nome,
      color: this.planejamentoColor(nome)
    }))
  );
  readonly viewBox = computed<GraphViewBox>(() => {
    const zoom = this.zoom();
    const cw = this.graphCanvasW();
    const ch = this.graphCanvasH();
    const fitted = this.fitViewBoxToVisibleNodes();
    const baseWidth = fitted?.width ?? cw;
    const baseHeight = fitted?.height ?? ch;
    const centerX = fitted ? fitted.x + fitted.width / 2 : cw / 2;
    const centerY = fitted ? fitted.y + fitted.height / 2 : ch / 2;
    const width = baseWidth / zoom;
    const height = baseHeight / zoom;

    return {
      x: centerX - width / 2 + this.panX(),
      y: centerY - height / 2 + this.panY(),
      width,
      height
    };
  });
  readonly viewBoxString = computed(() => {
    const viewBox = this.viewBox();
    return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
  });

  private dragState: { nodeId: string; offsetX: number; offsetY: number } | null = null;

  private panDrag: {
    startClientX: number    
    startClientY: number    
    originPanX: number    
    originPanY: number    
  } | null = null;

  constructor() {
    effect(
      () => {
        const source = this.fullNodeList();
        untracked(() => this.applyDisplayFiltersFromSource(source));
      },
      { allowSignalWrites: true }
    );
    untracked(() => this.applyDisplayFiltersFromSource(this.fullNodeList()));

    this.route.paramMap
      .pipe(
        map(pm => pm.get('id')?.trim() ?? ''),
        filter(id => id.length > 0),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(id => void this.carregarPorId(id));
  }

  /** Base do conjunto visível: objetivo consultado + vizinhos diretos (arestas ativas). */
  readonly rootNodeIds = computed<string[]>(() => {
    const nodes = this.nodes();
    if (nodes.length === 0) {
      return [];
    }

    const qid = this.queriedObjetivoId();
    const queried =
      (qid ? nodes.find(n => n.id === qid) : undefined) ?? nodes.find(n => n.isQueriedRoot) ?? nodes[0];

    const rootId = queried.id;
    const ids = new Set<string>([rootId]);
    for (const neighborId of this.getNodeNeighbors(rootId)) {
      ids.add(neighborId);
    }

    return [...ids];
  });

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
    const nodes = this.nodes();
    const visible = new Set<string>(this.rootNodeIds());
    const expanded = this.expandedNodeIds();

    for (const nodeId of expanded) {
      visible.add(nodeId);
      for (const neighbor of this.getNodeNeighbors(nodeId)) {
        visible.add(neighbor);
      }
    }

    if (nodes.length > 0) {
      const byId = new Map(nodes.map(n => [n.id, n]));
      for (const ancestorId of this.collectTransitiveAncestorIds([...visible], byId)) {
        visible.add(ancestorId);
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
    if (!selectedId) {
      return { parents: [], children: [], childrenSuperior: [], superiores: [] } as const;
    }

    const nodes = this.nodes();
    const byId = new Map(nodes.map(node => [node.id, node]));
    const selected = byId.get(selectedId);
    if (!selected) {
      return { parents: [], children: [], childrenSuperior: [], superiores: [] } as const;
    }

    const parents = selected.parentId && byId.get(selected.parentId) ? [byId.get(selected.parentId)!] : [];
    const children = nodes.filter(node => node.parentId === selected.id);
    const childrenSuperior = nodes.filter(node => node.objetivoSuperiorId === selected.id);
    const superiores = selected.objetivoSuperiorId && byId.get(selected.objetivoSuperiorId)
      ? [byId.get(selected.objetivoSuperiorId)!]
      : [];

    return { parents, children, childrenSuperior, superiores } as const;
  });

  private static resolveSuperiorId(node: EsforcoObjetivoNodeApi): string | null {
    if (node.objetivo_superior_id?.length) {
      return node.objetivo_superior_id;
    }
    return node.objetivo_superior?.id?.length ? node.objetivo_superior.id : null;
  }

  private static resolvePaiId(node: EsforcoObjetivoNodeApi): string | null {
    if (node.objetivo_pai_id?.length) {
      return node.objetivo_pai_id;
    }
    return node.objetivo_pai?.id?.length ? node.objetivo_pai.id : null;
  }

  private static mapaEsforcoParaGrafo(data: Record<string, EsforcoObjetivoNodeApi>): ObjetivoGrafoDadosRow[] {
    const rows: ObjetivoGrafoDadosRow[] = Object.values(data).map(node => ({
      objetivo_id: node.objetivo_id,
      objetivo_nome: node.objetivo_nome,
      planejamento_nome: node.planejamento_nome,
      planejamento_superior_id: null,
      total_entregas: node.total_entregas ?? 0,
      esforco_proprio: node.esforco_proprio ?? 0,
      esforco_total_horas: node.esforco_total_horas ?? 0,
      objetivo_pai_id: PlanejamentoObjetivoGraficoPage.resolvePaiId(node),
      objetivo_superior_id: PlanejamentoObjetivoGraficoPage.resolveSuperiorId(node)
    }));

    return PlanejamentoObjetivoGraficoPage.enriquecerPlanejamentoSuperior(rows);
  }

  private static enriquecerPlanejamentoSuperior(rows: ObjetivoGrafoDadosRow[]): ObjetivoGrafoDadosRow[] {
    const nomes = [...new Set(rows.map(r => r.planejamento_nome))].sort();
    if (nomes.length <= 1) {
      return rows.map(r => ({ ...r, planejamento_superior_id: null }));
    }
    const raiz = nomes[0];
    return rows.map(r => ({
      ...r,
      planejamento_superior_id: r.planejamento_nome === raiz ? null : '1'
    }));
  }

  /**
   * Abre este mesmo gráfico ancorado em outro objetivo (nova subárvore/fechamento da API).
   */
  abrirGrafoOutroObjetivo(objetivoId: string, event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
    if (!objetivoId?.length) return;
    void this.go.navigate({ route: [...ROTA_GRAFICOS, objetivoId] });
  }

  private async carregarPorId(id: string): Promise<void> {
    if (this.previousRouteObjetivoId !== null && this.previousRouteObjetivoId !== id) {
      this.layoutOverrides.set(new Map());
      this.panX.set(0);
      this.panY.set(0);
    }
    this.previousRouteObjetivoId = id;

    if (!id?.length) {
      this.loadError.set('Identificador do objetivo não informado.');
      this.queriedObjetivoId.set(null);
      this.graficoDados.set([]);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.loadError.set(null);
    this.queriedObjetivoId.set(id);
    this.graficoDados.set(undefined);

    try {
      const map = await firstValueFrom(this.esforcoApi.getEsforcoTotal(id));
      this.graficoDados.set(PlanejamentoObjetivoGraficoPage.mapaEsforcoParaGrafo(map));
    } catch (err: unknown) {
      let msg = 'Não foi possível carregar o gráfico.';
      if (err instanceof HttpErrorResponse) {
        const body = err.error as { error?: string } | undefined;
        msg = (typeof body?.error === 'string' ? body.error : err.message) || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      this.loadError.set(msg);
      this.graficoDados.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  selectNode(nodeId: string) {
    if (this.selectedNodeId() !== nodeId) {
      this.resetPainelEntregas();
    }
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
    this.layoutOverrides.set(new Map());
    this.applyDisplayFilters();
  }

  zoomIn() {
    this.zoom.update(value => Math.min(1.6, Number((value + 0.1).toFixed(2))));
  }

  zoomOut() {
    this.zoom.update(value => Math.max(0.55, Number((value - 0.1).toFixed(2))));
  }

  resetZoom() {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  /**
   * Formata horas para exibição compacta nos nós (até 2 decimais, sem lixo visual).
   */
  formatHoras(value: number): string {
    if (!Number.isFinite(value)) {
      return '0';
    }
    const rounded = Math.round(value * 100) / 100;
    return rounded.toLocaleString('pt-BR', { maximumFractionDigits: 2, useGrouping: true });
  }

  /**
   * Horas nos cartões do SVG: sem agrupamento de milhar, reduz quebras feias no foreignObject.
   */
  formatHorasGrafico(value: number): string {
    if (!Number.isFinite(value)) {
      return '0';
    }
    const rounded = Math.round(value * 100) / 100;
    return rounded.toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      useGrouping: false
    });
  }

  formatPercent(value: number): string {
    if (!Number.isFinite(value)) {
      return '0%';
    }
    const rounded = Math.round(value * 100) / 100;
    return `${rounded.toLocaleString('pt-BR', { maximumFractionDigits: 2, useGrouping: true })}%`;
  }

  textoTooltipEntregas(count: number): string {
    const n = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
    return n === 1 ? '1 entrega no plano de entregas' : `${n} entregas no plano de entregas`;
  }

  togglePainelEntregas(): void {
    this.entregasPainelAberto.update(v => !v);
  }

  onPanBackgroundDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.panDrag = {
      startClientX: event.clientX,
      startClientY: event.clientY,
      originPanX: this.panX(),
      originPanY: this.panY()
    };
  }

  async carregarEntregasDetalhe(): Promise<void> {
    const id = this.selectedNodeId();
    if (!id?.length) {
      return;
    }
    this.entregasLoading.set(true);
    this.entregasError.set(null);
    try {
      const data = await firstValueFrom(this.esforcoApi.getEntregasPorObjetivo(id));
      this.entregasResposta.set(data);
      this.entregasPainelAberto.set(true);
    } catch (err: unknown) {
      let msg = 'Não foi possível carregar as entregas.';
      if (err instanceof HttpErrorResponse) {
        const body = err.error as { error?: string } | undefined;
        msg = (typeof body?.error === 'string' ? body.error : err.message) || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      this.entregasError.set(msg);
      this.entregasResposta.set(null);
    } finally {
      this.entregasLoading.set(false);
    }
  }

  private resetPainelEntregas(): void {
    this.entregasResposta.set(null);
    this.entregasError.set(null);
    this.entregasLoading.set(false);
    this.entregasPainelAberto.set(false);
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
    this.resetPainelEntregas();
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
    if (this.panDrag) {
      const svg = this.svgRef?.nativeElement;
      if (!svg) {
        return;
      }
      const rect = svg.getBoundingClientRect();
      const viewBox = this.viewBox();
      const scaleX = viewBox.width / rect.width;
      const scaleY = viewBox.height / rect.height;
      const dx = event.clientX - this.panDrag.startClientX;
      const dy = event.clientY - this.panDrag.startClientY;
      this.panX.set(this.panDrag.originPanX - dx * scaleX);
      this.panY.set(this.panDrag.originPanY - dy * scaleY);
      return;
    }

    if (!this.dragState) return;

    const position = this.getSvgRelativePosition(event);
    const cw = this.graphCanvasW();
    const ch = this.graphCanvasH();
    const nextX = Math.max(CARD_HALF_W, Math.min(cw - CARD_HALF_W, position.x - this.dragState.offsetX));
    const nextY = Math.max(CARD_HALF_H, Math.min(ch - CARD_HALF_H, position.y - this.dragState.offsetY));

    this.nodes.update(nodes =>
      nodes.map(node =>
        node.id === this.dragState!.nodeId ? { ...node, x: nextX, y: nextY } : node
      )
    );
  }

  @HostListener('window:pointerup', ['$event'])
  onWindowPointerUp(event: PointerEvent) {
    const pan = this.panDrag;
    if (pan) {
      const dx = event.clientX - pan.startClientX;
      const dy = event.clientY - pan.startClientY;
      const moved = Math.hypot(dx, dy) > 6;
      this.panDrag = null;
      if (!moved) {
        this.clearSelection();
      }
    }

    if (this.dragState) {
      const nodeId = this.dragState.nodeId;
      const node = this.nodes().find(n => n.id === nodeId);
      if (node) {
        this.layoutOverrides.update(map => {
          const next = new Map(map);
          next.set(nodeId, { x: node.x, y: node.y });
          return next;
        });
      }
    }
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

    let x1 = source.x + sourceOffset.x;
    let y1 = source.y + sourceOffset.y;
    let x2 = target.x - targetOffset.x;
    let y2 = target.y - targetOffset.y;

    const segLen = Math.hypot(x2 - x1, y2 - y1);
    if (segLen > 1e-3) {
      const ux = (x2 - x1) / segLen;
      const uy = (y2 - y1) / segLen;
      const inset = Math.min(EDGE_END_ARROW_INSET, segLen * 0.4);
      x2 -= ux * inset;
      y2 -= uy * inset;
    }

    return { x1, y1, x2, y2 };
  }

  /**
   * Curva Bézier cúbica entre os pontos de saída/entrada do cartão (menos cruzamentos visuais que segmento reto).
   * Arestas SUPERIOR recebem leve deslocamento perpendicular para separar de PAI quando compartilham o mesmo par.
   */
  edgePath(edge: ObjetivoEdge, source: ObjetivoNode, target: ObjetivoNode): string {
    const seg = this.edgeSegment(source, target);
    let { x1, y1, x2, y2 } = seg;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const bendPx = edge.type === 'SUPERIOR' ? 28 : 0;
    const ox = (-dy / len) * bendPx;
    const oy = (dx / len) * bendPx;
    x1 += ox * 0.35;
    y1 += oy * 0.35;
    x2 += ox * 0.65;
    y2 += oy * 0.65;

    const t = 0.42;
    const cx1 = x1 + dx * t;
    const cy1 = y1;
    const cx2 = x2 - dx * t;
    const cy2 = y2;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  edgeTitle(edge: ObjetivoEdge, source: ObjetivoNode, target: ObjetivoNode): string {
    if (edge.type === 'PAI') {
      return `Filho -> pai: ${source.nome} -> ${target.nome}`;
    }

    return `Objetivo relacionado -> objetivo superior: ${source.nome} -> ${target.nome}`;
  }

  private fitViewBoxToVisibleNodes(): GraphViewBox | null {
    const nodes = this.nodes();
    if (nodes.length === 0) {
      return null;
    }

    const minX = Math.min(...nodes.map(node => node.x - CARD_HALF_W));
    const maxX = Math.max(...nodes.map(node => node.x + CARD_HALF_W));
    const minY = Math.min(...nodes.map(node => node.y - CARD_HALF_H));
    const maxY = Math.max(...nodes.map(node => node.y + CARD_HALF_H));

    const x = Math.max(0, minX - GRAPH_FIT_PADDING_X);
    const y = Math.max(0, minY - GRAPH_FIT_PADDING_Y);
    const right = Math.min(this.graphCanvasW(), maxX + GRAPH_FIT_PADDING_X);
    const bottom = Math.min(this.graphCanvasH(), maxY + GRAPH_FIT_PADDING_Y);

    return {
      x,
      y,
      width: Math.max(CARD_W + GRAPH_FIT_PADDING_X * 2, right - x),
      height: Math.max(CARD_H + GRAPH_FIT_PADDING_Y * 2, bottom - y)
    };
  }

  nodeFill(node: ObjetivoNode): string {
    if (node.isQueriedRoot) return '#fff4cc';
    return this.planejamentoColor(node.planejamentoNome).fill;
  }

  nodeStroke(node: ObjetivoNode): string {
    if (node.isQueriedRoot) return '#9c6f00';
    if (this.selectedNodeId() === node.id) return '#071d41';
    return this.planejamentoColor(node.planejamentoNome).stroke;
  }

  nodeStrokeWidth(node: ObjetivoNode): number {
    return node.isQueriedRoot ? 3.5 : 2.5;
  }

  planejamentoColor(nome: string): PlanejamentoColor {
    return this.planejamentoColorsMap().get(nome) ?? PLANEJAMENTO_PALETTE[0];
  }

  private getSvgRelativePosition(event: PointerEvent): { x: number; y: number } {
    const svg = this.svgRef?.nativeElement;
    if (!svg) {
      return { x: 0, y: 0 };
    }
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

  private aplicarLayoutOverrides(nodes: ObjetivoNode[]): ObjetivoNode[] {
    const ov = this.layoutOverrides();
    if (ov.size === 0) return nodes;
    return nodes.map(node => {
      const p = ov.get(node.id);
      return p ? { ...node, x: p.x, y: p.y } : node;
    });
  }

  private buildGraphLayoutFromDados(
    dados: ObjetivoGrafoDadosRow[],
    queriedRootId: string | null
  ): { nodes: ObjetivoNode[]; width: number; height: number } {
    const objetivos = dados.filter(
      item => item.objetivo_id?.length && item.objetivo_nome?.length && item.planejamento_nome?.length
    );
    if (objetivos.length === 0) {
      return { nodes: [], width: GRAPH_MIN_W, height: GRAPH_MIN_H };
    }

    const planejamentoEhPaiByNome = this.buildPlanejamentoParentFlag(objetivos);
    const idsValidos = new Set(objetivos.map(item => item.objetivo_id));
    const rootId = this.escolherRaizConsulta(queriedRootId, objetivos, idsValidos);

    const drafts = new Map<string, Omit<ObjetivoNode, 'x' | 'y' | 'layer' | 'isQueriedRoot'>>(
      objetivos.map(item => [
        item.objetivo_id,
        {
          id: item.objetivo_id,
          nome: item.objetivo_nome,
          planejamentoNome: item.planejamento_nome,
          planejamentoEhPai: planejamentoEhPaiByNome.get(item.planejamento_nome) ?? true,
          entregasCount: item.total_entregas ?? 0,
          esforcoProprioHoras: item.esforco_proprio ?? 0,
          esforcoTotalHoras: item.esforco_total_horas ?? 0,
          parentId: idsValidos.has(item.objetivo_pai_id ?? '') ? item.objetivo_pai_id ?? undefined : undefined,
          objetivoSuperiorId: idsValidos.has(item.objetivo_superior_id ?? '')
            ? item.objetivo_superior_id ?? undefined
            : undefined
        }
      ])
    );

    const filhosPorId = this.buildAdjacenciaFilhos(drafts);
    const layers = this.assignLayers(rootId, drafts, filhosPorId);
    const posicoes = this.ordenarPorBarycenterIterado(layers, drafts);

    const canvasW = this.canvasWidthForLayers(layers.minLayer, layers.maxLayer);
    const canvasH = this.canvasHeightForLayers(posicoes.totalByLayer);

    const nodes: ObjetivoNode[] = objetivos.map(item => {
      const draft = drafts.get(item.objetivo_id);
      if (!draft) {
        return {
          id: item.objetivo_id,
          nome: item.objetivo_nome,
          planejamentoNome: item.planejamento_nome,
          planejamentoEhPai: planejamentoEhPaiByNome.get(item.planejamento_nome) ?? true,
          entregasCount: item.total_entregas ?? 0,
          esforcoProprioHoras: item.esforco_proprio ?? 0,
          esforcoTotalHoras: item.esforco_total_horas ?? 0,
          parentId: undefined,
          objetivoSuperiorId: undefined,
          layer: 0,
          isQueriedRoot: false,
          x: canvasW / 2,
          y: canvasH / 2
        };
      }

      const layer = layers.layerById.get(draft.id) ?? 0;
      const posicaoEmCamada = posicoes.indexByNodeId.get(draft.id) ?? 0;
      const tamanhoCamada = posicoes.totalByLayer.get(layer) ?? 1;

      return {
        ...draft,
        layer,
        isQueriedRoot: draft.id === rootId,
        x: this.xByLayer(layer, layers.minLayer, layers.maxLayer, canvasW),
        y: this.yByIndexInLayer(posicaoEmCamada, tamanhoCamada, canvasH)
      };
    });

    return { nodes, width: canvasW, height: canvasH };
  }

  private buildPlanejamentoParentFlag(objetivos: ObjetivoGrafoDadosRow[]): Map<string, boolean> {
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

  private escolherRaizConsulta(
    queriedRootId: string | null,
    objetivos: ObjetivoGrafoDadosRow[],
    idsValidos: Set<string>
  ): string {
    if (queriedRootId && idsValidos.has(queriedRootId)) {
      return queriedRootId;
    }
    const orphan = objetivos.find(item => !item.objetivo_pai_id && !item.objetivo_superior_id);
    return orphan?.objetivo_id ?? objetivos[0].objetivo_id;
  }

  private buildAdjacenciaFilhos(
    drafts: Map<string, Omit<ObjetivoNode, 'x' | 'y' | 'layer' | 'isQueriedRoot'>>
  ): Map<string, string[]> {
    const filhos = new Map<string, string[]>();
    for (const draft of drafts.values()) {
      if (draft.parentId) {
        const arr = filhos.get(draft.parentId) ?? [];
        arr.push(draft.id);
        filhos.set(draft.parentId, arr);
      }
      if (draft.objetivoSuperiorId) {
        const arr = filhos.get(draft.objetivoSuperiorId) ?? [];
        arr.push(draft.id);
        filhos.set(draft.objetivoSuperiorId, arr);
      }
    }
    return filhos;
  }

  private assignLayers(
    rootId: string,
    drafts: Map<string, Omit<ObjetivoNode, 'x' | 'y' | 'layer' | 'isQueriedRoot'>>,
    filhosPorId: Map<string, string[]>
  ): { layerById: Map<string, number>; minLayer: number; maxLayer: number } {
    const layerById = new Map<string, number>();
    layerById.set(rootId, 0);
    const queue: string[] = [rootId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentLayer = layerById.get(currentId)!;
      const current = drafts.get(currentId);
      if (!current) continue;

      if (current.parentId && drafts.has(current.parentId) && !layerById.has(current.parentId)) {
        layerById.set(current.parentId, currentLayer - 1);
        queue.push(current.parentId);
      }
      if (
        current.objetivoSuperiorId &&
        drafts.has(current.objetivoSuperiorId) &&
        !layerById.has(current.objetivoSuperiorId)
      ) {
        layerById.set(current.objetivoSuperiorId, currentLayer - 1);
        queue.push(current.objetivoSuperiorId);
      }
      for (const childId of filhosPorId.get(currentId) ?? []) {
        if (!layerById.has(childId)) {
          layerById.set(childId, currentLayer + 1);
          queue.push(childId);
        }
      }
    }

    let minLayer = 0;
    let maxLayer = 0;
    for (const value of layerById.values()) {
      if (value < minLayer) minLayer = value;
      if (value > maxLayer) maxLayer = value;
    }

    for (const id of drafts.keys()) {
      if (!layerById.has(id)) {
        maxLayer += 1;
        layerById.set(id, maxLayer);
      }
    }

    return { layerById, minLayer, maxLayer };
  }

  /**
   * Várias passagens alternadas (para baixo / para cima) reduzem cruzamentos entre arestas (heurística Sugiyama simplificada).
   */
  private ordenarPorBarycenterIterado(
    layers: { layerById: Map<string, number>; minLayer: number; maxLayer: number },
    drafts: Map<string, Omit<ObjetivoNode, 'x' | 'y' | 'layer' | 'isQueriedRoot'>>
  ): { indexByNodeId: Map<string, number>; totalByLayer: Map<number, number> } {
    const byLayer = new Map<number, string[]>();
    for (const [id, layer] of layers.layerById) {
      const arr = byLayer.get(layer) ?? [];
      arr.push(id);
      byLayer.set(layer, arr);
    }

    const indexByNodeId = new Map<string, number>();
    const totalByLayer = new Map<number, number>();

    for (let l = layers.minLayer; l <= layers.maxLayer; l++) {
      const ids = (byLayer.get(l) ?? [])
        .slice()
        .sort((a, b) => (drafts.get(a)?.nome ?? '').localeCompare(drafts.get(b)?.nome ?? ''));
      byLayer.set(l, ids);
      ids.forEach((id, idx) => indexByNodeId.set(id, idx));
      totalByLayer.set(l, ids.length);
    }

    for (let iter = 0; iter < BARYCENTER_SWEEP_ITERATIONS; iter++) {
      for (let l = layers.minLayer + 1; l <= layers.maxLayer; l++) {
        const ids = (byLayer.get(l) ?? []).slice();
        ids.sort((a, b) => this.compararPorBarycenter(a, b, drafts, indexByNodeId, 'up'));
        byLayer.set(l, ids);
        ids.forEach((id, idx) => indexByNodeId.set(id, idx));
      }
      for (let l = layers.maxLayer - 1; l >= layers.minLayer; l--) {
        const ids = (byLayer.get(l) ?? []).slice();
        ids.sort((a, b) => this.compararPorBarycenter(a, b, drafts, indexByNodeId, 'down'));
        byLayer.set(l, ids);
        ids.forEach((id, idx) => indexByNodeId.set(id, idx));
      }
    }

    for (let l = layers.minLayer; l <= layers.maxLayer; l++) {
      totalByLayer.set(l, (byLayer.get(l) ?? []).length);
    }

    return { indexByNodeId, totalByLayer };
  }

  private compararPorBarycenter(
    aId: string,
    bId: string,
    drafts: Map<string, Omit<ObjetivoNode, 'x' | 'y' | 'layer' | 'isQueriedRoot'>>,
    indexByNodeId: Map<string, number>,
    sentido: 'up' | 'down'
  ): number {
    const aBary = this.barycenter(aId, drafts, indexByNodeId, sentido);
    const bBary = this.barycenter(bId, drafts, indexByNodeId, sentido);
    if (aBary !== bBary) return aBary - bBary;
    const aNome = drafts.get(aId)?.nome ?? '';
    const bNome = drafts.get(bId)?.nome ?? '';
    return aNome.localeCompare(bNome);
  }

  private barycenter(
    nodeId: string,
    drafts: Map<string, Omit<ObjetivoNode, 'x' | 'y' | 'layer' | 'isQueriedRoot'>>,
    indexByNodeId: Map<string, number>,
    sentido: 'up' | 'down'
  ): number {
    const node = drafts.get(nodeId);
    if (!node) return Number.POSITIVE_INFINITY;

    const ancorPositions: number[] = [];

    if (sentido === 'up') {
      if (node.parentId !== undefined) {
        const pos = indexByNodeId.get(node.parentId);
        if (pos !== undefined) ancorPositions.push(pos);
      }
      if (node.objetivoSuperiorId !== undefined) {
        const pos = indexByNodeId.get(node.objetivoSuperiorId);
        if (pos !== undefined) ancorPositions.push(pos);
      }
    } else {
      for (const other of drafts.values()) {
        if (other.parentId === nodeId || other.objetivoSuperiorId === nodeId) {
          const pos = indexByNodeId.get(other.id);
          if (pos !== undefined) ancorPositions.push(pos);
        }
      }
    }

    if (ancorPositions.length === 0) return Number.POSITIVE_INFINITY;
    return ancorPositions.reduce((sum, value) => sum + value, 0) / ancorPositions.length;
  }

  private xByLayer(layer: number, minLayer: number, maxLayer: number, canvasW: number): number {
    const totalLayers = maxLayer - minLayer + 1;
    if (totalLayers <= 1) return canvasW / 2;
    const clusterWidth = (totalLayers - 1) * GRAPH_LAYER_X_SPACING;
    const startX = (canvasW - clusterWidth) / 2;

    return startX + (layer - minLayer) * GRAPH_LAYER_X_SPACING;
  }

  private yByIndexInLayer(index: number, total: number, canvasH: number): number {
    void total;
    void canvasH;

    return GRAPH_PADDING_Y + index * GRAPH_NODE_Y_SPACING;
  }

  private canvasWidthForLayers(minLayer: number, maxLayer: number): number {
    const totalLayers = maxLayer - minLayer + 1;
    if (totalLayers <= 1) {
      return GRAPH_MIN_W;
    }

    return Math.max(GRAPH_MIN_W, GRAPH_PADDING_X * 2 + (totalLayers - 1) * GRAPH_LAYER_X_SPACING);
  }

  private canvasHeightForLayers(totalByLayer: Map<number, number>): number {
    const maxNodesInLayer = Math.max(1, ...totalByLayer.values());
    if (maxNodesInLayer <= 1) {
      return GRAPH_MIN_H;
    }

    return Math.max(GRAPH_MIN_H, GRAPH_PADDING_Y * 2 + (maxNodesInLayer - 1) * GRAPH_NODE_Y_SPACING);
  }

  private buildPlanejamentoColors(nodes: ObjetivoNode[]): Map<string, PlanejamentoColor> {
    const planejamentoNomes = [...new Set(nodes.map(node => node.planejamentoNome))].sort();

    return new Map(
      planejamentoNomes.map((nome, index) => [nome, PLANEJAMENTO_PALETTE[index % PLANEJAMENTO_PALETTE.length]])
    );
  }

  private applyDisplayFilters() {
    this.applyDisplayFiltersFromSource(this.fullNodeList());
  }

  /**
   * Sobe por `parentId` e `objetivoSuperiorId` enquanto o alvo existir no mapa,
   * para não cortar pai/avô de um nó que entrou como superior ou vizinho da raiz.
   */
  private collectTransitiveAncestorIds(seedIds: readonly string[], byId: Map<string, ObjetivoNode>): Set<string> {
    const ancestors = new Set<string>();
    const queue = [...seedIds];

    while (queue.length > 0) {
      const id = queue.pop()!;
      const node = byId.get(id);
      if (!node) {
        continue;
      }

      const pai = node.parentId;
      if (pai && byId.has(pai) && !ancestors.has(pai)) {
        ancestors.add(pai);
        queue.push(pai);
      }

      const sup = node.objetivoSuperiorId;
      if (sup && byId.has(sup) && !ancestors.has(sup)) {
        ancestors.add(sup);
        queue.push(sup);
      }
    }

    return ancestors;
  }

  /**
   * Desce por `parentId` e `objetivoSuperiorId` para manter visíveis os planejamentos inferiores
   * vinculados ao objetivo aberto, mesmo quando há muitos filhos diretos no planejamento atual.
   */
  private collectTransitiveDescendantIds(seedIds: readonly string[], byId: Map<string, ObjetivoNode>): Set<string> {
    const descendants = new Set<string>();
    const queue = [...seedIds];

    while (queue.length > 0) {
      const id = queue.shift()!;

      for (const node of byId.values()) {
        if (node.parentId !== id && node.objetivoSuperiorId !== id) {
          continue;
        }
        if (descendants.has(node.id)) {
          continue;
        }

        descendants.add(node.id);
        queue.push(node.id);
      }
    }

    return descendants;
  }

  private applyDisplayFiltersFromSource(allNodes: ObjetivoNode[]) {
    const planejamento = this.planejamentoFilter();
    const limit = Math.max(1, this.maxNodes());
    const queriedRoot = allNodes.find(node => node.isQueriedRoot);

    const filteredByPlanning =
      planejamento === 'ALL' ? allNodes : allNodes.filter(node => node.planejamentoNome === planejamento);

    const byId = new Map(filteredByPlanning.map(node => [node.id, node]));

    let limited: ObjetivoNode[];

    if (!queriedRoot) {
      limited = filteredByPlanning.slice(0, limit);
    } else {
      const rootInFilter = byId.get(queriedRoot.id);
      const rootNode = rootInFilter ?? queriedRoot;
      const rootId = queriedRoot.id;

      const neighbors: ObjetivoNode[] = [];
      const pushNeighbor = (node: ObjetivoNode | undefined) => {
        if (!node || node.id === rootId) return;
        neighbors.push(node);
      };

      if (queriedRoot.parentId) {
        pushNeighbor(byId.get(queriedRoot.parentId));
      }
      if (queriedRoot.objetivoSuperiorId) {
        pushNeighbor(byId.get(queriedRoot.objetivoSuperiorId));
      }
      for (const n of filteredByPlanning) {
        if (n.parentId === rootId) {
          neighbors.push(n);
        }
        if (n.objetivoSuperiorId === rootId) {
          neighbors.push(n);
        }
      }

      const seenNeighbor = new Set<string>();
      const uniqueNeighbors: ObjetivoNode[] = [];
      for (const n of neighbors) {
        if (seenNeighbor.has(n.id)) continue;
        seenNeighbor.add(n.id);
        uniqueNeighbors.push(n);
      }

      let core: ObjetivoNode[] = [rootNode, ...uniqueNeighbors.filter(n => n.id !== rootNode.id)];
      const seedIds = core.map(n => n.id);
      const ancestorIds = this.collectTransitiveAncestorIds(seedIds, byId);
      const descendantIds = this.collectTransitiveDescendantIds([rootId], byId);
      const seenCore = new Set(core.map(n => n.id));

      for (const did of descendantIds) {
        if (seenCore.has(did)) {
          continue;
        }
        const dn = byId.get(did);
        if (!dn) {
          continue;
        }
        seenCore.add(did);
        core.push(dn);
      }

      for (const aid of ancestorIds) {
        if (seenCore.has(aid)) {
          continue;
        }
        const an = byId.get(aid);
        if (!an) {
          continue;
        }
        seenCore.add(aid);
        core.push(an);
      }

      const coreIds = new Set(core.map(n => n.id));
      const rest = filteredByPlanning.filter(n => !coreIds.has(n.id));
      if (core.length <= limit) {
        limited = [...core, ...rest.slice(0, limit - core.length)];
      } else {
        // Mantém cadeia de ancestrais + núcleo mesmo acima do limite (evita “superior sem pai”).
        limited = [...core];
      }
    }

    const ids = new Set(limited.map(node => node.id));
    const normalized = limited.map(node => ({
      ...node,
      parentId: node.parentId && ids.has(node.parentId) ? node.parentId : undefined,
      objetivoSuperiorId:
        node.objetivoSuperiorId && ids.has(node.objetivoSuperiorId) ? node.objetivoSuperiorId : undefined
    }));

    const patched = this.aplicarLayoutOverrides(normalized);
    this.nodes.set(this.cloneNodes(patched));
    this.resetPainelEntregas();
    this.selectedNodeId.set(null);
    this.expandedNodeIds.set(new Set());
  }
}
