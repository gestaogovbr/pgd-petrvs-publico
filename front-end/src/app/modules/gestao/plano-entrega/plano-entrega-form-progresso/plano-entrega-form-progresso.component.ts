import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { PlanoEntregaEntregaProgressoDaoService } from "src/app/dao/plano-entrega-entrega-progresso-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { PlanoEntregaEntregaProgresso } from "src/app/models/plano-entrega-entrega-progresso.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { NavigateResult } from "src/app/services/navigate.service";
import { PlanoEntregaService } from "../plano-entrega.service";
import { PlanoEntregaEntregaDaoService } from "src/app/dao/plano-entrega-entrega-dao.service";
import { PlanoEntregaEntrega } from "src/app/models/plano-entrega-entrega.model";

@Component({
  selector: 'plano-entrega-form-progresso',
  templateUrl: './plano-entrega-form-progresso.component.html',
  styleUrls: ['./plano-entrega-form-progresso.component.scss']
})
export class PlanoEntregaFormProgressoComponent extends PageFormBase<PlanoEntregaEntregaProgresso, PlanoEntregaEntregaProgressoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public planoEntregaService: PlanoEntregaService;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public planoEntregaEntregaId?: string;
  public planoEntregaEntrega?: PlanoEntregaEntrega | undefined;
  public checklist: any[] = [];
  
  constructor(public injector: Injector) {   
    super(injector, PlanoEntregaEntregaProgresso, PlanoEntregaEntregaProgressoDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.join = ["plano_entrega_entrega.entrega"];
    
    this.form = this.fh.FormBuilder({
      data_progresso: { default: new Date() },
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      meta: { default: 100 },
      realizado: { default: null },
      progresso_esperado: { default: 100 },
      progresso_realizado: { default: null }, 
      registro_execucao: { default: null },
      usuario_id: {default: null},
      plano_entrega_entrega_id: {default: null},     
    }, this.cdRef, this.validate);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.planoEntregaEntregaId = this.urlParams!.get("entrega_id")!;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['progresso_realizado', 'realizado'].indexOf(controlName) >= 0 && !(control.value >= 0 || control.value?.length > 0)) {
      result = "Obrigatório";
    } else if (['progresso_esperado', 'meta'].indexOf(controlName) >= 0 && !(control.value > 0 || control.value?.length > 0)) {
      result = "Obrigatório";
    } else if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } else if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } 

    return result
  }

  public async loadData(entity: PlanoEntregaEntregaProgresso, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let {meta, realizado, ...entityWithout} = entity;
    form.patchValue(this.util.fillForm(formValue, entityWithout));
    form.controls.meta.setValue(this.planoEntregaService.getValor(entity.meta));
    form.controls.realizado.setValue(this.planoEntregaService.getValor(entity.realizado));
    if (entity.registro_execucao !== undefined) {
      form.controls.registro_execucao.setValue(entity.registro_execucao);
    }
  }

  public async initializeData(form: FormGroup) {
    this.entity = new PlanoEntregaEntregaProgresso();
    this.planoEntregaEntrega = this.planoEntregaEntregaId ? (await this.planoEntregaEntregaDao.getById(this.planoEntregaEntregaId, ['entrega']) as PlanoEntregaEntrega) : undefined;


    this.entity!.usuario_id = this.auth.usuario!.id;
    this.entity!.plano_entrega_entrega_id = this.planoEntregaEntrega?.id!;
    this.entity!.plano_entrega_entrega = this.planoEntregaEntrega;
    this.entity!.meta = this.planoEntregaEntrega?.meta!;
    this.entity!.realizado = this.planoEntregaEntrega?.realizado!;
    this.entity!.progresso_esperado = this.planoEntregaEntrega?.progresso_esperado!;
    this.entity!.progresso_realizado = this.planoEntregaEntrega?.progresso_realizado!;
    this.entity!.data_inicio = this.planoEntregaEntrega?.data_inicio!;
    this.entity!.data_fim = this.planoEntregaEntrega?.data_fim!;
    // Deep copy do checklist para edição local
    this.checklist = Array.isArray((this.planoEntregaEntrega as any)?.checklist)
      ? JSON.parse(JSON.stringify((this.planoEntregaEntrega as any).checklist))
      : [];
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<PlanoEntregaEntregaProgresso> {
    let progresso: PlanoEntregaEntregaProgresso = this.util.fill(new PlanoEntregaEntregaProgresso(), this.entity!);
    let {meta, realizado, ...valueWithout} = this.form!.value;

    progresso = this.util.fillForm(progresso, valueWithout);
    progresso.meta = this.planoEntregaService.getEntregaValor(this.entity!.plano_entrega_entrega?.entrega!, meta);
    progresso.realizado = this.planoEntregaService.getEntregaValor(this.entity!.plano_entrega_entrega?.entrega!, realizado);
    progresso.registro_execucao = this.form!.controls.registro_execucao.value || null;

    // Persiste o checklist atualizado na entrega (quando houver)
    if (this.planoEntregaEntrega?.id) {
      try {
        await this.planoEntregaEntregaDao.update(this.planoEntregaEntrega.id, { checklist: this.checklist } as any);
      } catch (e) {
        // Não bloqueia o salvamento do progresso, apenas registra erro no console
        console.error('Falha ao salvar checklist da entrega:', e);
      }
    }

    return progresso;
  }

  public titleEdit = (entity: PlanoEntregaEntregaProgresso): string => {
    return "Editando " + this.lex.translate("Progresso da entrega") + ': ' + (entity?.entrega?.descricao || "");
  }

}