import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
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
    SharedModule,
    ReactiveFormsModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
