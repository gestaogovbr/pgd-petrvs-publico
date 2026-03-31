import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTenantVersionInterceptor, errorInterceptor } from './infra/http/interceptors';
import { UsuarioService } from 'src/app/v2/services/usuario.service';
import { ProgramaApiService } from 'src/app/v2/services/programa-api.service';
import { TipoModalidadeService } from 'src/app/v2/services/tipo-modalidade.service';
import { PlanoEntregaApiService } from 'src/app/v2/services/plano-entrega-api.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(withInterceptors([authTenantVersionInterceptor, errorInterceptor])),
      UsuarioService,
      ProgramaApiService,
      TipoModalidadeService,
      PlanoEntregaApiService,
      UnidadeService
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./ui/list.page').then(m => m.PlanoTrabalhoV2ListPage)
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./ui/new.page').then(m => m.PlanoTrabalhoV2NewPage)
      },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./ui/edit.page').then(m => m.PlanoTrabalhoV2EditPage)
      }
    ]
  }
];
