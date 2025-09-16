import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { ConfigComponent } from './modules/config/config.component';
import { DialogComponent } from './services/dialog/dialog.component';
import { SpinnerOverlayComponent } from './services/spinner-overlay/spinner-overlay.component';
import { ComponentsModule } from './components/components.module';
import { TesteImpersonateComponent } from './modules/teste/teste-impersonate/teste-impersonate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogModule } from './modules/logs/log.module';
import { UteisModule } from './modules/uteis/uteis.module';
import { RotinaModule } from './modules/rotinas/rotina.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from './interceptors/errors-interceptor';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfigComponent,
    DialogComponent,
    SpinnerOverlayComponent,
    TesteImpersonateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    AppRoutingModule,
    UteisModule,
    LogModule,
    RotinaModule,
    NgScrollbarModule,
    DynamicDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

