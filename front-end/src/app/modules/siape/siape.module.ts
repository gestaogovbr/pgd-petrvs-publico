import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiapeRoutingModule } from './siape-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlacklistServidorListComponent } from './blacklist-servidor-list/blacklist-servidor-list.component';

@NgModule({
  declarations: [
    BlacklistServidorListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    SiapeRoutingModule
  ]
})
export class SiapeModule { }