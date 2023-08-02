import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { PreferenciaFormUsuarioComponent } from './preferencia-form-usuario/preferencia-form-usuario.component';
import { PreferenciaFormComponent } from './preferencia-form/preferencia-form.component';

const routes: Routes = [
  { path: '', component: PreferenciaFormComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Preferências" } },
  { path: 'usuario/:id', component: PreferenciaFormUsuarioComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Preferências do Usuário" } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenciaRoutingModule { }
