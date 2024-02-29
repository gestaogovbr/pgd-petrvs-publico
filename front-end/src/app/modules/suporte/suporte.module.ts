import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentacaoComponent } from './documentacao/documentacao.component';
import { MarkdownModule } from 'ngx-markdown';
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
      },
      {
        path: 'documentacao', component: DocumentacaoComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    DocumentacaoComponent,
    HomeSuporteComponent,
    MenuSuporteComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    PanelMenuModule,
    ComponentsModule,
    MarkdownModule.forRoot()
  ]
})
export class SuporteModule { }
