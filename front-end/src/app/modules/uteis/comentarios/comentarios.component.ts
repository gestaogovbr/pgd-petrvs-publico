import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputTextareaComponent } from 'src/app/components/input/input-textarea/input-textarea.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { DemandaEntregaDaoService } from 'src/app/dao/demanda-entrega-dao.service';
import { Base } from 'src/app/models/base.model';
import { Comentario, ComentarioOrigem, HasComentarios } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFrameBase } from '../../base/page-frame-base';

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
      const filter = ["PROJETO", "TAREFA"].includes(value || "") ? ["COMENTARIO", "GERENCIAL", "TECNICO"] : ["COMENTARIO", "TECNICO"];
      this.comentarioTipos =  this.lookup.COMENTARIO_TIPO.filter(x => filter.includes(x.key));
    }
  }
  get origem(): ComentarioOrigem {
    return this._origem;
  }

  public dao?: DaoBaseService<Base>;
  public entity_id?: string; /* Se estiver preenchido, então veio por uma rota e é uma janela autocontida, com salvar e cancelar */
  public comentario_id?: string;
  public comentario: ComentarioService;
  public form: FormGroup;
  public formComentarios: FormGroup;
  public comentarioTipos: LookupItem[] = [];

  private _origem: ComentarioOrigem = undefined;
  private _entity: HasComentarios | undefined = undefined;
  private _control: AbstractControl | undefined = undefined;
  private fakeControl: FormControl = new FormControl();

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
      this.entity_id = this.urlParams!.get("id") as string;
      this.comentario_id = this.queryParams?.comentario_id
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.entity_id?.length) { /* Janela autocontida */
      (async () => {
        this.loading = true;
        try {
          switch(this.origem) {
            case 'DEMANDA': this.dao = this.injector.get<DemandaDaoService>(DemandaDaoService); break;
            case 'ENTREGA': this.dao = this.injector.get<DemandaEntregaDaoService>(DemandaEntregaDaoService); break;
            case 'PROJETO': this.dao = this.injector.get<DemandaEntregaDaoService>(DemandaEntregaDaoService); break;
          }
          this.entity = await this.dao?.getById(this.entity_id!, this.join) as HasComentarios | undefined;
          const comentario = this.comentario_id?.length ? (this.gridControl.value || []).find((x: Comentario) => x.id == this.comentario_id) : undefined;
          this.comentario.newComentario(this.gridControl, this.comentarios!, comentario);
          this.cdRef.detectChanges();
          this.texto!.focus();
        } catch (erro) {
          this.error("Erro ao carregar dados: " + erro);
        } finally {
          this.loading = false;
        }
      })();
    }
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "texto" && !control.value?.length) {
      result = "Não pode ser em branco";
    }
    return result;
  }

  public get constrolOrItems(): AbstractControl | Comentario[] {
    return this.control || this.entity?.comentarios || [];
  }

  public get gridControl(): AbstractControl {
    return this.control || this.fakeControl;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let comentario: Comentario = row as Comentario;

    if(comentario.usuario_id == this.auth.usuario?.id) {
      result.push({ icon: "bi bi-pencil-square", hint: "Editar", color: "btn-outline-info", onClick: (comentario: Comentario) => { this.grid!.edit(comentario); }});
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

  public async onSaveData() {
    this.submitting = true;
    try {
      this.confirm();
      const modalResult = await this.dao?.update(this.entity!.id, { comentarios: this.gridControl.value }, this.join);
      if(this.modalRoute?.queryParams?.idroute?.length) this.go.setModalResult(this.modalRoute?.queryParams?.idroute, modalResult);
      this.go.back(undefined, this.backRoute);
    } catch (erro) {
      this.error("Erro ao carregar dados: " + erro);
    } finally {
      this.submitting = false;
    }
  }

  public onCancel() {
    this.go.back(undefined, this.backRoute);
  }

}
