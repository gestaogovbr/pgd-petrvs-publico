import { Injectable } from '@angular/core';
import { NotificacaoDaoService } from 'src/app/dao/notificacao-dao.service';
import { Template } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { TemplateDataset } from '../templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  public naoLidas: number = 0;

  public intervalId: any;

  constructor(
    public auth: AuthService,
    public dialog: DialogService,
    public notificacaoService: NotificacaoDaoService,
    public notificacaoDao: NotificacaoDaoService,
    public go: NavigateService
  ) { }

  public updateNaoLidas() {
    if(this.auth.usuario) this.naoLidas = this.auth.usuario.notificacoes_destinatario?.length || 0;
  }

  public heartbeat() {
    this.updateNaoLidas();
    if(!this.intervalId) this.intervalId = setInterval(this.updateNaoLidas.bind(this), 60 * 1000);
  }

  public details(data: any) {
    const template = data.entity as Template;
    this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, template.conteudo!, []);
  }

  public dataset(codigo: string): TemplateDataset[] {
    return []; 
  }

  public titulo(codigo: string): string {
    return "";
  }

  public hint(codigo: string): string {
    return ""; //"Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
  }

  /*public get hintDemandaDistribuicao(): string {
    return 
  }

  public get hintDemandaConclusao(): string {
    return 
  }

  public get hintDemandaAvaliacao(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}";
  }

  public get hintDemandaModificacao(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
  }

  public get hintDemandaComentario(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
  }*/
}
