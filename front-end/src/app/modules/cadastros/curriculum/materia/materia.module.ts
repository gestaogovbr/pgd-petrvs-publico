import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MateriaFormComponent } from './materia-form/materia-form.component';
import { MateriaListComponent } from './materia-list/materia-list.component';
import { MateriaRoutingModule } from './materia-routing.module';



@NgModule({
  declarations: [
    MateriaFormComponent,
    MateriaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    MateriaRoutingModule
    ]  
})
export class MateriaModule { }
