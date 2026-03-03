import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoLotacaoRoutingModule } from './relato-lotacao-routing.module';
import { RelatoLotacaoFormComponent } from './relato-lotacao-form/relato-lotacao-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../../uteis/uteis.module';


@NgModule({
  declarations: [
    RelatoLotacaoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RelatoLotacaoRoutingModule,
    UteisModule
  ]
})
export class RelatoLotacaoModule { }
