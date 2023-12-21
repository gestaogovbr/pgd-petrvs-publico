import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesdobramentoComponent } from './desdobramento.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { OrganizationChartModule } from 'primeng/organizationchart';

const routes: Routes = [
  { path: ':id/:type', component: DesdobramentoComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Desdobramento", modal: true } }
]

@NgModule({
  declarations: [
    DesdobramentoComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    OrganizationChartModule
  ]
})
export class DesdobramentoModule { }
