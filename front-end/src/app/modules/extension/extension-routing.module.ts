import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: 'popup', component: PopupComponent },
  { path: 'options', component: OptionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionRoutingModule { }
