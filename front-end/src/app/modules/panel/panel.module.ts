import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelListComponent } from './panel-list/panel-list.component';
import { PanelLoginComponent } from './panel-login/panel-login.component';
import { PanelFormComponent } from './panel-form/panel-form.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { UteisModule } from '../uteis/uteis.module';
import { PanelListLogsComponent } from './panel-list-logs/panel-list-logs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PanelListComponent,
    PanelLoginComponent,
    PanelFormComponent,
    PanelListLogsComponent
  ],
    imports: [
        CommonModule,
        PanelRoutingModule,
        ComponentsModule,
        UteisModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PanelModule { }
