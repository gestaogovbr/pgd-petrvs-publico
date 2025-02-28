import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ConsultaCpfSiapeFormComponent } from './consulta-cpf-siape-form/consulta-cpf-siape-form.component';
import { ConsultaUnidadeSiapeFormComponent } from './consulta-unidade-siape-form/consulta-unidade-siape-form.component';

const routes: Routes = [
  { path: '/consulta-siape', component: ConsultaCpfSiapeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "" } },
  { path: '/consulta-unidade', component: ConsultaUnidadeSiapeFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "" } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
