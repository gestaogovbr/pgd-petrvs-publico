import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ThemeService } from 'ng2-charts';
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

@Component({
  selector: 'app-planejamento-form-objetivo',
  templateUrl: './planejamento-form-objetivo.component.html',
  styleUrls: ['./planejamento-form-objetivo.component.scss']
})
export class PlanejamentoFormObjetivoComponent extends PageFormBase<PlanejamentoObjetivo, PlanejamentoObjetivoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('planejamento_nome', {static: false}) public planejamento_nome?: InputTextComponent;

  public planejamento?: Planejamento;
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
      planejamento_nome: {default: ""},
      eixo_tematico_id: {default: null},
      objetivo_superior_id: {default: null},
    }, this.cdRef, this.validate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.planejamento = this.queryParams.planejamento as Planejamento;
/*     this.form!.controls.planejamento_id.setValue(this.planejamento.id);
    this.form!.controls.planejamento_nome.setValue(this.planejamento.nome);
    this.cdRef.detectChanges(); */
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome','fundamentacao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: PlanejamentoObjetivo, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form!.patchValue(new PlanejamentoObjetivo());
    form!.controls.planejamento_id.setValue(this.planejamento!.id);
    form!.controls.planejamento_nome.setValue(this.planejamento!.nome);
    //cdRef.detectChanges();
  }

  public saveData(form: IIndexable): Promise<PlanejamentoObjetivo> {
    //this.util.fillForm(this.entity!, this.form!.value);
    return new Promise<PlanejamentoObjetivo>((resolve, reject) => {
      const objetivo = this.util.fill(new PlanejamentoObjetivo(), this.entity!);
      resolve(this.util.fillForm(objetivo, this.form!.value));
    });
  }

  public titleEdit = (entity: PlanejamentoObjetivo): string => {
    return "Editando "+ (entity?.nome || "");
  }

}
