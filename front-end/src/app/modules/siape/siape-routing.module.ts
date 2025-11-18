import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'blacklist-servidor',
    loadChildren: () => import('./blacklist-servidor-list/blacklist-servidor-list.module').then(m => m.BlacklistServidorListModule)
  },
  {
    path: 'blacklist-unidade',
    loadChildren: () => import('./blacklist-unidade-list/blacklist-unidade-list.module').then(m => m.BlacklistUnidadeListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiapeRoutingModule { }