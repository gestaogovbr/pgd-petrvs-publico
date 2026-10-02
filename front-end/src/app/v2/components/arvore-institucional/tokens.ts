import { InjectionToken } from '@angular/core';
import type { ArvoreDataProvider, ArvoreInstitucionalConfig } from './domain/types';

/** Token para injetar o provider de dados específico do domínio. */
export const ARVORE_DATA_PROVIDER = new InjectionToken<ArvoreDataProvider>(
  'ArvoreDataProvider'
);

/** Token para injetar a configuração visual/textual específica do domínio. */
export const ARVORE_CONFIG = new InjectionToken<ArvoreInstitucionalConfig>(
  'ArvoreInstitucionalConfig'
);
