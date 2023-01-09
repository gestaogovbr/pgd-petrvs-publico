import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdesaoRoutingModule } from './adesao-routing.module';
import { AdesaoListComponent } from './adesao-list/adesao-list.component';
import { AdesaoFormComponent } from './adesao-form/adesao-form.component';
import {ComponentsModule} from "../../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UteisModule} from "../../uteis/uteis.module";
import { AdesaoFormTermoComponent } from './adesao-form-termo/adesao-form-termo.component';


@NgModule({
  declarations: [
    AdesaoListComponent,
    AdesaoFormComponent,
    AdesaoFormTermoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    UteisModule,
    AdesaoRoutingModule
  ]
})
export class AdesaoModule { }
