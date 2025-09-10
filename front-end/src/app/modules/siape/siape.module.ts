import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiapeRoutingModule } from './siape-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    SiapeRoutingModule
  ]
})
export class SiapeModule { }