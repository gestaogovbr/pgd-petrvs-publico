import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEfemeridesComponent } from './calendar-efemerides/calendar-efemerides.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComentariosWidgetComponent } from './comentarios-widget/comentarios-widget.component';
import { UteisRoutingModule } from './uteis-routing.module';
import { CalendarExpedienteComponent } from './calendar-expediente/calendar-expediente.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { TemplatesComponent } from './templates/templates.component';
import { AssinarComponent } from './documentos/assinar/assinar.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';

@NgModule({
  declarations: [
    CalendarEfemeridesComponent,
    ComentariosComponent,
    ComentariosWidgetComponent,
    CalendarExpedienteComponent,
    DocumentosComponent,
    TemplatesComponent,
    AssinarComponent,
    NotificacoesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UteisRoutingModule
  ],
  exports: [
    CalendarEfemeridesComponent,
    ComentariosComponent,
    ComentariosWidgetComponent,
    CalendarExpedienteComponent,
    DocumentosComponent,
    TemplatesComponent,
    NotificacoesComponent
  ]
})
export class UteisModule { }
