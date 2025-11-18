import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputTextareaComponent } from 'src/app/components/input/input-textarea/input-textarea.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { Comentario, ComentarioOrigem, HasComentarios } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFrameBase } from '../../base/page-frame-base';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';

@Component({
  selector: 'comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('texto', { static: false }) public texto?: InputTextareaComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: GridComponent;
  @Input() set control(value: AbstractControl | undefined) {
    if(this._control != value) {
      this._control = value;
      if(value && this.comentario) value.setValue(this.comentario.orderComentarios(value.value || []));
    }
  }
  get control(): AbstractControl | undefined {
    return this._control;
  }
  @Input() set entity(value: HasComentarios | undefined) {
    if(this._entity != value) {
      this._entity = value;
      if(value && this.comentario) value.comentarios = this.comentario.orderComentarios(value.comentarios || []);
      this.fakeControl.setValue(value?.comentarios);
    }
  }
  get entity(): HasComentarios | undefined {
    return this._entity;
  }
  @Input() set origem(value: ComentarioOrigem) {
    if(this._origem != value) {
      this._origem = value;
      const filter = ["PROJETO", "PROJETO_TAREFA"].includes(value || "") ? ["COMENTARIO", "GERENCIAL", "TECNICO"] : ["COMENTARIO", "TECNICO"];
      this.comentarioTipos =  this.lookup.COMENTARIO_TIPO.filter(x => filter.includes(x.key));
    }
  }
  get origem(): ComentarioOrigem {
    return this._origem;
  }

  public comentario_id?: string;
  public comentario: ComentarioService;
  public form: FormGroup;
  public formComentarios: FormGroup;
  public comentarioTipos: LookupItem[] = [];

  private _origem: ComentarioOrigem = undefined;

  constructor(public injector: Injector) {
    super(injector);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.form = this.fh.FormBuilder({});
    this.join = ["comentarios.usuario"];
    this.formComentarios = this.fh.FormBuilder({
      texto: {default: ""},
      tipo: {default: "COMENTARIO"},
      privacidade: {default: "PUBLICO"}
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    if(this.urlParams?.has("origem")) {
      this.origem = this.urlParams!.get("origem") as ComentarioOrigem;
      this.comentario_id = this.queryParams?.comentario_id;
    }
    switch(this.origem) {
      case 'ATIVIDADE': this.dao = this.injector.get<AtividadeDaoService>(AtividadeDaoService); break;
      case 'ATIVIDADE_TAREFA': this.dao = this.injector.get<AtividadeTarefaDaoService>(AtividadeTarefaDaoService); break;
      case 'PLANO_ENTREGA_ENTREGA': this.dao = this.injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService); break;
    }
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "texto" && !control.value?.length) {
      result = "Não pode ser em branco";
    }
    return result;
  }

  public get isNoPersist(): boolean {
    return this.entity_id == "NOPERSIST";
  }

  public get constrolOrItems(): AbstractControl | Comentario[] {
    return this.control || this.entity?.comentarios || [];
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let comentario: Comentario = row as Comentario;

    if(comentario.usuario_id == this.auth.usuario?.id) {
      result.push({ icon: "bi bi-pencil-square", hint: "Alterar", color: "btn-outline-info", onClick: (comentario: Comentario) => { this.grid!.edit(comentario); }});
    }
    result.push({ hint: "Responder", color: "btn-outline-success", icon: "bi bi-reply", onClick: (comentario: Comentario) => { this.comentario.newComentario(this.gridControl, this.comentarios!, comentario); }});
    return result;
  }

  public addComentario = async () => {
    this.comentario.newComentario(this.gridControl, this.comentarios!);
    return undefined;
  }

  public async saveComentario(form: FormGroup, item: any) {
    const entity = form.value;
    Object.assign(this.comentarios!.editing!, entity);
    return undefined;
  }

  public async loadComentario(form: FormGroup, row: any) {
    this.formComentarios.controls.texto.setValue(row.texto);
    this.formComentarios.controls.tipo.setValue(row.tipo);
    this.formComentarios.controls.privacidade.setValue(row.privacidade);
  }

  public confirm() {
    this.comentarios?.confirm();
  }

  public loadData(entity: IIndexable, form: FormGroup): Promise<void> | void {
    const comentario = this.comentario_id?.length ? (this.gridControl.value || []).find((x: Comentario) => x.id == this.comentario_id) : undefined;
    this.comentario.newComentario(this.gridControl, this.comentarios!, comentario);
    this.cdRef.detectChanges();
    this.texto!.focus();
  }

  public async saveData() {
    this.confirm();
    return { comentarios: this.gridControl.value };
  }

}
