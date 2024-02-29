import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncaoListComponent } from './funcao-list/funcao-list.component';
import { FuncaoFormComponent } from './funcao-form/funcao-form.component';
import { FuncaoRoutingModule } from './funcao-routing.module';



@NgModule({
  declarations: [
    FuncaoListComponent,
    FuncaoFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FuncaoRoutingModule
    ]  
})
export class FuncaoModule { }
