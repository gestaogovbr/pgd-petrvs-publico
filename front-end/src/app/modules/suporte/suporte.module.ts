import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HomeSuporteComponent } from './home-suporte/home-suporte.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MenuSuporteComponent } from './menu-suporte/menu-suporte.component';


const routes: Routes = [
  {
    path: '', component: HomeSuporteComponent,
    children: [
      {
        path: '', component: MenuSuporteComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomeSuporteComponent,
    MenuSuporteComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    PanelMenuModule,
    ComponentsModule,
  ]
})
export class SuporteModule { }
