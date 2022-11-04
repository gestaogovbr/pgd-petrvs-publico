import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Projeto } from 'src/app/models/projeto.model';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { LookupItem } from 'src/app/services/lookup.service';
@Component({
  selector: 'projeto-form-principal',
  templateUrl: './projeto-form-principal.component.html',
  styleUrls: ['./projeto-form-principal.component.scss']
})
export class ProjetoFormPrincipalComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }

  private _fases: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProjetoDaoService>(ProjetoDaoService);
    this.form = this.fh.FormBuilder({
      numero: {default: ""},
      nome: {default: ""},
      status: {default: "PLANEJADO"},
      descricao: {default: ""},
      finalidade: {default: ""},
      inicio_projeto: {default: new Date()},
      termino_projeto: {default: new Date()},
      duracao: {default: ""},
      progresso: {default: 0},
      tempo_corrido: {default: true},
      usa_horas: {default: false},
      intervalo_automatico: {default: false},
      progresso_automatico: {default: true},
      agrupador: {default: false},
      usa_custo: {default: true},
      aloca_recursos_projeto: {default: true},
      soma_alocacoes_automatico: {default: true},
      possui_custos_projeto: {default: true},
      soma_custos_automatico: {default: true},
      fase_id: {default: ""}
    }, this.cdRef, this.validate);
    this.join = ["projeto_recurso", "projeto_tarefa", "projeto_alocacao","projeto_regra","projeto_envolvido"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if((controlName == "nome" && !control.value?.length) || 
      (controlName == "fator_complexidade" && !(control.value > 0)) ||
      (controlName == "data_entrega" && !this.util.isDataValid(control.value))) {
      result = "Obrigatório";
    }
    
    return result;
  }
  
  public loadData(entity: IIndexable, form?: FormGroup) {
    let formValue = Object.assign({}, this.form!.value);
    this.form!.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Projeto();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    return new Promise<Projeto>((resolve, reject) => {
      resolve(this.util.fillForm(this.entity, this.form!.value));
    });
  }

  public get fases(): LookupItem[] {
    let fases = (this.entity?.fases || []).map(x => Object.assign({}, {key: x.id, value: x.nome, color: x.cor}));
    if(JSON.stringify(fases) != JSON.stringify(this._fases)) this._fases = fases;
    return this._fases;
  }

  public get unitDuracao(): "hour" | "day" {
    return this.form?.controls.usa_horas.value ? "hour" : "day";
  }

  public onUnitDuracaoChange(unit: UnitWorkload) {
    this.form?.controls.usa_horas.setValue(unit == "hour");
    this.cdRef.detectChanges();
  }

  public onIntervaloAutomaticoChange(event: Event) {
    this.cdRef.detectChanges();
  }

  public get intervaloAutomatico(): string | undefined {
    return this.form?.controls.intervalo_automatico.value ? "true" : undefined;
  }

}
