import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CapacidadeDaoService } from 'src/app/dao/capacidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Capacidade } from 'src/app/models/capacidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';

@Component({
  selector: 'app-capacidade-form',
  templateUrl: './capacidade-form.component.html',
  styleUrls: ['./capacidade-form.component.scss']
})
export class CapacidadeFormComponent extends PageFormBase<Capacidade, CapacidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('tipo_capacidade', { static: false }) public tipoCapacidade?: InputSearchComponent;

  public tipoCapacidadeDao: TipoCapacidadeDaoService;
  public perfilDao: PerfilDaoService;

  constructor(public injector: Injector) {
    super(injector, Capacidade, CapacidadeDaoService);
    this.tipoCapacidadeDao = injector.get<TipoCapacidadeDaoService>(TipoCapacidadeDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);

    this.form = this.fh.FormBuilder({
      perfil_id: {default: ""},
      tipo_capacidade_id: {default: ""}
    }, this.cdRef, this.validate);
    this.join = ["tipo_capacidade"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['perfil_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public async loadData(entity: Capacidade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await Promise.all ([
      this.tipoCapacidade!.loadSearch(entity.tipo_capacidade || entity.tipo_capacidade_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Capacidade());
  }

  public saveData(form: IIndexable): Promise<Capacidade> {
    return new Promise<Capacidade>((resolve, reject) => {
      const capacidade = this.util.fill(new Capacidade(), this.entity!);
      resolve(this.util.fillForm(capacidade, this.form!.value));
    });
  }

  public titleEdit = (entity: Capacidade): string => {
    return "Editando " + this.lex.translate("Capacidade") + ': ' + (entity?.perfil?.nome || "") + ': ' + (entity?.tipo_capacidade?.codigo || "");
  }
}

