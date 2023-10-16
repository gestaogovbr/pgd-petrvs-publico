import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoCursoListComponent } from './tipo-curso-list/tipo-curso-list.component';
import { TipoCursoFormComponent } from './tipo-curso-form/tipo-curso-form.component';
import { TipoCursoRoutingModule } from './tipo-curso-routing.module';

@NgModule({
  declarations: [
    TipoCursoListComponent,
    TipoCursoFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TipoCursoRoutingModule
    ]  
})
export class TipoCursoModule { }
