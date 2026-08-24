import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

export interface BreadcrumbCrumb {
  label: string;
  url?: string;
  target?: string;
  active?: boolean;
}

@Injectable()
export class BreadcrumbService {
  private readonly router = inject(Router);

  private readonly _lastLabelOverride = signal<string | null>(null);

  private readonly _routeCrumbs = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => { this._lastLabelOverride.set(null); return this.build(); })
    ),
    { initialValue: [] as BreadcrumbCrumb[] }
  );

  readonly crumbs = computed(() => {
    const crumbs = this._routeCrumbs() ?? [];
    const override = this._lastLabelOverride();
    if (!override || crumbs.length === 0) return crumbs;
    return crumbs.map((c, i) =>
      i === crumbs.length - 1 ? { ...c, label: override } : c
    );
  });

  /** Substitui o label do último breadcrumb (o item ativo). */
  setLastLabel(label: string): void {
    this._lastLabelOverride.set(label);
  }

  private build(): BreadcrumbCrumb[] {
    let snap: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    while (snap.firstChild) snap = snap.firstChild;

    const chain: ActivatedRouteSnapshot[] = [];
    let current: ActivatedRouteSnapshot | null = snap;
    while (current) {
      chain.unshift(current);
      current = current.parent;
    }

    const crumbs: BreadcrumbCrumb[] = [];
    let url = '';
    for (const s of chain) {
      const segment = s.url.map(u => u.path).join('/');
      if (segment) url += '/' + segment;
      const label: string | undefined = s.routeConfig?.data?.['breadcrumb'];
      if (label) crumbs.push({ label, url, target: '_self' });
    }

    if (crumbs.length) {
      const parents = this.readBreadcrumbParents(snap);
      if (parents.length) {
        const insertAt = crumbs.length - 1;
        crumbs.splice(insertAt, 0, ...parents.map(p => ({ ...p, target: '_self' as const })));
      }

      const last = crumbs[crumbs.length - 1];
      delete last.url;
      delete last.target;
      last.active = true;
    }

    return crumbs;
  }

  private readBreadcrumbParents(leaf: ActivatedRouteSnapshot): BreadcrumbCrumb[] {
    let current: ActivatedRouteSnapshot | null = leaf;
    while (current) {
      const raw = current.routeConfig?.data?.['breadcrumbParents'];
      if (Array.isArray(raw) && raw.length) {
        return this.parseBreadcrumbParents(raw);
      }
      current = current.parent;
    }

    return [];
  }

  private parseBreadcrumbParents(raw: unknown[]): BreadcrumbCrumb[] {
    return raw
      .filter((item): item is { label: string; url?: string } => {
        if (!item || typeof item !== 'object') {
          return false;
        }
        const candidate = item as { label?: unknown; url?: unknown };
        return typeof candidate.label === 'string' && candidate.label.length > 0;
      })
      .map(item => ({
        label: item.label,
        ...(typeof item.url === 'string' && item.url.length > 0 ? { url: item.url } : {}),
      }));
  }
}
