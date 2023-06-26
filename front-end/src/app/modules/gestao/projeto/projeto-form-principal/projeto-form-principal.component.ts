import { ChangeDetectorRef, Component, ContentChild, ContentChildren, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Projeto } from 'src/app/models/projeto.model';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { LookupItem } from 'src/app/services/lookup.service';
import { ProjetoService } from '../projeto.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarExpedienteComponent } from 'src/app/modules/uteis/calendar-expediente/calendar-expediente.component';

@Component({
  selector: 'projeto-form-principal',
  templateUrl: './projeto-form-principal.component.html',
  styleUrls: ['./projeto-form-principal.component.scss']
})
export class ProjetoFormPrincipalComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("escritorio", { static: false }) public escritorio?: InputSearchComponent;
  @ViewChild("expediente", { static: false }) public expediente?: CalendarExpedienteComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }
  @Input() cdRef: ChangeDetectorRef;

  public projetoService: ProjetoService;
  public unidadeDao: UnidadeDaoService;

  private _fases: LookupItem[] = [];
  
  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProjetoDaoService>(ProjetoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      numero: {default: ""},
      nome: {default: ""},
      status: {default: "PLANEJADO"},
      descricao: {default: ""},
      finalidade: {default: ""},
      inicio: {default: new Date()},
      termino: {default: new Date()},
      duracao: {default: 0},
      inicio_baseline: {default: new Date()},
      termino_baseline: {default: new Date()},
      progresso: {default: 0},
      tempo_corrido: {default: false},
      usa_horas: {default: false},
      usa_baseline: {default: true},
      calcula_intervalo: {default: false},
      soma_progresso_filhos: {default: true},
      agrupador: {default: false},
      calcula_custos: {default: true},
      aloca_proprios_recursos: {default: true},
      soma_recusos_alocados_filhos: {default: true},
      custos_proprios: {default: true},
      soma_custos_filhos: {default: true},
      fase_id: {default: ""},
      usar_escritorio: {default: true},
      escritorio_id: {default: ""}
    }, this.cdRef, this.validate);
    this.join = ["recursos", "tarefas", "alocacoes", "regras", "fase"];
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
  
  public async loadData(entity: IIndexable, form?: FormGroup) {
    let formValue = Object.assign({}, this.form!.value);
    let escritorio = (entity as Projeto).alocacoes?.find(x => !!x.regras?.find(y => y.regra?.perfis?.includes("ESCRITORIO")));
    await Promise.all([
      this.escritorio!.loadSearch(escritorio?.recurso?.unidade || escritorio?.recurso?.unidade_id)
    ]);
    form?.controls.usar_escritorio.setValue(!!escritorio);
    this.form!.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Projeto();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    return this.util.fill(this.entity, this.form!.value);
  }

  public get fases(): LookupItem[] {
    let fases = (this.entity?.fases || []).filter(x => x.id != "NEW").map(x => Object.assign({}, {key: x.id, value: x.nome}));
    if(JSON.stringify(fases) != JSON.stringify(this._fases)) this._fases = fases;
    return this._fases;
  }

  public get unitDuracao(): "hour" | "day" {
    return this.form?.controls.usa_horas.value ? "hour" : "day";
  }

  public onUnitDuracaoChange(unit: UnitWorkload) {
    this.form?.controls.usa_horas.setValue(unit == "hour");
    this.recalcular();
  }

  public onIntervaloAutomaticoChange(event: Event) {
    this.recalcular();
  }

  public recalcular() {
    this.saveData();
    this.projetoService.recalcular(this.entity!);
    this.loadData(this.entity!);
    this.cdRef.detectChanges();
  }

  public get intervaloAutomatico(): string | undefined {
    return this.form?.controls.calcula_intervalo.value ? "true" : undefined;
  }

  public get usaBaseline(): string | undefined {
    return this.form!.controls.usa_baseline.value ? undefined : "true";
  }

  public get progressoAutomatico(): string | undefined {
    return this.form!.controls.soma_progresso_filhos.value ? "true" : undefined;
  }

}
