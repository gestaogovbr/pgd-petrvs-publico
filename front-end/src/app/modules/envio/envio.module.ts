import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../uteis/uteis.module';
import { EnvioRoutingModule } from './envio-routing.module';
import { EnvioPlanoTrabalhoListComponent } from './envio-plano-trabalho-list/envio-plano-trabalho-list.component';
import { EnvioPlanoEntregaListComponent } from './envio-plano-entrega-list/envio-plano-entrega-list.component';
import { EnvioConsultaComponent } from './envio-consulta/envio-consulta.component';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';


@NgModule({
  declarations: [
    EnvioPlanoEntregaListComponent,
    EnvioPlanoTrabalhoListComponent,
    EnvioConsultaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    EnvioRoutingModule,
    UteisModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent
  ],
  providers: [
    BreadcrumbService
  ]
})
export class EnvioModule { }
