import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CargoFormComponent } from './cargo-form/cargo-form.component';
import { CargoListComponent } from './cargo-list/cargo-list.component';
import { CargoRoutingModule } from './cargo-routing.module';


@NgModule({
  declarations: [
    CargoFormComponent,
    CargoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CargoRoutingModule
    ]  
})
export class CargoModule { }
