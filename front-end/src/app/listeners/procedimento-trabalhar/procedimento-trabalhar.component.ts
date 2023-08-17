import { Component, Injector, OnInit } from '@angular/core';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { Base } from 'src/app/models/base.model';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { Documento } from 'src/app/models/documento.model';
import { PlanoTrabalhoListComponent } from 'src/app/modules/gestao/plano-trabalho/plano-trabalho-list/plano-trabalho-list.component';
import { AtividadeListGridComponent } from 'src/app/modules/gestao/atividade/atividade-list-grid/atividade-list-grid.component';
import { AtividadeListComponent } from 'src/app/modules/gestao/atividade/atividade-list/atividade-list.component';
import { ListenerBase } from '../listener-base';

export type TipoDocumentoSei = {codigo: string, nome: string};
export type InclusaoDocumentoSei = {id_processo: number, id_documento: number, numero_processo: string, urlEditor: string, idUser: string, urlReload: string};
export type SeiKeys = {id_processo: number, numero_processo: string, id_documento?: number, numero_documento?: string};

@Component({
  selector: 'app-procedimento-trabalhar',
  templateUrl: './procedimento-trabalhar.component.html',
  styleUrls: ['./procedimento-trabalhar.component.scss']
})
export class ProcedimentoTrabalharComponent extends ListenerBase {

  public tipoDocumentoDao: TipoDocumentoDaoService;
  public dao: EntidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, "procedimento_trabalhar");
    this.dao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
  }

  public async loadToolbarButtons(buttons: string[]) {
    let toolbarButtons = [];

    if(buttons.includes("plano")) {
      toolbarButtons.push({
        icon: "bi bi-list-check",
        color: "btn-outline-primary",
        hint: "Gerar termo de adesão",
        onClick: this.gerarTermoAdesao.bind(this) 
      });
    }
    if(buttons.includes("entrega")) {
      let menu = [];
      if(buttons.includes("concluir_entrega")) {
        menu.push({
          icon: "bi bi-check-circle",
          color: "btn-outline-primary",
          label: "Concluir " + this.lex.translate("entrega"),
          onClick: this.concluirEntrega.bind(this) 
        });
      }
      toolbarButtons.push({
        icon: "bi bi-boxes",
        color: "btn-outline-secondary",
        hint: "Incluir " + this.lex.translate("entrega"),
        onClick: this.incluirEntrega.bind(this),
        items: menu.length ? menu : undefined
      });
    }
    if(buttons.includes("atualizar")) {
      toolbarButtons.push({
        icon: "bi bi-file-check",
        color: "btn-outline-warning",
        hint: "Atualizar tipos de documentos",
        onClick: this.atualizarTiposDocumentos.bind(this) 
      });
    }
    if(buttons.find(x => ["incluir", "concluir", "atividades"].includes(x))) {
      let menu = [];
      if(buttons.includes("incluir")) {
        menu.push({
          icon: "bi bi-plus-circle",
          color: "btn-outline-primary",
          label: "Incluir " + this.lex.translate("atividade"),
          onClick: this.incluirAtividade.bind(this) 
        });
      }        
      if(buttons.includes("concluir")) {
        menu.push({
          icon: "bi bi-check-circle",
          color: "btn-outline-primary",
          label: "Concluir " + this.lex.translate("atividade"),
          onClick: this.concluirAtividade.bind(this) 
        });
      }
      toolbarButtons.push({
        icon: "bi bi-activity",
        color: "btn-outline-success",
        hint: this.lex.translate("atividade"),
        onClick: this.atividades.bind(this),
        items: menu.length ? menu : undefined
      });
    }
    this.gb.toolbarButtons = toolbarButtons;
  }

  public async incluirAtividade() {
    let keys = await this.execute<SeiKeys | null>("getSeiKeys", []);
    if(keys) this.go.navigate({route: ["gestao", "atividade", "new"]}, {metadata: {sei: keys}, modal: true});
  }

  public async atividades() {
    let keys = await this.execute<SeiKeys | null>("getProcessoKeys", []);
    if(keys) {
      this.go.navigate({route: ["gestao", "atividade"], params: {filter: {numero_processo: keys.numero_processo}}}, {modal: true, modalWidth: 1200});
    }
  }

  public async concluirAtividade() {
    let keys = await this.execute<SeiKeys | null>("getDocumentKeys", []);
    if(keys) {
      const selected = await AtividadeListGridComponent.modalSelect({fixedFilter: [["status", "==", "INICIADO"]]});
      if(selected) {
        if(selected.metadados?.pausado) {
          if(await this.dialog.confirm("Atividade pausada", "Para concluir é necessário primeiro reiniciar a atividade. Deseja reiniciar?")) {
            this.go.navigate({route: ['gestao', 'atividade', selected.id, 'pausar'], params: {reiniciar: true}}, {
              modal: true, 
              modalClose: (modalResult?: string) => {
                if(modalResult?.length) this.go.navigate({route: ['gestao', 'atividade', selected.id, 'concluir']}, { modal: true });
              }
            });
          }
        } else {
          this.go.navigate({route: ['gestao', 'atividade', selected.id, 'concluir']}, { modal: true });
        }
      }
    }
  }

  public async concluirEntrega() {
    let keys = await this.execute<SeiKeys | null>("getProcessoKeys", []);
    if(keys) {
      this.go.navigate({route: ['gestao', 'atividade', 'entrega', 'concluir'], params: {id_processo: keys.id_processo}}, {modal: true});
    }
  }

  public async incluirEntrega() {
    let keys = await this.execute<SeiKeys | null>("getSeiKeys", []);
    if(keys) {
      const selected = await AtividadeListGridComponent.modalSelect({fixedFilter: [["status", "==", "NAOCONCLUIDO"]]});
      if(selected) {
        const entrega = new AtividadeTarefa();
        entrega.id = this.dao.generateUuid();
        entrega.usuario = this.auth.usuario;
        entrega.usuario_id = this.auth.usuario!.id;
        entrega.atividade_id = selected.id || "";
        entrega.comentarios = [];
        entrega._status = "ADD";
        this.go.navigate({route: ['gestao', 'atividade', 'tarefa']}, {metadata: {entrega: entrega, atividade: selected, sei: keys}, modalClose: (modalResult) => {
          if(modalResult) {
            (async () => {
              try {
                const dao = this.injector.get<AtividadeTarefaDaoService>(AtividadeTarefaDaoService);
                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                await dao.save(modalResult);
              } catch (error: any) {
                this.dialog.alert("Error", error.message ? error.message : error);
              } finally {
                this.dialog.closeSppinerOverlay();
              }
            })();
          }
        }});
      }
    }
  }

  public async gerarTermoAdesao() {
    //const plano = new PlanoListComponent(this.injector, new PlanoDaoService(this.injector));
    const selected = await PlanoTrabalhoListComponent.modalSelect();
    if(selected) {
      let processo = await this.execute<SeiKeys>("getProcessoKeys", []);
      this.go.navigate({route: ['gestao', 'plano-trabalho', 'termo']}, {metadata: {plano: selected, processo: processo}, modalClose: (modalResult) => {
        if(modalResult?.termo?.length) {
          (async () => {
            this.dialog.showSppinerOverlay("Gerando documento no sei...");
            try {
              const documentoSei = await this.execute<InclusaoDocumentoSei | null>("incluirDocumento", [processo.id_processo, modalResult.codigo_tipo_documento]); 
              if(documentoSei) {
                const dao = this.injector.get<DocumentoDaoService>(DocumentoDaoService);
                const documento = Object.assign(new Documento(), {
                  especie: "TCR",
                  conteudo: modalResult?.termo,
                  id_processo: processo.id_processo,
                  id_documento: documentoSei.id_documento,
                  numero_processo: documentoSei.numero_processo,
                  plano_trabalho_id: selected.id,
                  tipo_documento_id: modalResult.tipo_documento_id,
                  status: "AGUARDANDO_SEI"
                });
                await dao.save(documento);
                await this.execute<void>("recarregarArvore", [documentoSei.urlReload]);
                await this.execute<InclusaoDocumentoSei | null>("abrirEditor", [documentoSei.urlEditor, documentoSei.idUser]);
              }
            } catch (error: any) {
              this.dialog.alert("Error", error.message ? error.message : error);
            } finally {
              this.dialog.closeSppinerOverlay();
            }
          })();
        }
      }});
    }
  }

  public async atualizarTiposDocumentos() {
    let tiposDocumentos = await this.execute<TipoDocumentoSei[]>("getTiposDocumentos", []);
    if(await this.tipoDocumentoDao.atualizar(tiposDocumentos)) {
      this.dialog.alert("Atualização", "Atualização realizada com sucesso!");
    } else {
      this.dialog.alert("ERROR", "Aconteceu algum problema ao tentar realizar a atualização!");
    }
  }

}
