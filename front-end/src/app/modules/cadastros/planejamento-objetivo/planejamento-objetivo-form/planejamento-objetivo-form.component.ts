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
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-planejamento-objetivo-form',
  templateUrl: './planejamento-objetivo-form.component.html',
  styleUrls: ['./planejamento-objetivo-form.component.scss']
})
export class PlanejamentoObjetivoFormComponent extends PageFormBase<PlanejamentoObjetivo, PlanejamentoObjetivoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

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

  public loadData(entity: PlanejamentoObjetivo, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup) {
    form.patchValue(new PlanejamentoObjetivo());
  }

  public async saveData(form: IIndexable): Promise<PlanejamentoObjetivo> {
    return new Promise<PlanejamentoObjetivo>((resolve, reject) => {
      const objetivo = this.util.fill(new PlanejamentoObjetivo(), this.entity!);
      resolve(this.util.fillForm(objetivo, this.form!.value));
    });
  }

  public titleEdit = (entity: PlanejamentoObjetivo): string => {
    return "Editando " + this.lex.translate("Objetivo de Planejamento") + ': ' + (entity?.nome || "");
  }

}
