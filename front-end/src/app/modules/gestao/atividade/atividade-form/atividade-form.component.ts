import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade, Checklist } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { Usuario } from 'src/app/models/usuario.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { Comentario } from 'src/app/models/comentario';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ComentariosComponent } from 'src/app/modules/uteis/comentarios/comentarios.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { Documento } from 'src/app/models/documento.model';
import { AtividadePausa } from 'src/app/models/atividade-pausa.model';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { SeiKeys } from 'src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { AtividadeService } from '../atividade.service';
import { DocumentosLinkComponent } from 'src/app/modules/uteis/documentos/documentos-link/documentos-link.component';

@Component({
  selector: 'app-atividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.scss']
})
export class AtividadeFormComponent extends PageFormBase<Atividade, AtividadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;
  @ViewChild('tipoAtividade', { static: false }) public tipoAtividade?: InputSearchComponent;
  @ViewChild('planoTrabalho', { static: false }) public planoTrabalho?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: ComentariosComponent;
  @ViewChild('requisicao', { static: false }) public requisicao?: DocumentosLinkComponent;

  public sei?: SeiKeys;
  public form: FormGroup;
  public formChecklist: FormGroup;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public tipoAtividadeDao: TipoAtividadeDaoService;
  public atividadeService: AtividadeService;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public calendar: CalendarService;
  public comentario: ComentarioService;
  public etiquetas: LookupItem[] = [];
  public checklist: Checklist[] = [];//public checklist: LookupItem[] = [];
  public planosTrabalhos: LookupItem[] = [];
  public planoTrabalhoJoin: string[] = ["entregas.plano_entrega_entrega:id,descricao", "tipo_modalidade:id,nome"];
  public planoTrabalhoSelecionado?: PlanoTrabalho | null = null;
  public usuarioJoin: string[] = ['planos_trabalho.entregas.plano_entrega_entrega:id,descricao', 'planos_trabalho.tipo_modalidade:id,nome'];
  public entregas: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    const horaInicial = this.auth.hora;
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.atividadeService = injector.get<AtividadeService>(AtividadeService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.title = this.lex.translate('Inclusão de Atividade');
    this.form = this.fh.FormBuilder({
      numero: {default: 0},
      descricao: {default: ""},
      data_distribuicao: {default: horaInicial},
      carga_horaria: {default: 0},
      tempo_planejado: {default: 0},
      data_estipulada_entrega: {default: horaInicial},
      data_inicio: {default: null},
      data_entrega: {default: null},
      esforco: {default: 0},
      tempo_despendido: {default: 0},
      data_arquivamento: {default: null},
      etiquetas: {default: []},
      checklist: {default: []},
      prioridade: {default: 0},
      progresso: {default: 0},
      plano_trabalho_id: {default: null},
      plano_trabalho_entrega_id: {default: null},
      tipo_atividade_id: {default: null},
      demandante_id: {default: ""},
      usuario_id: {default: null},
      unidade_id: {default: ""},
      documento_requisicao_id: {default: null},
      documento_entrega_id: {default: null},
      comentarios: {default: []},
      pausas: {default: []},
      etiqueta: {default: ""},
      tarefas: {default: []},
      iniciado: {default: false},
      concluido: {default: false},
      documento_requisicao: {default: undefined},
      documento_entrega: {default: undefined}
    }, this.cdRef, this.validate);
    this.formChecklist = this.fh.FormBuilder({
      id: {default: ""},
      texto: {default: ""},
      checked: {default: false}
    }, this.cdRef, this.validateChecklist);
    this.join = [
      "usuario.planos_trabalho.tipo_modalidade:id,nome", 
      "pausas", 
      "tipo_atividade", 
      "unidade", 
      "comentarios.usuario", 
      "tarefas.tipo_tarefa", 
      "tarefas.comentarios.usuario", 
      "documento_requisicao", 
      "documento_entrega"
    ];
  }
//"usuario.planos_trabalho.entregas.plano_entrega_entrega:id,descricao", 
  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = ["comentar", "clonar"].includes(segment) ? segment : this.action;
  }

  public get isClonar(): boolean {
    return this.action == "clonar";
  }

  public get titleAtividade(): string {
    return this.form?.controls.numero?.value ? "#" + this.form?.controls.numero?.value : "";
  }

  public validateChecklist = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(["unidade_id", "descricao"].includes(controlName) && !control?.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "tipo_atividade_id" && !control?.value?.length && !this.auth.hasPermissionTo("MOD_ATV_TIPO_ATV_VAZIO")) {
      result = "Obrigatório";
    } else if(["data_distribuicao", "data_estipulada_entrega"].includes(controlName)) {
      let prazoEntrega = this.form?.controls.data_estipulada_entrega?.value;
      let dataDistribuicao = this.form?.controls.data_distribuicao?.value;
      if (!this.util.isDataValid(control.value)) {
        result = "Data inválida";
      } else if(controlName == "data_distribuicao" && control.value && this.util.isDataValid(prazoEntrega) && control.value.getTime() > prazoEntrega.getTime()) {
        result = "Maior que entrega";
      } else if(controlName == "data_estipulada_entrega" && control.value && this.util.isDataValid(dataDistribuicao) && control.value.getTime() < dataDistribuicao.getTime()) {
        result = "Menor que distribuição";
      }
    } else if(controlName == "plano_trabalho_id" && !control.value?.length && this.form?.controls?.usuario_id.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "plano_trabalho_entrega_id") {
      if(this.form?.controls?.plano_trabalho_id.value?.length && !control.value?.length) {
        result = "Obrigatório";
      } else if(control.value?.length && !this.entregas.find(x => x.key == control.value)) {
        result = "Selecione";
      }
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let result = undefined;
    this.loadEtiquetas();
    if (this.form.controls.tipo_atividade_id.value) {
      let checkAtividade = this.tipoAtividade?.selectedEntity.checklist;
      if (checkAtividade && this.form.controls.checklist.value.length == checkAtividade.length) this.loadChecklist();// this.loadChecklist();
    }
    const etiquetasKeys = this.etiquetas.map(x => x.key);
    const checklistKeys = this.checklist.map(x => x.id);//const checklistKeys = this.checklist.map(x => x.key);
    const etiqueta = (this.form.controls.etiquetas.value || []).find((x: LookupItem) => !etiquetasKeys.includes(x.key)) as LookupItem;
    const checklst = (this.form.controls.checklist.value || []).find((x: Checklist) => !checklistKeys.includes(x.id) && x.checked) as Checklist;
    if(etiqueta) result = "Etiqueta " + etiqueta.value + "não pode ser utilizada!";
    if(checklst) result = "Checklist " + checklst.texto + "não pode ser utilizado!";
    /* (RN_ATV_5) A atividade deverá ter perído compatível com o do plano de trabalho (Data de distribuição e Prazo de entrega devem estar dentro do período do plano de trabalho); */
    if(this.planoTrabalhoSelecionado && (this.util.asTimestamp(this.form.controls.data_distribuicao.value) < this.util.asTimestamp(this.planoTrabalhoSelecionado.data_inicio) || this.util.asTimestamp(this.form.controls.data_estipulada_entrega.value) > this.util.asTimestamp(this.planoTrabalhoSelecionado.data_fim))) {
      result = "A atividade deverá ter perído compatível com o do plano de trabalho (" + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_inicio) + " até " + this.util.getDateFormatted(this.planoTrabalhoSelecionado.data_fim) + ") [RN_ATV_5]";
    }
    return result;
  }

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    if(this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if(this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.form.controls.etiqueta.setValue("");
      }
    }
    return result;
  };

  public onUnidadeChange(event: Event) {
    this.loadEtiquetas();
  }

  public onDataDistribuicaoChange(event: Event) {
    this.loadUsuario(this.usuario?.selectedEntity); /* Atualiza a lista de planos de trabalho válidos no período */
    this.form?.controls.data_estipulada_entrega.updateValueAndValidity();
  }

  public onPrazoEntregaChange(event: Event) {
    this.form?.controls.data_distribuicao.updateValueAndValidity();
  }

  public onPlanoTrabalhoChange(event: Event) {
    (async () => {
      if(this.entity) {
        const planoTrabalho = (this.usuario?.selectedEntity as Usuario)?.planos_trabalho?.find(x => x.id == this.form!.controls.plano_trabalho_id.value);
        if(planoTrabalho) {
          if(this.planoTrabalhoSelecionado?.id != planoTrabalho.id) {
            this.planoTrabalhoSelecionado = await this.planoTrabalhoDao.getById(planoTrabalho.id, this.planoTrabalhoJoin);
          }
          if(this.form!.controls.unidade_id.value != planoTrabalho.unidade_id) {
            const unidade = await this.unidadeDao.getById(planoTrabalho.unidade_id);
            if(unidade) {
              await this.unidade?.loadSearch(unidade);
              await this.auth.selecionaUnidade(unidade.id);
            }
          }
          const planoTrabalhoEntregaId = this.form.controls.plano_trabalho_entrega_id.value;
          this.entregas = this.planoTrabalhoSelecionado?.entregas?.map(x => Object.assign({}, {
            key: x.id,
            value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
            data: x
          })) || [];
          this.cdRef.detectChanges();
          this.form.controls.plano_trabalho_entrega_id.setValue(!planoTrabalhoEntregaId?.length && this.entregas.length > 0 ? this.entregas[0].key : planoTrabalhoEntregaId);
        } else {
          this.entregas = [];
          this.form.controls.plano_trabalho_entrega_id.setValue(null);
        }
      }
    })();
  }

  public loadEtiquetas() {
    this.etiquetas = this.atividadeService.buildEtiquetas(this.unidade?.selectedEntity, this.tipoAtividade?.selectedEntity);
  }

  public loadChecklist() {
    const tipoAtividade = this.tipoAtividade?.selectedEntity as TipoAtividade;
    let checkAdd: Checklist[] = tipoAtividade.checklist?.map((a: { key: any; value: any; }) => {
      return {
        id: a.key,
        texto: a.value,
        checked: false
      } as Checklist;
    });
    this.checklist = checkAdd || [];//this.checklist = tipoAtividade?.checklist || [];
    this.form.controls.checklist.setValue(checkAdd);
    this.atividadeService.buildChecklist(tipoAtividade, this.form.controls.checklist);
  }

  public loadTipoAtividade(tipoAtividade: TipoAtividade | undefined) {
    if(tipoAtividade) {
      this.loadEtiquetas();
      this.loadChecklist();
    } else {
      this.etiquetas = [];
      this.form.controls.esforco.setValue(0);
      this.form.controls.tempo_planejado.setValue(0);
    }
    this.cdRef.detectChanges();
  }

  public getPlanosTrabalhos(usuario: Usuario, data_distribuicao: Date, plano_trabalho_id: string | null): LookupItem[] {
    return usuario.planos_trabalho?.filter(x => x.id == plano_trabalho_id || (this.util.between(data_distribuicao, {start: x.data_inicio, end: x.data_fim}))).map(x => Object.assign({
      key: x.id, 
      value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim), data: x
    })) || [];
  }

  public loadUsuario(usuario: Usuario | undefined) {
    if(usuario) {
      const planoTrabalhoId = this.form.controls.plano_trabalho_id.value;
      const dataDistribuicao = this.form.controls.data_distribuicao.value || new Date();
      this.planosTrabalhos = this.getPlanosTrabalhos(usuario, dataDistribuicao, planoTrabalhoId); //usuario?.planos?.map(x => Object.assign({key: x.id, value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao.getDateFormatted(x.data_inicio)+ " a " + this.usuarioDao.getDateFormatted(x.data_fim), data: x})) || [];
      if(this.hasUsuarioActionNew && this.auth.usuario!.id == this.form.controls.usuario_id.value) this.form!.controls.iniciado.setValue(true);
      this.cdRef.detectChanges();
      this.form.controls.plano_trabalho_id.setValue(!planoTrabalhoId?.length && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoId);
    } else {
      this.planosTrabalhos = [];
      this.form.controls.plano_trabalho_id.setValue(null);
    }
    this.cdRef.detectChanges();
  }

  public get hasUsuarioActionNew(): boolean {
    return this.form?.controls.usuario_id?.value?.length && this.action == "new";
  }

  public onTipoAtividadeSelect(item: SelectItem) {
    const tipoAtividade: TipoAtividade | undefined = item.entity as TipoAtividade;
    this.loadTipoAtividade(tipoAtividade);
    this.atividadeService.comentarioAtividade(tipoAtividade, this.form!.controls.comentarios);
    this.cdRef.detectChanges();
  }

  /*public comentarioAtividade(tipoAtividade?: TipoAtividade) {
    const comentarios: Comentario[] = this.form.controls.comentarios.value || [];
    const index = comentarios.findIndex(x => x.tipo == "TIPO_ATIVIDADE");
    if(index >= 0) {
      if(comentarios[index]._status == "ADD") {
        comentarios.splice(index, 1);
      } else {
        comentarios[index]._status == "DELETE";
      }
    }
    if(tipoAtividade?.comentario?.length) {
      const comentario = new Comentario();
      comentario.id = this.dao!.generateUuid();
      comentario.path = "";
      comentario.texto = tipoAtividade.comentario;
      comentario.data_comentario = this.auth.hora;
      comentario.usuario_id = this.auth.usuario!.id;
      comentario.comentario_id = null;
      comentario.tipo = "TIPO_ATIVIDADE";
      comentario.usuario = this.auth.usuario;
      comentario._status = "ADD";
      comentarios.push(comentario);
      this.form.controls.comentarios.setValue(this.comentario.orderComentarios(comentarios));
      this.cdRef.detectChanges();
    }
  }*/

  public onTipoAtividadeChange(event: Event) {
    if(!this.form?.controls.tipo_atividade_id.value?.length) this.loadTipoAtividade(undefined);
  }

  public onUsuarioSelect(item: SelectItem) {
    const usuario: Usuario | undefined = item.entity as Usuario;
    this.loadUsuario(usuario);
  }

  public onUsuarioChange(event: Event) {
    if(!this.form?.controls.usuario_id.value?.length) this.loadUsuario(undefined);
  }

  public onConcluidoChange(event: Event) {
    if(this.hasUsuarioActionNew && this.form!.controls.concluido.value) {
      this.form!.controls.iniciado.setValue(true);
      this.form!.controls.progresso.setValue(100);
    } else {
      this.form!.controls.progresso.setValue(0);
    }
  }

  public orderPausas(pausas: AtividadePausa[]) {
    return pausas.sort((a: AtividadePausa, b: AtividadePausa) => {
      return a.data_inicio < b.data_inicio ? -1 : 1;
    });
  }

  public async loadData(entity: Atividade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    this.planoTrabalhoSelecionado = entity.plano_trabalho;
    await Promise.all([
      this.unidade?.loadSearch(entity.unidade || formValue.unidade_id, false),
      this.usuario?.loadSearch(entity.usuario || formValue.usuario_id, false),
      this.tipoAtividade?.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id, false)
    ]);
    form.patchValue(formValue, {emitEvent: false}); /* Carrega valores iniciais no form e previne que o plano_id seja sobrescrito */
    if(entity.usuario) this.loadUsuario(entity.usuario);
    if(entity.tipo_atividade) this.loadTipoAtividade(entity.tipo_atividade);
    if(entity.unidade_id != this.auth.unidade!.id) await this.auth.selecionaUnidade(entity.unidade_id);
    entity.comentarios = this.comentario.orderComentarios(entity.comentarios || []);
    entity.pausas = this.orderPausas(entity.pausas || []);
    form.patchValue(this.util.fillForm(formValue, this.form.value)); /* Carrega os valores e dispara os eventos */
    this.loadEtiquetas();
  }

  public async initializeData(form: FormGroup) {
    if (this.isClonar) {
      const source = (await this.dao!.getAtividade(this.urlParams!.get("id")!))!;
      this.entity = new Atividade();
      Object.assign(this.entity, {
        tipo_atividade: source.tipo_atividade,
        unidade: source.unidade,
        usuario: source.usuario,
        plano_trabalho: source.plano_trabalho,
        descricao: source.descricao,
        data_distribuicao: source.data_distribuicao,
        tempo_planejado: source.tempo_planejado,
        carga_horaria: source.carga_horaria,
        data_estipulada_entrega: source.data_estipulada_entrega,
        esforco: source.esforco,
        tipo_atividade_id: source.tipo_atividade_id,
        demandante_id: this.auth.usuario?.id,
        usuario_id: source.usuario_id,
        unidade_id: source.unidade_id,
        plano_trabalho_id: source.plano_trabalho_id,
        etiquetas: source.etiquetas,
        checklist: source.checklist,
        metadados: source.metadados,
        plano_trabalho_entrega_id: source.plano_trabalho_entrega_id,
        progresso: source.progresso,
        tarefas: (source.tarefas || []).map((tarefa: AtividadeTarefa) => new AtividadeTarefa(Object.assign({}, tarefa, {
          id: this.dao!.generateUuid(),
          comentarios: [],
          _status: "ADD"
        }))),
        documento_requisicao: !source.documento_requisicao ? undefined : Object.assign({}, new Documento(Object.assign({}, source.documento_requisicao, {
          id: this.dao!.generateUuid(),
          _status: "ADD"
        }))),
        documento_entrega: !source.documento_entrega ? undefined : Object.assign({}, new Documento(Object.assign({}, source.documento_entrega, {
          id: this.dao!.generateUuid(),
          _status: "ADD"
        })))
      });
    } else {
      this.sei = this.metadata?.sei;
      this.entity = new Atividade();
      this.entity.data_distribuicao = this.auth.hora;
      this.entity.data_estipulada_entrega = this.entity.data_distribuicao;
      this.entity.demandante_id = this.auth.usuario?.id || "";
      this.entity.unidade_id = this.auth.unidade?.id || "";
      this.entity.unidade = this.auth.unidade;
      this.entity.metadados = {
        atrasado: false,
        tempo_despendido: 0, 
        tempo_atraso: 0,
        pausado: false,
        iniciado: false,
        concluido: false,
        avaliado: false,
        arquivado: false,
        produtividade: 0,
        consolidacoes: []
      };
      if(!this.auth.isGestorUnidade(this.entity.unidade_id)) {
        let usuario = await this.usuarioDao.getById(this.auth.usuario!.id, this.usuarioJoin);
        this.entity.usuario_id = usuario?.id || null;
        this.entity.usuario = usuario || undefined;
      }
    }
    await this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<Atividade | boolean> {
    return new Promise<Atividade | boolean>((resolve, reject) => {
      let atividade = this.util.fill(new Atividade(), this.entity!) as Atividade;
      this.comentarios?.confirm();
      atividade = this.util.fillForm(atividade, this.form!.value);
      if(this.hasUsuarioActionNew) {
        if(this.form!.controls.iniciado.value) {
          atividade.data_inicio = atividade.data_distribuicao;
          atividade.status = 'INICIADO';
          if(this.form!.controls.concluido.value) {
            let efemerides = this.calendar.calculaDataTempoUnidade(atividade.data_inicio, atividade.data_estipulada_entrega, this.planoTrabalhoSelecionado!.carga_horaria, this.unidade?.selectedEntity, "ENTREGA");
            atividade.data_entrega = atividade.data_estipulada_entrega;
            atividade.progresso = 100;
            atividade.tempo_despendido = efemerides?.tempoUtil || 0;
            atividade.status = 'CONCLUIDO';
          }
        }
      }
      atividade.documento_requisicao = this.requisicao?.documento;
      atividade.comentarios = atividade.comentarios.filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
      atividade.tarefas = atividade.tarefas.filter((tarefa: AtividadeTarefa) => {
        tarefa.comentarios = tarefa.comentarios.filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.texto?.length);
        return ["ADD", "EDIT", "DELETE"].includes(tarefa._status || "");
      });
      resolve(atividade);
    });
  }
}

