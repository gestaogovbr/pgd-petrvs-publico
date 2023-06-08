import { Injectable } from '@angular/core';
import { NotificacaoDaoService } from 'src/app/dao/notificacao-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NavigateService } from 'src/app/services/navigate.service';

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
    if(this.auth.usuario) this.notificacaoService.naoLidas().then((naoLidas) => this.naoLidas = naoLidas);
  }

  public hartBeat() {
    this.updateNaoLidas();
    if(!this.intervalId) this.intervalId = setInterval(this.updateNaoLidas.bind(this), 60 * 1000);
  }

  public get hintDemandaDistribuicao(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}";
  }

  public get hintDemandaConclusao(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
  }

  public get hintDemandaAvaliacao(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}";
  }

  public get hintDemandaModificacao(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
  }

  public get hintDemandaComentario(): string {
    return "Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
  }

}
