import { inject } from '@angular/core';
import { CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilterStorageService } from 'src/app/v2/services/filter-storage.service';

/** Prefixo da chave de persistência dos filtros da listagem de Planos de Trabalho. */
export const PLANO_TRABALHO_FILTER_KEY_PREFIX = 'plano-trabalho-v2:filters';

/**
 * Caminhos sob os quais o módulo de Planos de Trabalho está montado.
 * Enquanto a navegação permanecer sob um destes prefixos, o usuário continua
 * "dentro da funcionalidade" e os filtros devem ser preservados.
 */
const PLANO_TRABALHO_FEATURE_PREFIXES = [
  '/gestao/plano-trabalho',
  '/avaliacao/plano-trabalho',
  '/gestao/plano-trabalho-v2',
];

function isDentroDaFuncionalidade(url: string): boolean {
  const path = url.split('?')[0].split('#')[0];
  return PLANO_TRABALHO_FEATURE_PREFIXES.some(
    prefix => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function filterStorageKey(userId: string | undefined): string {
  return userId ? `${PLANO_TRABALHO_FILTER_KEY_PREFIX}:${userId}` : PLANO_TRABALHO_FILTER_KEY_PREFIX;
}

/**
 * #2740 Erro 2: mantém os filtros da tela geral de Planos de Trabalho durante a
 * navegação interna do módulo (lista ↔ detalhe) e os reinicia somente quando o
 * usuário abandona a funcionalidade.
 */
export const clearPlanoTrabalhoFiltersOnExit: CanDeactivateFn<unknown> = (
  _component,
  _currentRoute,
  _currentState,
  nextState?: RouterStateSnapshot,
): boolean => {
  const destino = nextState?.url ?? '';

  if (isDentroDaFuncionalidade(destino)) {
    return true;
  }

  const auth = inject(AuthService);
  const filterStorage = inject(FilterStorageService);

  filterStorage.clear(filterStorageKey(auth.usuario?.id));

  return true;
};
