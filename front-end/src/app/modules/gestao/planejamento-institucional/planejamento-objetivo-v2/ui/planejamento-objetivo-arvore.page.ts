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
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { NavigateService } from 'src/app/services/navigate.service';
import {
  PlanejamentoObjetivoEsforcoApiClient,
  type ObjetivoArvoreVisualizacaoApi,
  type ObjetivoEntregasListagemApi,
  type ObjetivoEquipesListagemApi
} from '../infra/planejamento-objetivo-esforco-api.client';

type TreeNodeVm = {
  id: string;
  nome: string;
  planejamentoNome: string;
  entregasCount: number;
  esforcoProprioHoras: number;
  esforcoTotalHoras: number;
  filhosPai: string[];
  objetivoSuperiorId: string | null;
  isRaiz: boolean;
  depth: number;
  x: number;
  y: number;
  hasFilhos: boolean;
};

type SuperiorResumoVm = {
  id: string;
  objetivoId: string;
  nome: string;
  planejamentoNome: string;
  hierarquiaLinhas: string[];
  nivelSuperior: number;
  objetivoSuperiorId: string | null;
  ligadoAObjetivoId: string;
  x: number;
  y: number;
  height: number;
};

type EdgeVm = {
  key: string;
  type: 'PAI' | 'SUPERIOR';
  path: string;
};

const NODE_W = 200;
const NODE_H = 88;
const NODE_HALF_W = NODE_W / 2;
const NODE_HALF_H = NODE_H / 2;
const SUPERIOR_W = 220;
const LINE_H = 14;
const SUPERIOR_PAD = 28;
const SUPERIOR_HEADER = 36;
const H_GAP = 48;
const V_GAP = 32;
const CANVAS_PAD = 48;
const ROTA_ARVORE = ['gestao', 'planejamento', 'objetivo-arvore'] as const;

@Component({
  selector: 'app-planejamento-objetivo-arvore-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './planejamento-objetivo-arvore.page.html',
  styleUrl: './planejamento-objetivo-arvore.page.scss'
})
export class PlanejamentoObjetivoArvorePage {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(PlanejamentoObjetivoEsforcoApiClient);
  private readonly go = inject(NavigateService);

  @ViewChild('svgRef', { static: false }) svgRef?: ElementRef<SVGSVGElement>;

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly dados = signal<ObjetivoArvoreVisualizacaoApi | null>(null);
  readonly expandedIds = signal<Set<string>>(new Set());
  readonly selectedNodeId = signal<string | null>(null);
  readonly zoom = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);
  readonly entregasResposta = signal<ObjetivoEntregasListagemApi | null>(null);
  readonly entregasLoading = signal(false);
  readonly entregasError = signal<string | null>(null);
  readonly entregasPainelAberto = signal(false);
  readonly equipesResposta = signal<ObjetivoEquipesListagemApi | null>(null);
  readonly equipesLoading = signal(false);
  readonly equipesError = signal<string | null>(null);

  readonly nodeW = NODE_W;
  readonly nodeH = NODE_H;
  readonly nodeHalfW = NODE_HALF_W;
  readonly nodeHalfH = NODE_HALF_H;
  readonly superiorW = SUPERIOR_W;

  private panDrag: { startX: number; startY: number; originPanX: number; originPanY: number } | null = null;

  readonly layout = computed(() => this.buildLayout(this.dados(), this.expandedIds()));

  readonly treeNodes = computed(() => this.layout().treeNodes);
  readonly superiorResumos = computed(() => this.layout().superiorResumos);
  readonly edges = computed(() => this.layout().edges);
  readonly canvasW = computed(() => this.layout().width);
  readonly canvasH = computed(() => this.layout().height);

  readonly viewBoxString = computed(() => {
    const zoom = this.zoom();
    const cw = this.canvasW();
    const ch = this.canvasH();
    const w = Math.max(cw, 800) / zoom;
    const h = Math.max(ch, 500) / zoom;
    const cx = cw / 2 + this.panX();
    const cy = ch / 2 + this.panY();
    return `${cx - w / 2} ${cy - h / 2} ${w} ${h}`;
  });

  readonly selectedNode = computed(() => {
    const id = this.selectedNodeId();
    return id ? this.treeNodes().find(n => n.id === id) ?? null : null;
  });

  readonly equipesEsforcoTotal = computed(() => {
    const itens = this.equipesResposta()?.itens ?? [];
    return itens.reduce((acc, item) => acc + (Number.isFinite(item.esforco_horas_total) ? item.esforco_horas_total : 0), 0);
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map(pm => pm.get('id')?.trim() ?? ''),
        filter(id => id.length > 0),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(id => void this.carregar(id));
  }

  async carregar(id: string): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    this.expandedIds.set(new Set());
    this.selectedNodeId.set(null);
    this.panX.set(0);
    this.panY.set(0);
    this.zoom.set(1);
    this.resetPainelEntregas();
    this.resetPainelEquipes();

    try {
      const data = await firstValueFrom(this.api.getArvoreVisualizacao(id));
      this.dados.set(data);
    } catch (err: unknown) {
      this.dados.set(null);
      this.loadError.set(this.mensagemErro(err));
    } finally {
      this.loading.set(false);
    }
  }

  onNodeClick(nodeId: string, event: Event): void {
    event.stopPropagation();
    const nodeChanged = this.selectedNodeId() !== nodeId;
    if (nodeChanged) {
      this.resetPainelEntregas();
      this.resetPainelEquipes();
    }
    this.selectedNodeId.set(nodeId);
    if (nodeChanged) {
      void this.carregarEquipes(nodeId);
    }
    const node = this.dados()?.nos[nodeId];
    if (!node?.filhos_pai?.length) {
      return;
    }
    this.expandedIds.update(set => {
      const next = new Set(set);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }

  isExpanded(nodeId: string): boolean {
    return this.expandedIds().has(nodeId);
  }

  abrirArvoreOutroObjetivo(objetivoId: string, event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
    if (!objetivoId) {
      return;
    }
    void this.go.navigate({ route: [...ROTA_ARVORE, objetivoId] });
  }

  formatHoras(value: number): string {
    if (!Number.isFinite(value)) {
      return '0';
    }
    return (Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }

  formatPercent(value: number): string {
    if (!Number.isFinite(value)) {
      return '0%';
    }
    const rounded = Math.round(value * 100) / 100;
    return `${rounded.toLocaleString('pt-BR', { maximumFractionDigits: 2, useGrouping: true })}%`;
  }

  togglePainelEntregas(): void {
    this.entregasPainelAberto.update(v => !v);
  }

  async carregarEntregasDetalhe(): Promise<void> {
    const id = this.selectedNodeId();
    if (!id?.length) {
      return;
    }
    this.entregasLoading.set(true);
    this.entregasError.set(null);
    try {
      const data = await firstValueFrom(this.api.getEntregasPorObjetivo(id));
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

  async carregarEquipes(objetivoId?: string): Promise<void> {
    const id = objetivoId ?? this.selectedNodeId();
    if (!id?.length) {
      return;
    }
    this.equipesLoading.set(true);
    this.equipesError.set(null);
    try {
      const data = await firstValueFrom(this.api.getEquipesPorObjetivo(id));
      if (this.selectedNodeId() !== id) {
        return;
      }
      this.equipesResposta.set(data);
    } catch (err: unknown) {
      if (this.selectedNodeId() !== id) {
        return;
      }
      let msg = 'Não foi possível carregar as equipes.';
      if (err instanceof HttpErrorResponse) {
        const body = err.error as { error?: string } | undefined;
        msg = (typeof body?.error === 'string' ? body.error : err.message) || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      this.equipesError.set(msg);
      this.equipesResposta.set(null);
    } finally {
      if (this.selectedNodeId() === id) {
        this.equipesLoading.set(false);
      }
    }
  }

  private resetPainelEquipes(): void {
    this.equipesResposta.set(null);
    this.equipesError.set(null);
    this.equipesLoading.set(false);
  }

  onPanDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    this.panDrag = {
      startX: event.clientX,
      startY: event.clientY,
      originPanX: this.panX(),
      originPanY: this.panY()
    };
  }

  zoomIn(): void {
    this.zoom.update(v => Math.min(1.6, Number((v + 0.1).toFixed(2))));
  }

  zoomOut(): void {
    this.zoom.update(v => Math.max(0.55, Number((v - 0.1).toFixed(2))));
  }

  resetView(): void {
    this.zoom.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.panDrag || !this.svgRef?.nativeElement) {
      return;
    }
    const rect = this.svgRef.nativeElement.getBoundingClientRect();
    const parts = this.viewBoxString().split(' ').map(Number);
    const scaleX = parts[2] / rect.width;
    const scaleY = parts[3] / rect.height;
    this.panX.set(this.panDrag.originPanX - (event.clientX - this.panDrag.startX) * scaleX);
    this.panY.set(this.panDrag.originPanY - (event.clientY - this.panDrag.startY) * scaleY);
  }

  @HostListener('window:pointerup')
  onPointerUp(): void {
    this.panDrag = null;
  }

  private mensagemErro(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error as { error?: string } | undefined;
      return (typeof body?.error === 'string' ? body.error : err.message) || 'Não foi possível carregar a árvore.';
    }
    if (err instanceof Error) {
      return err.message;
    }
    return 'Não foi possível carregar a árvore.';
  }

  private buildLayout(
    dados: ObjetivoArvoreVisualizacaoApi | null,
    expanded: Set<string>
  ): { treeNodes: TreeNodeVm[]; superiorResumos: SuperiorResumoVm[]; edges: EdgeVm[]; width: number; height: number } {
    if (!dados?.nos[dados.objetivo_raiz_id]) {
      return { treeNodes: [], superiorResumos: [], edges: [], width: 800, height: 500 };
    }

    const nos = dados.nos;
    const raizId = dados.objetivo_raiz_id;

    const positions = new Map<string, { depth: number; row: number }>();

    const layoutSubtree = (id: string, depth: number, startRow: number): number => {
      const node = nos[id];
      if (!node) {
        return 0;
      }

      const filhos = expanded.has(id)
        ? (node.filhos_pai ?? []).filter(fid => !!nos[fid])
        : [];

      if (filhos.length === 0) {
        positions.set(id, { depth, row: startRow });
        return 1;
      }

      let cursor = startRow;
      const spans: number[] = [];
      for (const filhoId of filhos) {
        spans.push(layoutSubtree(filhoId, depth + 1, cursor));
        cursor += spans[spans.length - 1];
      }

      const totalSpan = spans.reduce((a, b) => a + b, 0);
      positions.set(id, { depth, row: startRow + totalSpan / 2 - 0.5 });
      return totalSpan;
    };

    layoutSubtree(raizId, 0, 0);

    const raizRow = positions.get(raizId)?.row ?? 0;
    const maxRow = Math.max(0, ...[...positions.values()].map(p => p.row));
    const centerX = CANVAS_PAD + raizRow * (NODE_W + H_GAP) + NODE_HALF_W;

    /** Do planejamento mais alto ao imediato (MGI → … → SEGES → DINOV). */
    const cadeiaExibicao = [...dados.cadeia_superior].sort(
      (a, b) => b.nivel_superior - a.nivel_superior
    );

    const superiorResumos: SuperiorResumoVm[] = [];
    const resumoByObjetivoId = new Map<string, SuperiorResumoVm>();
    let stackY = CANVAS_PAD;

    for (const resumo of cadeiaExibicao) {
      const lineCount = Math.max(1, resumo.hierarquia_linhas.length);
      const height = SUPERIOR_HEADER + lineCount * LINE_H + SUPERIOR_PAD;
      const y = stackY + height / 2;

      const vm: SuperiorResumoVm = {
        id: `resumo:${resumo.objetivo_id}`,
        objetivoId: resumo.objetivo_id,
        nome: resumo.objetivo_nome,
        planejamentoNome: resumo.planejamento_nome,
        hierarquiaLinhas: resumo.hierarquia_linhas,
        nivelSuperior: resumo.nivel_superior,
        objetivoSuperiorId: resumo.objetivo_superior_id,
        ligadoAObjetivoId: resumo.nivel_superior === 1 ? raizId : '',
        x: centerX,
        y,
        height
      };

      superiorResumos.push(vm);
      resumoByObjetivoId.set(resumo.objetivo_id, vm);
      stackY += height + V_GAP;
    }

    const treeBaseY = (cadeiaExibicao.length > 0 ? stackY : CANVAS_PAD) + NODE_HALF_H;

    const treeNodes: TreeNodeVm[] = [];
    for (const [id, pos] of positions) {
      const n = nos[id];
      treeNodes.push({
        id,
        nome: n.objetivo_nome,
        planejamentoNome: n.planejamento_nome,
        entregasCount: n.total_entregas ?? 0,
        esforcoProprioHoras: n.esforco_proprio ?? 0,
        esforcoTotalHoras: n.esforco_total_horas ?? 0,
        filhosPai: n.filhos_pai ?? [],
        objetivoSuperiorId: n.objetivo_superior_id ?? n.objetivo_superior?.id ?? null,
        isRaiz: id === raizId,
        depth: pos.depth,
        x: CANVAS_PAD + pos.row * (NODE_W + H_GAP) + NODE_HALF_W,
        y: treeBaseY + pos.depth * (NODE_H + V_GAP),
        hasFilhos: (n.filhos_pai ?? []).length > 0
      });
    }

    const treeById = new Map(treeNodes.map(n => [n.id, n]));
    const edges: EdgeVm[] = [];

    for (const node of treeNodes) {
      const paiId = nos[node.id]?.objetivo_pai_id ?? nos[node.id]?.objetivo_pai?.id;
      if (paiId && treeById.has(paiId)) {
        edges.push({
          key: `pai:${node.id}:${paiId}`,
          type: 'PAI',
          path: this.edgePaiPath(treeById.get(paiId)!, node)
        });
      }

      const supId = node.objetivoSuperiorId;
      if (supId && resumoByObjetivoId.has(supId)) {
        edges.push({
          key: `sup:${node.id}:${supId}`,
          type: 'SUPERIOR',
          path: this.edgeSuperiorPath(node, resumoByObjetivoId.get(supId)!)
        });
      }
    }

    for (const resumo of superiorResumos) {
      if (!resumo.objetivoSuperiorId) {
        continue;
      }
      const supResumo = resumoByObjetivoId.get(resumo.objetivoSuperiorId);
      if (!supResumo) {
        continue;
      }
      edges.push({
        key: `sup-chain:${resumo.objetivoId}:${resumo.objetivoSuperiorId}`,
        type: 'SUPERIOR',
        path: this.edgeSuperiorResumoChainPath(resumo, supResumo)
      });
    }

    const maxTreeX = Math.max(...treeNodes.map(n => n.x + NODE_HALF_W), centerX + NODE_HALF_W) + CANVAS_PAD;
    const maxTreeY = Math.max(...treeNodes.map(n => n.y + NODE_HALF_H), treeBaseY + NODE_HALF_H);
    const maxSupY = superiorResumos.length
      ? Math.max(...superiorResumos.map(s => s.y + s.height / 2))
      : 0;

    return {
      treeNodes,
      superiorResumos,
      edges,
      width: Math.max(800, maxTreeX),
      height: Math.max(500, maxTreeY, maxSupY) + CANVAS_PAD
    };
  }

  /** Filho abaixo do pai — linha contínua, roteamento em L. */
  private edgePaiPath(parent: TreeNodeVm, child: TreeNodeVm): string {
    const x1 = parent.x;
    const y1 = parent.y + NODE_HALF_H;
    const x2 = child.x;
    const y2 = child.y - NODE_HALF_H;
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  }

  /** Vínculo com planejamento superior — tracejado, vertical acima do nó. */
  private edgeSuperiorPath(source: TreeNodeVm, target: SuperiorResumoVm): string {
    const x1 = source.x;
    const y1 = source.y - NODE_HALF_H;
    const x2 = target.x;
    const y2 = target.y + target.height / 2;
    const laneY = y2 + 8;
    return `M ${x1} ${y1} L ${x1} ${laneY} L ${x2} ${laneY} L ${x2} ${y2}`;
  }

  private edgeSuperiorResumoChainPath(from: SuperiorResumoVm, to: SuperiorResumoVm): string {
    const x1 = from.x;
    const y1 = from.y - from.height / 2;
    const x2 = to.x;
    const y2 = to.y + to.height / 2;
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
}
