import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AreaConhecimentoFormComponent } from './area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from './area-conhecimento-list/area-conhecimento-list.component';
import { AreaConhecimentoRoutingModule } from './area-conhecimento-routing.module';



@NgModule({
  declarations: [
    AreaConhecimentoFormComponent,
    AreaConhecimentoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    AreaConhecimentoRoutingModule
    ]  
})
export class AreaConhecimentoModule { }
