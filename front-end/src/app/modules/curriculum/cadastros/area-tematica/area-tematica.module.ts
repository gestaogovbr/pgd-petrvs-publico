import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AreaTematicaRoutingModule } from './area-tematica-routing.module';
import { AreaTematicaFormComponent } from './area-tematica-form/area-tematica-form.component';
import { AreaTematicaListComponent } from './area-tematica-list/area-tematica-list.component';




@NgModule({
  declarations: [
    AreaTematicaFormComponent,
    AreaTematicaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    AreaTematicaRoutingModule
    ]  
})
export class AreaTematicaModule { }
