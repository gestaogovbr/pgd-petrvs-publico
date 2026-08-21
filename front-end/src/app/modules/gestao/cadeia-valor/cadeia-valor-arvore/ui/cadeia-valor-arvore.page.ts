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
import { distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { NavigateService } from 'src/app/services/navigate.service';
import { SvgPanZoomService } from 'src/app/v2/services/svg-pan-zoom.service';
import {
  CadeiaValorArvoreApiClient,
  type CadeiaValorArvoreApi,
  type CadeiaValorProcessoNodeApi
} from '../infra/cadeia-valor-arvore-api.client';
import { CadeiaValorPainelLateralComponent } from './cadeia-valor-painel-lateral.component';

type TreeNodeVm = {
  id: string;
  nome: string;
  cadeiaValorNome: string;
  etiqueta: string | null;
  totalVinculos: number;
  percentualEsforco: number | null;
  isFocal: boolean;
  hasCrossCadeia: boolean;
  level: number;
  x: number;
  y: number;
};

type EdgeVm = {
  key: string;
  type: 'MESMA_CADEIA' | 'CROSS_CADEIA';
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
const ROTA_ARVORE = ['gestao', 'cadeia-valor', 'arvore'] as const;

@Component({
  selector: 'app-cadeia-valor-arvore-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent, CadeiaValorPainelLateralComponent],
  templateUrl: './cadeia-valor-arvore.page.html',
  styleUrl: './cadeia-valor-arvore.page.scss',
  providers: [SvgPanZoomService]
})
export class CadeiaValorArvorePage {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(CadeiaValorArvoreApiClient);
  private readonly go = inject(NavigateService);
  readonly panZoom = inject(SvgPanZoomService);

  @ViewChild('svgRef', { static: false }) svgRef?: ElementRef<SVGSVGElement>;

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly dados = signal<CadeiaValorArvoreApi | null>(null);
  readonly selectedNodeId = signal<string | null>(null);
  readonly levelsAbove = signal(DEFAULT_LEVELS);
  readonly levelsBelow = signal(DEFAULT_LEVELS);

  readonly nodeW = NODE_W;
  readonly nodeH = NODE_H;
  readonly nodeHalfW = NODE_HALF_W;
  readonly nodeHalfH = NODE_HALF_H;

  readonly consultadoId = computed(() => this.dados()?.processo_focal_id ?? null);
  readonly cadeiaValorId = computed(() => this.dados()?.cadeia_valor_id ?? null);

  readonly canExpandUp = computed(() => {
    const focal = this.consultadoId();
    const nos = this.dados()?.nos;
    if (!focal || !nos || !nos[focal]) return false;
    const nivelFocal = nos[focal].nivel;
    return nivelFocal > 1 && this.levelsAbove() < nivelFocal - 1;
  });

  readonly canExpandDown = computed(() => {
    const focal = this.consultadoId();
    const dados = this.dados();
    if (!focal || !dados?.nos[focal]) return false;
    // Verificar se há nós reais no próximo nível abaixo do que está visível
    const proxNivel = this.levelsBelow() + 1;
    const descendants = this.collectDescendantsByDepth(focal, proxNivel, dados.nos);
    return descendants.has(proxNivel);
  });

  readonly layout = computed(() =>
    this.buildLayout(this.dados(), this.consultadoId(), this.levelsAbove(), this.levelsBelow())
  );

  readonly treeNodes = computed(() => this.layout().treeNodes);
  readonly edges = computed(() => this.layout().edges);
  readonly canvasW = computed(() => this.layout().width);
  readonly canvasH = computed(() => this.layout().height);

  readonly viewBoxString = computed(() => {
    const focal = this.treeNodes().find(n => n.isFocal);
    return this.panZoom.computeViewBox(this.canvasW(), this.canvasH(), focal?.x, focal?.y);
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map(pm => ({
          cadeiaValorId: pm.get('cadeiaValorId')?.trim() ?? '',
          processoId: pm.get('processoId')?.trim() ?? ''
        })),
        filter(p => p.cadeiaValorId.length > 0 && p.processoId.length > 0),
        distinctUntilChanged((a, b) => a.cadeiaValorId === b.cadeiaValorId && a.processoId === b.processoId),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(p => void this.carregar(p.cadeiaValorId, p.processoId));
  }

  async carregar(cadeiaValorId: string, processoId: string): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    this.levelsAbove.set(DEFAULT_LEVELS);
    this.levelsBelow.set(DEFAULT_LEVELS);
    this.panZoom.reset();

    try {
      const data = await firstValueFrom(this.api.getArvore(cadeiaValorId, processoId));
      this.dados.set(data);
      this.selectedNodeId.set(data.processo_focal_id);
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

  resetLevels(): void {
    this.levelsAbove.set(DEFAULT_LEVELS);
    this.levelsBelow.set(DEFAULT_LEVELS);
  }

  navegarParaProcesso(processoId: string): void {
    const dados = this.dados();
    if (!dados || !processoId) {
      return;
    }
    void this.go.navigate({ route: [...ROTA_ARVORE, dados.cadeia_valor_id, processoId] });
  }

  onPanDown(event: PointerEvent): void {
    this.panZoom.setSvgRef(this.svgRef!);
    this.panZoom.setViewBoxFn(() => this.viewBoxString());
    this.panZoom.onPanDown(event);
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    this.panZoom.onPointerMove(event);
  }

  @HostListener('window:pointerup')
  onPointerUp(): void {
    this.panZoom.onPointerUp();
  }

  formatPercent(value: number | null): string {
    if (value === null || !Number.isFinite(value)) {
      return '0%';
    }
    return `${(Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;
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

  private getDownLinks(parentId: string, nos: Record<string, CadeiaValorProcessoNodeApi>): string[] {
    const n = nos[parentId];
    if (!n) {
      return [];
    }
    return n.filhos_ids.filter(id => !!nos[id]);
  }

  private collectDescendantsByDepth(
    focalId: string,
    maxDepth: number,
    nos: Record<string, CadeiaValorProcessoNodeApi>
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
        for (const childId of this.getDownLinks(parentId, nos)) {
          if (seenAtDepth.has(childId)) {
            continue;
          }
          seenAtDepth.add(childId);
          idsAtDepth.push(childId);
          nextFrontier.push(childId);
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
    n: CadeiaValorProcessoNodeApi,
    isFocal: boolean,
    level: number,
    x: number,
    y: number
  ): TreeNodeVm {
    return {
      id: n.processo_id,
      nome: n.nome,
      cadeiaValorNome: n.cadeia_valor_nome,
      etiqueta: n.etiquetas?.length ? n.etiquetas[0] : null,
      totalVinculos: n.total_vinculos,
      percentualEsforco: null,
      isFocal,
      hasCrossCadeia: (n.vinculos_cross_cadeia?.length ?? 0) > 0,
      level,
      x,
      y
    };
  }

  private buildLayout(
    dados: CadeiaValorArvoreApi | null,
    consultadoId: string | null,
    levelsAbove: number,
    levelsBelow: number
  ): { treeNodes: TreeNodeVm[]; edges: EdgeVm[]; width: number; height: number } {
    if (!dados?.nos[consultadoId ?? ''] || !consultadoId) {
      return { treeNodes: [], edges: [], width: 800, height: 520 };
    }

    const nos = dados.nos;

    // Coletar ancestrais subindo por processo_pai_id
    const upSteps: { id: string; childId: string }[] = [];
    let cur = consultadoId;
    while (upSteps.length < levelsAbove) {
      const n = nos[cur];
      if (!n) break;
      const paiId = n.processo_pai_id;
      if (paiId && nos[paiId]) {
        upSteps.push({ id: paiId, childId: cur });
        cur = paiId;
      } else {
        break;
      }
    }

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
          key: `pai:${step.childId}:${step.id}`,
          type: 'MESMA_CADEIA',
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
      const paiId = nos[id]?.processo_pai_id;
      if (paiId && nodeById.has(paiId)) {
        pushEdge({
          key: `pai:${id}:${paiId}`,
          type: 'MESMA_CADEIA',
          path: this.edgePath(nodeById.get(paiId)!, vm)
        });
      }

      const nData = nos[id];
      if (nData?.vinculos_cross_cadeia?.length) {
        for (const vc of nData.vinculos_cross_cadeia) {
          if (nodeById.has(vc.processo_id)) {
            pushEdge({
              key: `cross:${id}:${vc.processo_id}`,
              type: 'CROSS_CADEIA',
              path: this.edgePath(vm, nodeById.get(vc.processo_id)!)
            });
          }
        }
      }
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
