import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeSuporteComponent } from './home-suporte/home-suporte.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuSuporteComponent } from './menu-suporte/menu-suporte.component';
import { FeedbackComponent } from './feedback/feedback.component';


const routes: Routes = [
  {
    path: '', component: MenuSuporteComponent,
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
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ]
})
export class SuporteModule { }
