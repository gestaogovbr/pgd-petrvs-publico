import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);

  readonly crumbs = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.build())
    ),
    { initialValue: [] as BreadcrumbCrumb[] }
  );

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
      const last = crumbs[crumbs.length - 1];
      delete last.url;
      delete last.target;
      last.active = true;
    }

    return crumbs;
  }
}
