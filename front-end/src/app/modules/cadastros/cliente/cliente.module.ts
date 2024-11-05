import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/components/components.module";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";
import { ClienteFormComponent } from "./cliente-form/cliente-form.component";
import { ClienteRoutingModule } from "./cliente-rounting.module";

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
