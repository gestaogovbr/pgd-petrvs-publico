import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRoutingModule } from './log-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeListComponent } from './change/change-list/change-list.component';
import { ChangeFormComponent } from './change/change-form/change-form.component';

@NgModule({
  declarations: [
    ChangeListComponent,
    ChangeFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    LogRoutingModule
  ]
})
export class LogModule { }
