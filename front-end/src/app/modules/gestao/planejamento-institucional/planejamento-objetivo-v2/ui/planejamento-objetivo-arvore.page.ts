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
  type EsforcoObjetivoNodeApi,
  type ObjetivoArvoreVisualizacaoApi
} from '../infra/planejamento-objetivo-esforco-api.client';
import { PlanejamentoObjetivoPainelLateralComponent } from './planejamento-objetivo-painel-lateral.component';

type AncestorStep = {
  id: string;
  link: 'PAI' | 'SUPERIOR';
  childId: string;
};

type TreeNodeVm = {
  id: string;
  nome: string;
  planejamentoNome: string;
  tipoObjetivoNome: string;
  vinculosCount: number;
  entregasCount: number;
  esforcoProprioHoras: number;
  esforcoTotalHoras: number;
  /** Planejado % do disponível do próprio nó (igual ao painel). */
  planejadoPercentualDisponivel: number;
  /** % do esforço planejado acumulado do pai visível; `null` = nó de referência. */
  percentualDoPai: number | null;
  filhosPai: string[];
  isConsultado: boolean;
  level: number;
  x: number;
  y: number;
};

type EdgeVm = {
  key: string;
  type: 'PAI' | 'SUPERIOR';
  path: string;
};

const NODE_W = 220;
const NODE_H = 128;
const NODE_HALF_W = NODE_W / 2;
const NODE_HALF_H = NODE_H / 2;
const H_GAP = 40;
const V_GAP = 36;
const CANVAS_PAD = 56;
const DEFAULT_LEVELS = 2;
const ROTA_ARVORE = ['gestao', 'planejamento', 'objetivo-arvore'] as const;

@Component({
  selector: 'app-planejamento-objetivo-arvore-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent, PlanejamentoObjetivoPainelLateralComponent],
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
  readonly selectedNodeId = signal<string | null>(null);
  readonly levelsAbove = signal(DEFAULT_LEVELS);
  readonly levelsBelow = signal(DEFAULT_LEVELS);
  readonly zoom = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);

  readonly nodeW = NODE_W;
  readonly nodeH = NODE_H;
  readonly nodeHalfW = NODE_HALF_W;
  readonly nodeHalfH = NODE_HALF_H;

  private panDrag: { startX: number; startY: number; originPanX: number; originPanY: number } | null = null;

  readonly consultadoId = computed(() => this.dados()?.objetivo_raiz_id ?? null);

  readonly upChain = computed(() => {
    const focal = this.consultadoId();
    const nos = this.dados()?.nos;
    return focal && nos ? this.buildUpChain(focal, nos) : [];
  });

  readonly canExpandUp = computed(() => this.upChain().length > this.levelsAbove());
  readonly canExpandDown = computed(() => {
    const focal = this.consultadoId();
    const nos = this.dados()?.nos;
    if (!focal || !nos) {
      return false;
    }
    return this.maxDescendantDepth(focal, nos) > this.levelsBelow();
  });

  readonly layout = computed(() =>
    this.buildLayout(this.dados(), this.consultadoId(), this.levelsAbove(), this.levelsBelow())
  );

  readonly treeNodes = computed(() => this.layout().treeNodes);
  readonly edges = computed(() => this.layout().edges);
  readonly canvasW = computed(() => this.layout().width);
  readonly canvasH = computed(() => this.layout().height);

  readonly viewBoxString = computed(() => {
    const zoom = this.zoom();
    const cw = this.canvasW();
    const ch = this.canvasH();
    const w = Math.max(cw, 800) / zoom;
    const h = Math.max(ch, 520) / zoom;
    const focal = this.treeNodes().find(n => n.isConsultado);
    const cx = focal ? focal.x + this.panX() : cw / 2 + this.panX();
    const cy = focal ? focal.y + this.panY() : ch / 2 + this.panY();
    return `${cx - w / 2} ${cy - h / 2} ${w} ${h}`;
  });

  readonly selectedNode = computed(() => {
    const id = this.selectedNodeId();
    return id ? this.treeNodes().find(n => n.id === id) ?? this.nodeVmFromApi(id) : null;
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
    this.levelsAbove.set(DEFAULT_LEVELS);
    this.levelsBelow.set(DEFAULT_LEVELS);
    this.panX.set(0);
    this.panY.set(0);
    this.zoom.set(1);

    try {
      const data = await firstValueFrom(this.api.getArvoreVisualizacao(id));
      this.dados.set(data);
      this.selectedNodeId.set(data.objetivo_raiz_id);
    } catch (err: unknown) {
      this.dados.set(null);
      this.selectedNodeId.set(null);
      this.loadError.set(this.mensagemErro(err));
    } finally {
      this.loading.set(false);
    }
  }

  onNodeClick(nodeId: string, event: Event): void {
    event.stopPropagation();
    this.selectedNodeId.set(nodeId);
  }

  expandUp(): void {
    if (!this.canExpandUp()) {
      return;
    }
    this.levelsAbove.update(v => v + 1);
    if (this.levelsBelow() > 0) {
      this.levelsBelow.update(v => v - 1);
    }
  }

  expandDown(): void {
    if (!this.canExpandDown()) {
      return;
    }
    this.levelsBelow.update(v => v + 1);
    if (this.levelsAbove() > 0) {
      this.levelsAbove.update(v => v - 1);
    }
  }

  abrirArvoreOutroObjetivo(objetivoId: string, event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
    if (!objetivoId) {
      return;
    }
    void this.go.navigate({ route: [...ROTA_ARVORE, objetivoId] });
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
    this.zoom.update(v => Math.min(4, Number((v + 0.1).toFixed(2))));
  }

  zoomOut(): void {
    this.zoom.update(v => Math.max(0.2, Number((v - 0.1).toFixed(2))));
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

  private nodeVmFromApi(id: string): TreeNodeVm | null {
    const n = this.dados()?.nos[id];
    if (!n) {
      return null;
    }
    return this.toNodeVm(n, id === this.consultadoId(), 0, 0, 0);
  }

  private buildUpChain(focalId: string, nos: Record<string, EsforcoObjetivoNodeApi>): AncestorStep[] {
    const steps: AncestorStep[] = [];
    let cur = focalId;

    while (true) {
      const n = nos[cur];
      if (!n) {
        break;
      }
      const supId = n.objetivo_superior_id;
      if (supId && nos[supId]) {
        steps.push({ id: supId, link: 'SUPERIOR', childId: cur });
        cur = supId;
        continue;
      }
      const paiId = n.objetivo_pai_id ?? n.objetivo_pai?.id;
      if (paiId && nos[paiId]) {
        steps.push({ id: paiId, link: 'PAI', childId: cur });
        cur = paiId;
        continue;
      }
      break;
    }

    return steps;
  }

  private getDownLinks(
    parentId: string,
    nos: Record<string, EsforcoObjetivoNodeApi>
  ): { id: string; link: 'PAI' | 'SUPERIOR' }[] {
    const n = nos[parentId];
    if (!n) {
      return [];
    }

    const links: { id: string; link: 'PAI' | 'SUPERIOR' }[] = [];
    const seen = new Set<string>();

    for (const id of n.filhos_pai ?? []) {
      if (nos[id] && !seen.has(id)) {
        seen.add(id);
        links.push({ id, link: 'PAI' });
      }
    }
    for (const id of n.filhos_superior ?? []) {
      if (nos[id] && !seen.has(id)) {
        seen.add(id);
        links.push({ id, link: 'SUPERIOR' });
      }
    }

    return links;
  }

  private maxDescendantDepth(focalId: string, nos: Record<string, EsforcoObjetivoNodeApi>): number {
    let max = 0;

    const walk = (id: string, depth: number, visited: Set<string>): void => {
      if (visited.has(id)) {
        return;
      }
      visited.add(id);
      max = Math.max(max, depth);

      for (const { id: childId } of this.getDownLinks(id, nos)) {
        walk(childId, depth + 1, visited);
      }
    };

    for (const { id } of this.getDownLinks(focalId, nos)) {
      walk(id, 1, new Set());
    }

    return max;
  }

  private collectDescendantsByDepth(
    focalId: string,
    maxDepth: number,
    nos: Record<string, EsforcoObjetivoNodeApi>
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
        for (const { id } of this.getDownLinks(parentId, nos)) {
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

  private toNodeVm(
    n: EsforcoObjetivoNodeApi,
    isConsultado: boolean,
    level: number,
    x: number,
    y: number
  ): TreeNodeVm {
    const filhosPai = n.filhos_pai ?? [];
    const vinculos =
      n.total_vinculos ??
      (n.filhos?.length ?? filhosPai.length + (n.filhos_superior?.length ?? 0));

    return {
      id: n.objetivo_id,
      nome: n.objetivo_nome,
      planejamentoNome: n.planejamento_nome,
      tipoObjetivoNome: n.tipo_objetivo_nome?.trim() || '—',
      vinculosCount: vinculos,
      entregasCount: n.total_entregas ?? 0,
      esforcoProprioHoras: n.esforco_proprio ?? 0,
      esforcoTotalHoras: n.esforco_total_horas ?? 0,
      planejadoPercentualDisponivel: n.planejado_percentual_disponivel
        ?? this.percentualContribuicao(n.esforco_proprio ?? 0, n.esforco_disponivel_horas ?? 0),
      percentualDoPai: null,
      filhosPai,
      isConsultado,
      level,
      x,
      y
    };
  }

  private percentualContribuicao(filhoHoras: number, paiHoras: number): number {
    if (paiHoras <= 0) {
      return 0;
    }
    return Math.round((filhoHoras / paiHoras) * 10000) / 100;
  }

  formatPercent(value: number): string {
    if (!Number.isFinite(value)) {
      return '0%';
    }
    return `${(Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;
  }

  private buildLayout(
    dados: ObjetivoArvoreVisualizacaoApi | null,
    consultadoId: string | null,
    levelsAbove: number,
    levelsBelow: number
  ): { treeNodes: TreeNodeVm[]; edges: EdgeVm[]; width: number; height: number } {
    if (!dados?.nos[consultadoId ?? ''] || !consultadoId) {
      return { treeNodes: [], edges: [], width: 800, height: 520 };
    }

    const nos = dados.nos;
    const upSteps = this.buildUpChain(consultadoId, nos).slice(0, levelsAbove);
    const descendants = this.collectDescendantsByDepth(consultadoId, levelsBelow, nos);

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

    for (let i = 0; i < upSteps.length; i++) {
      const step = upSteps[i];
      const n = nos[step.id];
      if (!n) {
        continue;
      }
      const level = -(i + 1);
      const y = centerY + level * (NODE_H + V_GAP);
      const vm = this.toNodeVm(n, false, level, centerX, y);
      nodeById.set(step.id, vm);
    }

    const focal = nos[consultadoId];
    const focalVm = this.toNodeVm(focal, true, 0, centerX, centerY);
    nodeById.set(consultadoId, focalVm);

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

    for (const [id, vm] of nodeById) {
      const paiId = nos[id]?.objetivo_pai_id ?? nos[id]?.objetivo_pai?.id;
      if (paiId && nodeById.has(paiId)) {
        pushEdge({
          key: `pai:${id}:${paiId}`,
          type: 'PAI',
          path: this.edgePath(nodeById.get(paiId)!, vm)
        });
      }

      const supId = nos[id]?.objetivo_superior_id ?? nos[id]?.objetivo_superior?.id;
      if (supId && nodeById.has(supId) && paiId !== supId) {
        pushEdge({
          key: `SUPERIOR:${id}:${supId}`,
          type: 'SUPERIOR',
          path: this.edgePath(nodeById.get(supId)!, vm)
        });
      }
    }

    for (const [id, vm] of nodeById) {
      const paiId = nos[id]?.objetivo_pai_id ?? nos[id]?.objetivo_pai?.id;
      const supId = nos[id]?.objetivo_superior_id ?? nos[id]?.objetivo_superior?.id;
      const parentId =
        paiId && nodeById.has(paiId) ? paiId : supId && nodeById.has(supId) ? supId : null;

      if (!parentId) {
        vm.percentualDoPai = null;
        continue;
      }

      const parent = nodeById.get(parentId)!;
      vm.percentualDoPai = this.percentualContribuicao(vm.esforcoTotalHoras, parent.esforcoTotalHoras);
    }

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

  private edgePath(parent: TreeNodeVm, child: TreeNodeVm): string {
    const x1 = parent.x;
    const y1 = parent.y + NODE_HALF_H;
    const x2 = child.x;
    const y2 = child.y - NODE_HALF_H;
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  }
}
