import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlacklistUnidadeListComponent } from './blacklist-unidade-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';

const routes: Routes = [
  {
    path: '',
    component: BlacklistUnidadeListComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Blacklist de Unidades SIAPE',
      modal: false
    }
  }
];

@NgModule({
  declarations: [
    BlacklistUnidadeListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BlacklistUnidadeListModule { }