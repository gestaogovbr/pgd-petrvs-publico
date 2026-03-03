import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiapeRoutingModule } from './siape-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SiapeRoutingModule
  ]
})
export class SiapeModule { }