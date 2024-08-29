import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { CatalogoFormComponent } from './catalogo-form/catalogo-form.component';
import { CatalogoListComponent } from './catalogo-list/catalogo-list.component';


@NgModule({
  declarations: [
    CatalogoFormComponent,
    CatalogoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CatalogoRoutingModule
  ]
})

export class CatalogoModule { }