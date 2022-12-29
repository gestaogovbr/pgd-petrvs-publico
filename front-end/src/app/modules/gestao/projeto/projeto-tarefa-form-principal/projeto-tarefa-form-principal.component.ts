import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { ProjetoTarefaDaoService } from 'src/app/dao/projeto-tarefa-dao.service';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ProjetoTarefa } from 'src/app/models/projeto-tarefa.model';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'projeto-tarefa-form-principal',
  templateUrl: './projeto-tarefa-form-principal.component.html',
  styleUrls: ['./projeto-tarefa-form-principal.component.scss']
})
export class ProjetoTarefaFormPrincipalComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: ProjetoTarefa | undefined) { super.entity = value; } get entity(): ProjetoTarefa | undefined { return super.entity; }
  @Input() cdRef: ChangeDetectorRef;

  public form: FormGroup;
  public demandaDao!: DemandaDaoService;
  public tipos: LookupItem[] = [{
    key: "TAREFA",
    value: "Tarefa"
  }, {
    key: "DEMANDA",
    value: "Demanda"
  }, {
    key: "DOCUMENTO",
    value: "Doc. SUPER/SEI"
  }, {
    key: "PROJETO",
    value: "Projeto"
  }];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProjetoTarefaDaoService>(ProjetoTarefaDaoService);
    this.demandaDao = injector.get<DemandaDaoService>(DemandaDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);

    this.form = this.fh.FormBuilder({
      tipo: {default: "TAREFA"},
      indice: {default: ""},
      nome: {default: ""},
      status_tarefa: {default: "PLANEJADO"},
      descricao: {default: ""},
      numero_processo: {default: ""},
      numero_documento: {default: ""},
      marco_inicio: {default: ""},
      inicio_tarefa: {default: new Date()},
      marco_termino: {default: ""},
      termino_tarefa: {default: new Date()},
      duracao: {default: ""},
      progresso: {default: 0},
      custo_tarefa: {default: 0.00},
      possui_custos_proprios: {default: true},
      soma_recursos_alocados_filhos: {default: true},
      soma_progresso_filhos: {default: true},
      tem_filhos: {default: true},
      agrupador: {default: false},
      contraido: {default: false},
      aloca_recursos_proprios: {default: true},
      calcula_intervalo: {default: true},
    }, this.cdRef, this.validate);
    this.join = ["alocacoes", "demanda"];
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

  public get unitDuracao(): "hour" | "day" {
    return this.form?.controls.usa_horas.value ? "hour" : "day";
  }

}
