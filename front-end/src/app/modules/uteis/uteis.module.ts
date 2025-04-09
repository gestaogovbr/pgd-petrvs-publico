import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEfemeridesComponent } from './calendar-efemerides/calendar-efemerides.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComentariosWidgetComponent } from './comentarios/comentarios-widget/comentarios-widget.component';
import { UteisRoutingModule } from './uteis-routing.module';
import { CalendarExpedienteComponent } from './calendar-expediente/calendar-expediente.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { TemplatesComponent } from './templates/templates.component';
import { DocumentosAssinarComponent } from './documentos/documentos-assinar/documentos-assinar.component';
import { DocumentosLinkComponent } from './documentos/documentos-link/documentos-link.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { NotificacoesConfigComponent } from './notificacoes/notificacoes-config/notificacoes-config.component';
import { NotificacoesTemplateComponent } from './notificacoes/notificacoes-template/notificacoes-template.component';
import { DocumentosBadgeComponent } from './documentos/documentos-badge/documentos-badge.component';
import { StatusFormComponent } from './status/status-form/status-form.component';
import { AvaliarComponent } from './avaliar/avaliar.component';
import { VisualizarAvaliacaoComponent } from './visualizar-avaliacao/visualizar-avaliacao.component';
import { AvaliarNotaInputComponent } from './avaliar/avaliar-nota-input/avaliar-nota-input.component';
import { AvaliarNotaBadgeComponent } from './avaliar/avaliar-nota-badge/avaliar-nota-badge.component';
import { PlanejamentoShowComponent } from './planejamento-show/planejamento-show.component';
import { ColunasComponent } from './colunas/colunas.component';
import { RelatoriosTemplateComponent } from './relatorios/relatorios-template/relatorios-template.component';
import { DocumentosPreviewComponent } from './documentos/documentos-preview/documentos-preview.component';
import { FazerRecursoComponent } from './avaliar/fazer-recurso/fazer-recurso.component';

@NgModule({
  declarations: [
    CalendarEfemeridesComponent,
    ComentariosComponent,
    ComentariosWidgetComponent,
    CalendarExpedienteComponent,
    DocumentosComponent,
    TemplatesComponent,
    DocumentosAssinarComponent,
    DocumentosLinkComponent,
    DocumentosBadgeComponent,
    NotificacoesComponent,
    NotificacoesConfigComponent,
    NotificacoesTemplateComponent,
    StatusFormComponent,
    AvaliarComponent,
    VisualizarAvaliacaoComponent,
    AvaliarNotaInputComponent,
    AvaliarNotaBadgeComponent,
    ColunasComponent,
    PlanejamentoShowComponent,
    RelatoriosTemplateComponent,
    DocumentosPreviewComponent,
    FazerRecursoComponent
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
    DocumentosLinkComponent,
    DocumentosBadgeComponent,
    TemplatesComponent,
    NotificacoesComponent,
    NotificacoesConfigComponent,
    NotificacoesTemplateComponent,
    AvaliarComponent,
    VisualizarAvaliacaoComponent,
    AvaliarNotaInputComponent,
    AvaliarNotaBadgeComponent,
    ColunasComponent,
    PlanejamentoShowComponent,
    RelatoriosTemplateComponent,
    DocumentosPreviewComponent
  ]
})
export class UteisModule { }
