import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { ServerService } from '../services/server.service';
import { RelatorioCargaIndividualSiapeDaoService } from './relatorio-carga-individual-siape-dao.service';

describe('RelatorioCargaIndividualSiapeDaoService - issue 2209', () => {
  let server: jasmine.SpyObj<ServerService>;
  let dao: RelatorioCargaIndividualSiapeDaoService;

  beforeEach(() => {
    server = jasmine.createSpyObj<ServerService>('ServerService', ['post']);
    const injector = {
      get: <T>(token: unknown): T => token === ServerService ? server as T : undefined as T
    } as Injector;
    dao = new RelatorioCargaIndividualSiapeDaoService(injector);
  });

  it('busca relatorio por id', async () => {
    const relatorio = { id: 'relatorio-2209' } as any;
    server.post.and.returnValue(of({ relatorio }) as any);

    const resultado = await dao.obterPorId('relatorio-2209');

    expect(server.post).toHaveBeenCalledWith('api/siape/relatorio-carga-individual', { id: 'relatorio-2209' });
    expect(resultado).toBe(relatorio);
  });

  it('lista relatorios recentes com tipo CPF e limite', async () => {
    server.post.and.returnValue(of({ relatorios: [] }) as any);

    await dao.listarRecentes('servidor', '52998224725', 10);

    expect(server.post).toHaveBeenCalledWith('api/siape/relatorio-carga-individual', {
      tipo: 'servidor',
      chave: '52998224725',
      limit: 10,
    });
  });

  it('remove filtros vazios da listagem', async () => {
    server.post.and.returnValue(of({ relatorios: [] }) as any);

    await dao.listarRecentes('', '', 20);

    expect(server.post).toHaveBeenCalledWith('api/siape/relatorio-carga-individual', {
      tipo: undefined,
      chave: undefined,
      limit: 20,
    });
  });
});
