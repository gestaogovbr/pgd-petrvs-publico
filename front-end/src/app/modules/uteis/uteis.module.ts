import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEfemeridesComponent } from './calendar-efemerides/calendar-efemerides.component';
import { ComentariosComponent } from './comentarios/comentarios.component';



@NgModule({
  declarations: [
    CalendarEfemeridesComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarEfemeridesComponent,
    ComentariosComponent
  ]
})
export class UteisModule { }
