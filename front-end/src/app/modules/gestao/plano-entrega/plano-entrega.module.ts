import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanoEntregaRoutingModule } from './plano-entrega-routing.module';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaListEntregaComponent } from './plano-entrega-list-entrega/plano-entrega-list-entrega.component';
import { PlanoEntregaMapaEntregasComponent } from './plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component';
<<<<<<< front-end/src/app/modules/gestao/plano-entrega/plano-entrega.module.ts
import { PlanoEntregaFormEntregaComponent } from './plano-entrega-form-entrega/plano-entrega-form-entrega.component';
=======
import { PlanoEntregaAdesaoComponent } from './plano-entrega-adesao/plano-entrega-adesao.component';
>>>>>>> front-end/src/app/modules/gestao/plano-entrega/plano-entrega.module.ts

@NgModule({
  declarations: [
    PlanoEntregaListComponent,
    PlanoEntregaFormComponent,
    PlanoEntregaListEntregaComponent,
<<<<<<< front-end/src/app/modules/gestao/plano-entrega/plano-entrega.module.ts
    PlanoEntregaMapaEntregasComponent,
    PlanoEntregaFormEntregaComponent
=======
    PlanoEntregaEntregaFormComponent,
    PlanoEntregaEntregaListComponent,
    PlanoEntregaAdesaoComponent,
    PlanoEntregaMapaEntregasComponent
>>>>>>> front-end/src/app/modules/gestao/plano-entrega/plano-entrega.module.ts
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule
  ]
})
export class PlanoEntregaModule { }
