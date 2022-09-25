import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeRoutingModule } from './change-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeListComponent } from './change-list/change-list.component';
import { ChangeFormComponent } from './change-form/change-form.component';

@NgModule({
  declarations: [
    ChangeListComponent,
    ChangeFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ChangeRoutingModule
  ]
})
export class ChangeModule { }
