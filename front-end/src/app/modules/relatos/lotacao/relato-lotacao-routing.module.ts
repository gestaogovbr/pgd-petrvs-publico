import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { RelatoLotacaoFormComponent } from './relato-lotacao-form/relato-lotacao-form.component';

const routes: Routes = [
  { path: '', component: RelatoLotacaoFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Relatar problema de lotação de agente público" } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoLotacaoRoutingModule { }
