import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { ConfigComponent } from './modules/config/config.component';
import { DialogComponent } from './services/dialog/dialog.component';
import { SpinnerOverlayComponent } from './services/spinner-overlay/spinner-overlay.component';
import { ComponentsModule } from './components/components.module';
import { TesteComponent } from './modules/teste/teste.component';
import { TesteImpersonateComponent } from './modules/teste/teste-impersonate/teste-impersonate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogModule } from './modules/logs/log.module';
import { UteisModule } from './modules/uteis/uteis.module';
import { RotinaModule } from './modules/rotinas/rotina.module';
import { TesteFormComponent } from './modules/teste/teste-form/teste-form.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigComponent,
    DialogComponent,
    SpinnerOverlayComponent,
    TesteComponent,
    TesteFormComponent,
    TesteImpersonateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    AppRoutingModule,
    NgChartsModule,
    UteisModule,
    LogModule,
    RotinaModule,
    NgScrollbarModule,
    DynamicDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

