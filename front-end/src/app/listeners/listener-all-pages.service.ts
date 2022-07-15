import { Injectable, Injector } from '@angular/core';
import { GlobalsService } from '../services/globals.service';
import { ListenerBase } from './listener-base';

export type DadosSei = {
  processo: {
      id_processo: number,
      tipo_processo: string,
      numero_processo: string,
      assuntos: {[key: string]: string},
      interessados: {[key: string]: string},
      numero: string,
      descricao: string,
      observacoes: string,
      nivel_acesso: string,
      hipotese_legal: string
  } | undefined,
  documento?: {
      id_documento: number,
      numero_documento: number,
      titulo_documento: string,
      tipo_documento: string
      assunto_documento: string,
      prazo_documento: string,
      assinatura_documento: string,
      versao_documento: string,
      data_documento: string
  } | undefined
} | undefined;

@Injectable({
  providedIn: 'root'
})
export class ListenerAllPagesService extends ListenerBase {

  constructor(public injector: Injector) {
    super(injector, "all_pages");
    this.ngOnInit();
  }

  public getButtonTitle(processo?: string, documento?: string): string {
    return documento?.length ? 'Sei nº ' + documento : (processo?.length ? "Processo " + processo : 'Sem processo vinculado');
  }

  public getDadosDocumento(numeroDocumento: string): Promise<DadosSei | undefined> {
    return this.execute<DadosSei | undefined>("getDadosDocumento", [numeroDocumento]);
  }

  public getDadosProcesso(numeroProcesso: string): Promise<DadosSei | undefined> {
    return this.execute<DadosSei | undefined>("getDadosProcesso", [numeroProcesso]);
  }

  public openDocumentoSei(id_processo: number, id_documento?: number) {
    window?.open(this.gb.URL_SEI + "sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=" + id_processo + (id_documento ? "&id_documento=" + id_documento : ""), '_blank')?.focus();
  }

  public visibilidadeMenuSei(visivel: boolean) {
    return this.execute<void>("visibilidadeMenuSei", [visivel]);
  }

  public getTiposProcessos() {
    return this.execute<any[]>("getTiposProcessos", []);
  }

}
