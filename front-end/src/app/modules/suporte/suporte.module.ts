import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HomeSuporteComponent } from './home-suporte/home-suporte.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuSuporteComponent } from './menu-suporte/menu-suporte.component';
import { FeedbackComponent } from './feedback/feedback.component';


const routes: Routes = [
  {
    path: '', component: HomeSuporteComponent,
    children: [
      {
        path: '', component: MenuSuporteComponent
      }
    ]
  },
  {
    path: 'feedback', component: FeedbackComponent
  }
]

@NgModule({
  declarations: [
    HomeSuporteComponent,
    MenuSuporteComponent,
    FeedbackComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    PanelMenuModule,
    SharedModule,
  ]
})
export class SuporteModule { }
