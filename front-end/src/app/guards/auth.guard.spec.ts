import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GlobalsService } from '../services/globals.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { usuario: undefined, authSession: () => Promise.resolve(false) } },
        { provide: GlobalsService, useValue: { requireLogged: true, isToolbar: false } },
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('preserva subrota, ID e parâmetros ao enviar link profundo para login', async () => {
    const route = {
      data: {},
      queryParams: {},
      url: [new UrlSegment('gestao', {}), new UrlSegment('plano-trabalho-v2', {})]
    } as unknown as ActivatedRouteSnapshot;
    const state = {
      url: '/gestao/plano-trabalho-v2/editar/plano-sintetico?origem=teste&idroute=interno'
    } as RouterStateSnapshot;

    const redirect = await guard.canActivate(route, state) as UrlTree;
    const destination = JSON.parse(redirect.queryParams['redirectTo']);

    expect(TestBed.inject(Router).serializeUrl(redirect).startsWith('/login?')).toBeTrue();
    expect(destination).toEqual({
      route: ['gestao', 'plano-trabalho-v2', 'editar', 'plano-sintetico'],
      params: { origem: 'teste' }
    });
  });

  it('preserva o ID usado pela clonagem V2 após o login', async () => {
    const route = { data: {}, queryParams: {}, url: [] } as unknown as ActivatedRouteSnapshot;
    const state = {
      url: '/gestao/plano-trabalho-v2/novo?clone_de=plano-sintetico'
    } as RouterStateSnapshot;

    const redirect = await guard.canActivate(route, state) as UrlTree;
    const destination = JSON.parse(redirect.queryParams['redirectTo']);

    expect(destination).toEqual({
      route: ['gestao', 'plano-trabalho-v2', 'novo'],
      params: { clone_de: 'plano-sintetico' }
    });
  });
});
