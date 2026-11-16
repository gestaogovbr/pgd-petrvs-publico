import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';
import {
  clearPlanoTrabalhoFiltersOnExit,
  PLANO_TRABALHO_FILTER_KEY_PREFIX,
} from './clear-filters-on-exit.guard';

describe('clearPlanoTrabalhoFiltersOnExit', () => {
  let filterStorage: jasmine.SpyObj<FilterStorageService>;
  const userId = 'user-123';

  function run(destino: string): boolean {
    const nextState = { url: destino } as RouterStateSnapshot;
    return TestBed.runInInjectionContext(() =>
      clearPlanoTrabalhoFiltersOnExit({}, {} as any, {} as any, nextState) as boolean,
    );
  }

  beforeEach(() => {
    filterStorage = jasmine.createSpyObj<FilterStorageService>('FilterStorageService', ['clear']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { usuario: { id: userId } } },
        { provide: FilterStorageService, useValue: filterStorage },
      ],
    });
  });

  it('não limpa os filtros ao navegar para a tela de detalhe do mesmo módulo', () => {
    const resultado = run('/gestao/plano-trabalho-v2/consultar/abc');

    expect(resultado).toBeTrue();
    expect(filterStorage.clear).not.toHaveBeenCalled();
  });

  it('não limpa os filtros ao navegar entre os pontos de montagem do módulo', () => {
    run('/gestao/plano-trabalho');
    run('/avaliacao/plano-trabalho/consultar/abc');

    expect(filterStorage.clear).not.toHaveBeenCalled();
  });

  it('limpa os filtros do usuário ao sair da funcionalidade', () => {
    const resultado = run('/gestao/home-v2');

    expect(resultado).toBeTrue();
    expect(filterStorage.clear).toHaveBeenCalledWith(`${PLANO_TRABALHO_FILTER_KEY_PREFIX}:${userId}`);
  });

  it('ignora query string e fragmento ao avaliar o destino', () => {
    run('/gestao/plano-trabalho-v2?page=2#top');

    expect(filterStorage.clear).not.toHaveBeenCalled();
  });

  it('não confunde um prefixo parecido de outra funcionalidade com o módulo', () => {
    run('/gestao/plano-trabalho-relatorio');

    expect(filterStorage.clear).toHaveBeenCalledWith(`${PLANO_TRABALHO_FILTER_KEY_PREFIX}:${userId}`);
  });
});
