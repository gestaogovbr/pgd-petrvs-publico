import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { LookupService } from '../services/lookup.service';
import { ServerService } from '../services/server.service';
import { UsuarioDaoService } from './usuario-dao.service';

describe('UsuarioDaoService carga individual SIAPE - issue 2209', () => {
  it('consulta e processa o CPF nos endpoints esperados', () => {
    const server = jasmine.createSpyObj<ServerService>('ServerService', ['post']);
    server.post.and.returnValue(of({ success: true }) as any);
    const injector = {
      get: <T>(token: unknown): T => {
        if (token === ServerService) return server as T;
        if (token === LookupService) return {} as T;
        return undefined as T;
      }
    } as Injector;
    const dao = new UsuarioDaoService(injector);

    dao.consultarSIAPE('52998224725').subscribe();
    expect(server.post).toHaveBeenCalledWith('api/usuario/consultar-cpf-siape', { cpf: '52998224725' });

    dao.sincronizarSIAPE('52998224725').subscribe();
    expect(server.post).toHaveBeenCalledWith('api/usuario/processar-siape', { cpf: '52998224725' });
  });
});
