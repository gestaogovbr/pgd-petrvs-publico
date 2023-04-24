import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';



@NgModule({
  declarations: [],
  imports: [
    NgModule,
    RouterModule,
    AuthGuard,
    ConfigResolver
  ],
  exports:[],
  providers: [],
  bootstrap: []
})
export class RaioxRoutingModule { }
