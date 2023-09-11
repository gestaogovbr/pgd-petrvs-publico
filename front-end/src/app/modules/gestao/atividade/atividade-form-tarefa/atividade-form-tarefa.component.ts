import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoTarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { TipoTarefa } from 'src/app/models/tipo-tarefa.model';
import { SeiKeys } from 'src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ComentariosComponent } from 'src/app/modules/uteis/comentarios/comentarios.component';
import { DocumentosLinkComponent } from 'src/app/modules/uteis/documentos/documentos-link/documentos-link.component';

@Component({
  selector: 'app-atividade-form-tarefa',
  templateUrl: './atividade-form-tarefa.component.html',
  styleUrls: ['./atividade-form-tarefa.component.scss']
})
export class AtividadeFormTarefaComponent extends PageFormBase<AtividadeTarefa, AtividadeTarefaDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('documento', { static: false }) public documento?: DocumentosLinkComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: ComentariosComponent;
  @ViewChild('tipoTarefa', { static: false }) public tipoTarefa?: InputSearchComponent;

  public tipoTarefaDao: TipoTarefaDaoService;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;
  public atividade?: Atividade;
  public sei?: SeiKeys;
  public allPages: ListenerAllPagesService;
  public comentario: ComentarioService;
  public form: FormGroup;
  public modalWidth: number = 800;

  constructor(public injector: Injector) {
    super(injector, AtividadeTarefa, AtividadeTarefaDaoService);
    this.tipoTarefaDao = injector.get<TipoTarefaDaoService>(TipoTarefaDaoService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.title = this.lex.translate("Tarefa da atividade");
    this.form = this.fh.FormBuilder({
      descricao: {default: ""},
      tipo_tarefa_id: {default: null},
      tempo_estimado: {default: 0},
      concluido: {default: false},
      id_processo: {default: 0},
      numero_processo: {default: ""},
      documento: {default: null},
      comentarios: {default: []}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(["descricao"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    const values = form!.value;
    if(values.tipo_tarefa_id?.length && !this.tipoTarefa?.selectedEntity) {
      return "Aguarde o carregamento " + this.lex.translate("tipo de tarefa") + ". Caso demore, selecione novamente!";
    }
    if(values.concluido && (this.tipoTarefa?.selectedEntity as TipoTarefa)?.documental && this.documento?.isEmpty()) {
      return this.gb.isEmbedded ? "Obrigatório selecionar um arquivo para a tarefa selecionada!" : "Utilize o sistema como extensão para concluir!";
    }
    return undefined;
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = segment == "comentar" ? segment : this.action;
  }

  public async loadData(entity: AtividadeTarefa, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    await this.tipoTarefa?.loadSearch(entity.tipo_tarefa || formValue.tipo_tarefa_id);
    formValue.concluido = !!entity.data_conclusao;
    formValue.comentarios = this.comentario.orderComentarios(formValue.comentarios || []);
    form.patchValue(formValue);
  }

  public async initializeData(form: FormGroup) {
    this.entity = this.metadata.tarefa;
    this.atividade = this.metadata.atividade;
    this.sei = this.metadata.sei;
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable) {
    this.comentarios?.confirm();
    this.util.fillForm(this.entity, this.form!.value);
    this.entity!.tipo_tarefa = this.tipoTarefa?.selectedEntity;
    this.entity!.data_conclusao = this.form!.controls.concluido.value && !this.entity!.data_conclusao ? this.auth.hora : this.entity!.data_conclusao;
    return new NavigateResult(this.entity);
  }

  public onTipoTarefaSelect(item: SelectItem) {
    const tipoTarefa: TipoTarefa | undefined = item.entity as TipoTarefa;
    this.form!.controls.tempo_estimado.setValue(tipoTarefa?.tempo_estimado || 0);
  }
}
