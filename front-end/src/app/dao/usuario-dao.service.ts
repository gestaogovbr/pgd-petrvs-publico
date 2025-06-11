
import { Injectable, Injector } from '@angular/core';
import { Afastamento } from '../models/afastamento.model';
import { Usuario } from '../models/usuario.model';
import { Efemerides, TipoContagem } from '../services/calendar.service';
import { LookupService } from '../services/lookup.service';
import { DaoBaseService } from './dao-base.service';
import { AtividadePausa } from '../models/atividade-pausa.model';
import { PlanoTrabalho } from '../models/plano-trabalho.model';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { PlanoTrabalhoEntrega } from '../models/plano-trabalho-entrega.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDaoService extends DaoBaseService<Usuario> {

  public lookup: LookupService;

  constructor(protected injector: Injector) {
    super("Usuario", injector);
    this.lookup = injector.get<LookupService>(LookupService);
    this.inputSearchConfig.searchFields = ["matricula", "nome"];
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "nome", label: "Nome" },
      { field: "email", label: "E-mail" },
      { field: "cpf", label: "CPF" },
      { field: "matricula", label: "Matrícula" },
      { field: "apelido", label: "Apelido" },
      { field: "telefone", label: "Telefone" },
      { field: "sexo", label: "Sexo", lookup: this.lookup.SEXO },
      { field: "situacao_funcional", label: "Situação Funcional", lookup: this.lookup.USUARIO_SITUACAO_FUNCIONAL },
      { field: "texto_complementar_plano", label: "Mensagem do Plano de trabalho", type: "TEMPLATE"}
    ], deeps);
  }
  
  public calculaDataTempoUnidade(inicio: string, fimOuTempo: string | number, cargaHoraria: number, unidade_id: string, tipo: TipoContagem, pausas?: AtividadePausa[], afastamentos?: Afastamento[]): Promise<Efemerides | undefined> {
    return new Promise<Efemerides | undefined>((resolve, reject) => {
      this.server.post('api/Teste/calculaDataTempoUnidade', { inicio: inicio, fimOuTempo: fimOuTempo, cargaHoraria: cargaHoraria, unidade_id: unidade_id, tipo: tipo, pausas: pausas, afastamentos: afastamentos })
        .subscribe(response => {
          resolve(response.data as Efemerides);
        }, error => {
          console.log("Erro no cálculo das Efemerides pelo servidor!", error);
          resolve(undefined);
        });
    });
  }

  public exportarCPFSIAPE(cpf: string) {
    return this.server.postDownload('api/usuario/exportar-cpf-siape', { cpf });
  }

    public baixaLogSiape(cpf: string) {
    return this.server.postDownload('api/usuario/download-cpf-siape', { cpf });
  }

  public consultarSIAPE(cpf: string) {
    return this.server.post('api/usuario/consultar-cpf-siape', { cpf });
  }



  public atualizaPedagio(data: any) {
    return new Promise<Usuario>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/atualiza-pedagio', { data }).subscribe({
        next: (response) => {
          const usuario = response?.data as Usuario;
          if (usuario) {
            resolve(usuario);
          } else {
            reject(new Error('Invalid response data'));
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  public removePedagio(usuarioId: string) {
    return new Promise<Usuario>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/remove-pedagio', {data: { usuario_id: usuarioId }}).subscribe({
        next: (response) => {
          const usuario = response?.data as Usuario;
          if (usuario) {
            resolve(usuario);
          } else {
            reject(new Error('Invalid response data'));
          }
        },
        error: (error) => reject(error)
      });
    });
  }
  
  public sincronizarSIAPE(cpf: string) {
    return this.server.post('api/usuario/processar-siape', { cpf });
  }
}
