import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ConsultaCpfSiapeFormComponent } from './consulta-cpf-siape-form/consulta-cpf-siape-form.component';
import { ConsultaUnidadeSiapeFormComponent } from './consulta-unidade-siape-form/consulta-unidade-siape-form.component';
import { ConsultaCpfSiapeResultComponent } from './consulta-cpf-siape-result/consulta-cpf-siape-result.component';

const routes: Routes = [
  { 
    path: 'unidade-siape',
    component: ConsultaUnidadeSiapeFormComponent, 
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Consulta SIAPE por Unidade"
    } 
  },
  { 
    path: 'cpf-siape',
    component: ConsultaCpfSiapeFormComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
    },
  },
  { 
    path: 'cpf-siape-result',
    component: ConsultaCpfSiapeResultComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      modal: true,
      title: "Consulta SIAPE por CPF - Resultados",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
