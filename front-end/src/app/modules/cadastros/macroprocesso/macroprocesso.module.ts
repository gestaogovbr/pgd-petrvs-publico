import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MacroprocessoRoutingModule } from './macroprocesso-routing.module';
import { MacroprocessoListComponent } from './macroprocesso-list/macroprocesso-list.component';
import { MacroprocessoFormComponent } from './macroprocesso-form/macroprocesso-form.component';
import {ComponentsModule} from "../../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MacroprocessoListComponent,
    MacroprocessoFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    MacroprocessoRoutingModule
  ]
})
export class MacroprocessoModule { }
