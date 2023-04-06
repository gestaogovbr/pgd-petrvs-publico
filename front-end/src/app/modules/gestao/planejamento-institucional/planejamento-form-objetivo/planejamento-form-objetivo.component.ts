import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { NavigateResult } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-planejamento-form-objetivo',
  templateUrl: './planejamento-form-objetivo.component.html',
  styleUrls: ['./planejamento-form-objetivo.component.scss']
})
export class PlanejamentoFormObjetivoComponent extends PageFormBase<PlanejamentoObjetivo, PlanejamentoObjetivoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  //@ViewChild('planejamento_nome', {static: false}) public planejamento_nome?: InputTextComponent;
  @ViewChild('unidade_executora_nome', {static: false}) public unidade_executora_nome?: InputTextComponent;
  @ViewChild('planejamento_superior_nome', {static: false}) public planejamento_superior_nome?: InputTextComponent;

  public planejamento?: Planejamento;
  public planejamento_superior_id: string | null = null;
  public objetivos_superiores?: LookupItem[] = [];
  public planejamentoDao?: PlanejamentoDaoService;
  public eixoTematicoDao?: EixoTematicoDaoService;
  public planejamentoObjetivoDao?: PlanejamentoObjetivoDaoService;

  constructor(public injector: Injector) {
    super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.eixoTematicoDao = injector.get<EixoTematicoDaoService>(EixoTematicoDaoService);
    this.planejamentoObjetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      fundamentacao: {default: ""},
      planejamento_id: {default: null},
     // planejamento_nome: {default: ""},
      planejamento_superior_nome: {default: ""},
      unidade_executora_nome: {default: ""},
      eixo_tematico_id: {default: null},
      objetivo_superior_id: {default: null},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome','fundamentacao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) =>{
    let result = null;
    if(!this.planejamento?.unidade_id && !this.form?.controls.eixo_tematico_id.value){
      result = "Quando o Planejamento é da Unidade Instituidora é obrigatório associar cada objetivo a um Eixo Temático!";
    }
    if(this.planejamento?.unidade_id?.length && !this.form?.controls.objetivo_superior_id.value){
      result = "Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada objetivo a um objetivo do Planejamento Institucional superior!";
    }
    return result;
  }

  public loadData(entity: PlanejamentoObjetivo, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.title = entity._status == 'ADD' ? 'Inclusão de Objetivo' : 'Editando objetivo...';
    //form!.controls.planejamento_nome.setValue(this.planejamento!.nome);
  }

  public initializeData(form: FormGroup): void {
    this.entity = this.metadata?.objetivo as PlanejamentoObjetivo;
    this.planejamento = this.metadata?.planejamento as Planejamento;


    /*
    form!.controls.planejamento_id.setValue(this.planejamento!.id);
    
    if(this.planejamento_superior_id) this.planejamentoDao?.getById(this.planejamento_superior_id!, ['objetivos:id,nome']).then(planejamento => {
      this.form?.controls.planejamento_superior_nome.setValue(planejamento!.nome);
      this.objetivos_superiores = planejamento?.objetivos?.map(x => Object.assign({}, { key: x.id, value: x.nome, data: x })) || [];
    });
    form!.controls.unidade_executora_nome.setValue(this.planejamento!.unidade?.nome);*/
    
    this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>((resolve, reject) => {
      const objetivo = this.util.fill(new PlanejamentoObjetivo(), this.entity!);
      resolve(new NavigateResult(this.util.fillForm(objetivo, this.form!.value)));
    });
  }

/*   public titleEdit = (entity: PlanejamentoObjetivo): string => {
    return "Editando "+ (entity?.nome || "");
  } */

  public isPlanejamentoUNEX(): boolean {
    return this.planejamento?.unidade_id != null;
  }



}
