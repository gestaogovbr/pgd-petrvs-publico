import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { IIndexable } from 'src/app/models/base.model';
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
  @ViewChild('planejamentoSuperiorNome', {static: false}) public planejamentoSuperiorNome?: InputTextComponent;
  @ViewChild('eixoTematico', {static: false}) public eixoTematico?: InputSearchComponent;

  public planejamento?: Planejamento;
  public objetivos: LookupItem[] = [];
  public objetivos_superiores: LookupItem[] = [];
  public planejamentoDao?: PlanejamentoDaoService;
  public eixoTematicoDao?: EixoTematicoDaoService;

  constructor(public injector: Injector) {
    super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.eixoTematicoDao = injector.get<EixoTematicoDaoService>(EixoTematicoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      fundamentacao: {default: ""},
      planejamento_id: {default: null},
      planejamento_superior_nome: {default: ""},
      eixo_tematico_id: {default: null},
      objetivo_superior_id: {default: null},
      objetivo_pai_id: {default: null},
    }, this.cdRef, this.validate);
  }


  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome','fundamentacao','eixo_tematico_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) =>{
    let result = null;
    /*  Regra está sendo discutida
        (RN_PLAN_INST_OBJ_A)
        Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior
    */
/*     if(this.isPlanejamentoUNEX() && !this.form?.controls.objetivo_superior_id.value){
      result = "Quando o Planejamento é de uma Unidade Executora é obrigatório associar cada um dos seus objetivos a um objetivo do Planejamento Institucional superior!";
    } */
    return result;
  }

  public async loadData(entity: PlanejamentoObjetivo, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    await this.eixoTematico?.loadSearch(entity.eixo_tematico || entity.eixo_tematico_id);
    this.title = entity._status == 'ADD' ? 'Inclusão de Objetivo' : 'Editando objetivo...';
    this.planejamento = this.metadata?.planejamento as Planejamento;
    if(this.metadata?.planejamento_superior) this.planejamento.planejamento_superior = this.metadata.planejamento_superior as Planejamento;
    this.form?.controls.planejamento_superior_nome.setValue(this.planejamento?.planejamento_superior?.nome || '');
    this.objetivos_superiores = this.planejamento?.planejamento_superior?.objetivos?.map(x => Object.assign({}, { key: x.id, value: x.nome, data: x })) || [];
  }

  public async initializeData(form: FormGroup) {
    this.entity = this.metadata?.objetivo as PlanejamentoObjetivo;
    this.objetivos = (this.metadata?.objetivos as PlanejamentoObjetivo[]).map(x => Object.assign({}, {
      key: x.id,
      value: x.nome,
      data: x
    }));
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>(async (resolve, reject) => {
      const objetivo = Object.assign({}, this.entity!);
      resolve(new NavigateResult(this.util.fillForm(objetivo, this.form!.value)));
    });
  }

  public isPlanejamentoUNEX(): boolean {
    return this.planejamento?.unidade_id != null;
  }
  public onObjetivoPaiChange(row: any) {
    const objetivoPai = this.form!.controls.objetivo_pai_id.value as PlanejamentoObjetivo
    const eixoTematico = this.objetivos.find(x => x.key === objetivoPai);
    if (eixoTematico) {
      this.form!.controls.eixo_tematico_id.setValue(eixoTematico?.data.eixo_tematico_id);
    }
    this.cdRef.detectChanges();
  }


}
