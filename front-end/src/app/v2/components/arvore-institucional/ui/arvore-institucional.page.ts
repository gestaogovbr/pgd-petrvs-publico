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
import { SvgPanZoomService } from 'src/app/v2/services/svg-pan-zoom.service';
import type { ArvoreData } from '../domain/types';
import { ARVORE_CONFIG, ARVORE_DATA_PROVIDER } from '../tokens';
import {
  ArvoreLayoutService,
  DEFAULT_LEVELS,
  NODE_H,
  NODE_HALF_H,
  NODE_HALF_W,
  NODE_W,
  type GetDownLinksFn,
  type GetUpLinkFn
} from '../infra/arvore-layout.service';
import { ArvoreInstitucionalPainelLateralComponent } from './painel-lateral.component';

@Component({
  selector: 'app-arvore-institucional-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent, ArvoreInstitucionalPainelLateralComponent],
  templateUrl: './arvore-institucional.page.html',
  styleUrl: './arvore-institucional.page.scss',
  providers: [SvgPanZoomService, ArvoreLayoutService]
})
export class ArvoreInstitucionalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly provider = inject(ARVORE_DATA_PROVIDER);
  readonly config = inject(ARVORE_CONFIG);
  readonly panZoom = inject(SvgPanZoomService);
  readonly layoutService = inject(ArvoreLayoutService);

  @ViewChild('svgRef', { static: false }) svgRef?: ElementRef<SVGSVGElement>;

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly dados = signal<ArvoreData | null>(null);
  readonly selectedNodeId = signal<string | null>(null);
  readonly levelsAbove = signal(DEFAULT_LEVELS);
  readonly levelsBelow = signal(DEFAULT_LEVELS);

  readonly nodeW = NODE_W;
  readonly nodeH = NODE_H;
  readonly nodeHalfW = NODE_HALF_W;
  readonly nodeHalfH = NODE_HALF_H;

  readonly consultadoId = computed(() => this.dados()?.focalId ?? null);

  readonly subtitulo = computed(() => this.dados()?.subtitulo ?? null);

  private readonly getDownLinks: GetDownLinksFn = (nodeId, nos) => {
    const n = nos[nodeId];
    if (!n) {
      return [];
    }

    const links: Array<{ id: string; link: 'PRIMARY' | 'SECONDARY' }> = [];
    const seen = new Set<string>();

    for (const id of n.filhosIds) {
      if (nos[id] && !seen.has(id)) {
        seen.add(id);
        links.push({ id, link: 'PRIMARY' });
      }
    }
    for (const id of n.filhosSecondaryIds) {
      if (nos[id] && !seen.has(id)) {
        seen.add(id);
        links.push({ id, link: 'SECONDARY' });
      }
    }

    return links;
  };

  private readonly getUpLink: GetUpLinkFn = (nodeId, nos) => {
    const n = nos[nodeId];
    if (!n) {
      return null;
    }

    if (n.parentId && nos[n.parentId]) {
      return { id: n.parentId, link: 'PRIMARY' };
    }
    if (n.secondaryParentId && nos[n.secondaryParentId]) {
      return { id: n.secondaryParentId, link: 'SECONDARY' };
    }

    return null;
  };

  readonly canExpandUp = computed(() => {
    const focal = this.consultadoId();
    const nos = this.dados()?.nos;
    if (!focal || !nos) {
      return false;
    }
    const upChain = this.layoutService.buildUpChain(focal, nos, this.getUpLink);
    return upChain.length > this.levelsAbove();
  });

  readonly canExpandDown = computed(() => {
    const focal = this.consultadoId();
    const nos = this.dados()?.nos;
    if (!focal || !nos) {
      return false;
    }
    return this.layoutService.maxDescendantDepth(focal, nos, this.getDownLinks) > this.levelsBelow();
  });

  readonly layout = computed(() =>
    this.layoutService.buildLayout(
      this.dados()?.nos,
      this.consultadoId(),
      this.levelsAbove(),
      this.levelsBelow(),
      this.getUpLink,
      this.getDownLinks
    )
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
        map(pm => {
          const params: Record<string, string> = {};
          for (const key of pm.keys) {
            const val = pm.get(key)?.trim();
            if (val) {
              params[key] = val;
            }
          }
          return params;
        }),
        filter(p => Object.keys(p).length > 0),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => void this.carregar(params));
  }

  async carregar(params: Record<string, string>): Promise<void> {
    this.loading.set(true);
    this.loadError.set(null);
    this.levelsAbove.set(DEFAULT_LEVELS);
    this.levelsBelow.set(DEFAULT_LEVELS);
    this.panZoom.reset();

    try {
      const data = await firstValueFrom(this.provider.carregarArvore(params));
      this.dados.set(data);
      this.selectedNodeId.set(data.focalId);
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

  onPanDown(event: PointerEvent): void {
    this.panZoom.setSvgRef(this.svgRef!);
    this.panZoom.setViewBoxFn(() => this.viewBoxString());
    this.panZoom.onPanDown(event);
  }

  onCentralizar(nodeId: string): void {
    this.provider.navegarParaNo(nodeId);
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    this.panZoom.onPointerMove(event);
  }

  @HostListener('window:pointerup')
  onPointerUp(): void {
    this.panZoom.onPointerUp();
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
}
