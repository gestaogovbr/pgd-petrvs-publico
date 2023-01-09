import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor() { }

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
