import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { BlacklistServidorListComponent } from './blacklist-servidor-list/blacklist-servidor-list.component';

const routes: Routes = [
  { 
    path: 'blacklist-servidor',
    component: BlacklistServidorListComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Blacklist de Servidores SIAPE",
      modal: false
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiapeRoutingModule { }