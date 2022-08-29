import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { Demanda } from 'src/app/models/demanda.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { InputButtonComponent } from 'src/app/components/input/input-button/input-button.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TarefaDaoService } from 'src/app/dao/tarefa-dao.service';
import { DemandaEntregaDaoService } from 'src/app/dao/demanda-entrega-dao.service';
import { DemandaEntrega } from 'src/app/models/demanda-entrega.model';
import { Comentario } from 'src/app/models/comentario';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { LookupItem } from 'src/app/services/lookup.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { Tarefa } from 'src/app/models/tarefa.model';
import { SeiKeys } from 'src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-demanda-form-entrega',
  templateUrl: './demanda-form-entrega.component.html',
  styleUrls: ['./demanda-form-entrega.component.scss']
})
export class DemandaFormEntregaComponent extends PageFormBase<DemandaEntrega, DemandaEntregaDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: GridComponent;
  @ViewChild('tarefa', { static: false }) public tarefa?: InputSearchComponent;
  @ViewChild('procEntregue', { static: false }) public procEntregue?: InputButtonComponent;
  @ViewChild('docEntregue', { static: false }) public docEntregue?: InputButtonComponent;
  @ViewChild('tipoProcesso', { static: false }) public tipoProcesso?: InputSearchComponent;
  @ViewChild('tipoDocumento', { static: false }) public tipoDocumento?: InputSearchComponent;

  public tarefaDao: TarefaDaoService;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;
  public demanda?: Demanda;
  public sei?: SeiKeys;
  public allPages: ListenerAllPagesService;
  public comentario: ComentarioService;
  public form: FormGroup;
  public formComentarios: FormGroup;
  public modalWidth: number = 800;
  public comentarioTipos: LookupItem[];

  constructor(public injector: Injector) {
    super(injector, DemandaEntrega, DemandaEntregaDaoService);
    this.tarefaDao = injector.get<TarefaDaoService>(TarefaDaoService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.comentarioTipos = this.lookup.COMENTARIO_TIPO.filter(x => ["COMENTARIO", "TECNICO"].includes(x.key));
    this.title = this.lex.noun("Entrega");
    this.form = this.fh.FormBuilder({
      descricao: {default: ""},
      tarefa_id: {default: null},
      tempo_estimado: {default: 0},
      concluido: {default: false},
      id_processo: {default: 0},
      numero_processo: {default: ""},
      id_documento: {default: 0},
      numero_documento: {default: ""},
      titulo_documento: {default: ""},
      tipo_documento_id: {default: null},
      tipo_processo_id: {default: null},
      comentarios: {default: []}
    }, this.cdRef, this.validate);
    this.formComentarios = this.fh.FormBuilder({
      texto: {default: ""},
      tipo: {default: "COMENTARIO"},
      privacidade: {default: "PUBLICO"}
    }, this.cdRef, this.validateComentario);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(["descricao"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "tarefa_id" && !control.value?.length && this.form?.controls.concluido.value) {
      result = "Obrigatório para concluir";
    }

    return result;
  }

  public formValidation = (form?: FormGroup) => {
    const values = form!.value;
    if(!this.isComentarios) {
      if(values.tarefa_id?.length && !this.tarefa?.searchObj) {
        return "Aguarde o carregamento " + this.lex.noun("tarefa", false, true) + ". Caso demore, selecione novamente!";
      }
      if(values.concluido && (this.tarefa?.searchObj as Tarefa)?.documental && !values.id_documento) {
        return this.gb.isExtension ? "Obrigatório selecionar um arquivo para a tarefa selecionada!" : "Utilize o sistema como extensão para concluir!";
      }
    }
    return undefined;
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = segment == "comentar" ? segment : this.action;
  }

  public get isComentarios(): boolean {
    return this.action == "comentar";
  }

  public async onNumeroProcessoClick(event: Event) {
    const numeroProcesso = this.form?.controls.numero_processo?.value;
    if(numeroProcesso?.length) {
      this.procEntregue!.loading = true;
      try {
        let dados = await this.allPages.getDadosProcesso(numeroProcesso);
        if(dados) {
          let tipo_processo_id = null;
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["codigo", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) {
              this.tipoProcesso?.loadSearch(tipo_processo[0]);
              tipo_processo_id = tipo_processo[0].id;
            }
          }
          this.form.controls.id_processo.setValue(dados.processo?.id_processo);
          this.form.controls.numero_processo.setValue(dados.processo?.numero_processo);
          this.form.controls.id_documento.setValue(0);
          this.form.controls.numero_documento.setValue("");
          this.form.controls.titulo_documento.setValue("");
          this.form.controls.tipo_documento_id.setValue(null);
          this.form.controls.tipo_processo_id.setValue(tipo_processo_id);
        } else {
          throw new Error("Processo não encontrado");
        }
      } catch (error) {
        this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente incluir diretamente pelo botão 'Incluir demanda' acessando o processo no Sei!")
      } finally {
        this.procEntregue!.loading = false;
      }
    }
  }

  public async onNumeroDocumentoClick(event: Event) {
    const numeroDocumento = this.form?.controls.numero_documento?.value;
    if(numeroDocumento?.length) {
      this.docEntregue!.loading = true;
      try {
        let dados = await this.allPages.getDadosDocumento(numeroDocumento);
        if(dados) {
          let tipo_processo_id = null;
          let tipo_documento_id = null;
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["codigo", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) {
              this.tipoProcesso?.loadSearch(tipo_processo[0]);
              tipo_processo_id = tipo_processo[0].id;
            }
          }
          if(dados.documento?.tipo_documento) {
            const tipo_documento = await this.tipoDocumentoDao.query({where: [["nome", "=", dados.documento?.tipo_documento]]}).asPromise();
            if(tipo_documento[0]) {
              this.tipoDocumento?.loadSearch(tipo_documento[0]);
              tipo_documento_id = tipo_documento[0].id;
            }
          }
          this.form.controls.id_processo.setValue(dados.processo?.id_processo);
          this.form.controls.numero_processo.setValue(dados.processo?.numero_processo);
          this.form.controls.id_documento.setValue(dados.documento?.id_documento);
          this.form.controls.numero_documento.setValue(dados.documento?.numero_documento);
          this.form.controls.titulo_documento.setValue(dados.documento?.titulo_documento);
          this.form.controls.tipo_documento_id.setValue(tipo_documento_id);
          this.form.controls.tipo_processo_id.setValue(tipo_processo_id);
        } else {
          throw new Error("Documento não encontrado");
        }
      } catch (error) {
        this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente incluir diretamente pelo botão 'Incluir demanda' acessando o documento no Sei!")
      } finally {
        this.docEntregue!.loading = false;
      }
    }
  }

  public validateComentario = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "texto" && !control.value?.length) {
      result = "Não pode ser em branco";
    }
    return result;
  }

  public async loadData(entity: DemandaEntrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    await this.tarefa?.loadSearch(entity.tarefa || formValue.tarefa_id);
    if(this.sei) {
      formValue.id_processo = this.sei.id_processo || 0;
      formValue.numero_processo = this.sei.numero_processo || "";
      formValue.id_documento = this.sei.id_documento || 0;
      formValue.numero_documento = this.sei.numero_documento || "";
    }
    form.patchValue(formValue);
    if(this.sei?.numero_documento) {
      this.onNumeroDocumentoClick(new Event('click'));
    } else if(this.sei?.numero_processo) {
      this.onNumeroProcessoClick(new Event('click'));
    }
  }

  public async initializeData(form: FormGroup) {
    this.entity = this.metadata.entrega;
    this.demanda = this.metadata.demanda;
    this.sei = this.metadata.sei;
    await this.loadData(this.entity!, form);
  }

  /*public async onNumeroDocumentoEntregaClick(event: Event) {
    const numeroDocumentoEntregue = this.form?.controls.numero_documento?.value;
    if(numeroDocumentoEntregue?.length) {
      this.docEntregue!.loading = true;
      try {
        let dados = await this.allPages.getDadosDocumento(numeroDocumentoEntregue);
        if(dados) {
          let tipo_documento_id = null;
          let tipo_processo_id = null;
          if(dados.documento?.tipo_documento) {
            const tipo_documento = await this.tipoDocumentoDao.query({where: [["codigo", "=", dados.documento?.tipo_documento]]}).asPromise();
            if(tipo_documento[0]) tipo_documento_id = tipo_documento[0].id;
          }
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["nome", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) tipo_processo_id = tipo_processo[0].id;
          }
          this.form.controls.id_processo.setValue(dados?.processo?.id_processo);
          this.form.controls.numero_processo.setValue(dados?.processo?.numero_processo);
          this.form.controls.id_documento.setValue(dados?.documento?.id_documento);
          this.form.controls.tipo_processo_id.setValue(tipo_processo_id);
          this.form.controls.tipo_documento_id.setValue(tipo_documento_id);
          this.form.controls.numero_documento.setValue(dados?.documento?.numero_documento);
          this.form.controls.titulo_documento.setValue(dados?.documento?.titulo_documento);
        } else {
          throw new Error("Documento não encontrado");
        }
      } catch(error) {
        this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente concluir diretamente pelo botão 'Concluir' acessando o documento no Sei!")
      } finally {
        this.docEntregue!.loading = false;
      }
    }
  }*/

  public async saveData(form: IIndexable) {
    this.util.fillForm(this.entity, this.form!.value);
    this.entity!.tarefa = this.tarefa?.searchObj;
    this.entity!.comentarios = this.entity!.comentarios.filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
    if(this.isComentarios) await this.dao?.update(this.entity!.id, { comentarios: this.entity!.comentarios });
    return new NavigateResult(this.entity);
  }

  public comentarioDynamicOptions(row: any): ToolbarButton[] {
    return [{
      label: "Comentar",
      icon: "bi bi-chat-left-quote",
      onClick: (comentario: Comentario) => {
        this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!, comentario);
      }
    }];
  }

  /*public comentarioLevel(comentario: Comentario): string[] {
    return (comentario.path || "").split("").filter(x => x == "/");
  }

  public orderComentarios(comentarios?: Comentario[]) {
    let ordered = comentarios?.sort((a: Comentario, b: Comentario) => {
      if(a.path == b.path) { /* Situação 1: Paths iguais 
        return a.data_hora.getTime() < b.data_hora.getTime() ? -1 : 1;
      } else { /* Situação 2: Paths diferentes, deverá ser encontrado o menor nível comum entre eles para poder comparar 
        let pathA = a.path.split("/");
        let pathB = b.path.split("/");
        let common = this.util.commonBegin(pathA, pathB);
        let dataHoraA = (comentarios.find(x => x.id == (pathA[common.length] || a.id)) || a).data_hora.getTime();
        let dataHoraB = (comentarios.find(x => x.id == (pathB[common.length] || b.id)) || b).data_hora.getTime();
        return dataHoraA == dataHoraB ? 0 : (dataHoraA < dataHoraB ? -1 : 1);
      }
    }) || [];
    return ordered;
  }

  public newComentario(pai?: Comentario) {
    const comentario = new Comentario();
    const comentarios = this.form.controls.comentarios.value || [];
    comentario.id = this.dao!.generateUuid();
    comentario.path = pai ? pai.path + "/" + pai.id : "";
    comentario.data_hora = this.auth.hora;
    comentario.usuario_id = this.auth.usuario!.id;
    comentario.comentario_id = pai?.id || null;
    comentario.usuario = this.auth.usuario;
    comentario._status = "ADD";
    comentarios.push(comentario);
    this.form.controls.comentarios.setValue(this.orderComentarios(comentarios));
    this.comentarios!.adding = true;
    this.comentarios!.edit(comentario);
    return comentario;
  }*/

  public addComentario = async () => {
    this.comentario.newComentario(this.form.controls.comentarios, this.comentarios!);
    return undefined;
  }

  public onTarefaSelect(item: SelectItem) {
    const tarefa: Tarefa | undefined = item.entity as Tarefa;
    this.form!.controls.tempo_estimado.setValue(tarefa?.tempo_estimado || 0);
  }

  public async saveComentario(form: FormGroup, item: any) {
    const entity = form.value;
    Object.assign(this.comentarios?.editing || {}, entity);
    return undefined;
  }

  public async loadComentario(form: FormGroup, row: any) {
    this.formComentarios.controls.texto.setValue(row.texto);
    this.formComentarios.controls.tipo.setValue(row.tipo);
    this.formComentarios.controls.privacidade.setValue(row.privacidade);
  }

}
