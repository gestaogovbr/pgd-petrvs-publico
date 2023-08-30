import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelListComponent } from './panel-list/panel-list.component';
import { PanelFormComponent } from './panel-form/panel-form.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { UteisModule } from '../uteis/uteis.module';
import { PanelListLogsComponent } from './panel-list-logs/panel-list-logs.component';

@NgModule({
  declarations: [
    PanelListComponent,
    PanelFormComponent,
    PanelListLogsComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ComponentsModule,
    UteisModule
  ]
})
export class PanelModule { }
