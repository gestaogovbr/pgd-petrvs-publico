import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtensionRoutingModule } from './extension-routing.module';
import { PopupComponent } from './popup/popup.component';
import { OptionsComponent } from './options/options.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PopupComponent,
    OptionsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ExtensionRoutingModule,
    
  ]
})
export class ExtensionModule { }
