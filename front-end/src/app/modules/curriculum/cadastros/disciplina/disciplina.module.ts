import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { DisciplinaRoutingModule } from './disciplina-routing.module';
import { DisciplinaFormComponent } from '../disciplina/disciplina-form/disciplina-form.component';
import { DisciplinaListComponent } from '../disciplina/disciplina-list/disciplina-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DisciplinaFormComponent,
    DisciplinaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    DisciplinaRoutingModule
  ]
})
export class DisciplinaModule { }
