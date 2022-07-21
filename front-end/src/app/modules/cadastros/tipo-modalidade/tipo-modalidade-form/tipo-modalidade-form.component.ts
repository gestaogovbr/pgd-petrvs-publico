import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-modalidade-form',
  templateUrl: './tipo-modalidade-form.component.html',
  styleUrls: ['./tipo-modalidade-form.component.scss']
})
export class TipoModalidadeFormComponent extends PageFormBase<TipoModalidade, TipoModalidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoModalidade, TipoModalidadeDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      atividades_homologadas: { default: "" },
      dispensa_avaliacao: { default: "" },
      exige_assinatura: { default: true },
      exige_assinatura_gestor_unidade: { default: false },
      exige_assinatura_gestor_entidade: { default: false },
      ganho_produtividade: { default: 0 },
      calcula_tempo_despendido: { default: true },
      data_inicio: { default: "" },
      data_fim: { default: "" },
      comparecer_presencialmente: { default: true }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoModalidade, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoModalidade());
  }

  public saveData(form: IIndexable): Promise<TipoModalidade> {
    return new Promise<TipoModalidade>((resolve, reject) => {
      const tipoModalidade = this.util.fill(new TipoModalidade(), this.entity!);
      resolve(this.util.fillForm(tipoModalidade, this.form!.value));
    });
  }

  public titleEdit = (entity: TipoModalidade): string => {
    return "Editando " + (entity?.nome || "");
  }
}

