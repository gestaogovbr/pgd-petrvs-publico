import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEfemeridesComponent } from './calendar-efemerides/calendar-efemerides.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComentariosWidgetComponent } from './comentarios-widget/comentarios-widget.component';
import { UteisRoutingModule } from './uteis-routing.module';
import { CalendarExpedienteComponent } from './calendar-expediente/calendar-expediente.component';

@NgModule({
  declarations: [
    CalendarEfemeridesComponent,
    ComentariosComponent,
    ComentariosWidgetComponent,
    CalendarExpedienteComponent
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
    CalendarExpedienteComponent
  ]
})
export class UteisModule { }
