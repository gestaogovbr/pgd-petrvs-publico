import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlacklistServidorListComponent } from './blacklist-servidor-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

const routes: Routes = [
  {
    path: '',
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
  declarations: [
    BlacklistServidorListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BlacklistServidorListModule { }