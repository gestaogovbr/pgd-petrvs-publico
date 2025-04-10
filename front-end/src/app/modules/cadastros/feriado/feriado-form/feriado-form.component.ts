import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Feriado } from 'src/app/models/feriado.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';

@Component({
  selector: 'app-feriado-form',
  templateUrl: './feriado-form.component.html',
  styleUrls: ['./feriado-form.component.scss']
})

export class FeriadoFormComponent extends PageFormBase<Feriado, FeriadoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('cidade', { static: false }) public cidade?: InputSearchComponent;
  @ViewChild('entidade', { static: false }) public entidade?: InputSearchComponent;

  public entidadeDao: EntidadeDaoService;
  public cidadeDao: CidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Feriado, FeriadoDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);

    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      dia: {default: ""},
      mes: {default: ""},
      ano: {default: null},
      recorrente: {default: 1},
      abrangencia: {default: "NACIONAL"},
      codigo_ibge: {default: null},
      cidade_id: {default: null},
      uf: {default: null},
      entidade_id: {default: null},
      data_inicio: {default: new Date()},
      data_fim: {default: new Date()}
    }, this.cdRef, this.validate);
    this.join = ["cidade", "entidade"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "ano" && this.form?.controls.recorrente.value == 0 && !this.util.between(parseInt(control.value || 0), {start: 2000, end: 2100})) {
      result = "Inválido";
    }
    return result;
  }

  public checkAnoDisabled(): string | undefined {
    const enable = !this.form?.controls.recorrente.value;
    if(!enable && this.form?.controls.ano.value != null) {
      this.form?.controls.ano.setValue(null);
      this.cdRef.markForCheck();
    }
    return !enable ? 'true' : undefined;
  }

  public async loadData(entity: Feriado, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let feriado = (this.util.fillForm(formValue, entity));
    await Promise.all ([
      this.cidade?.loadSearch(entity.cidade || entity.cidade_id),
      this.entidade!.loadSearch(entity.entidade || entity.entidade_id)
    ]);
    form.patchValue(feriado);
  }

  public initializeData(form: FormGroup): void {
    this.loadData(new Feriado(), form);
  }

  public saveData(form: IIndexable): Promise<Feriado> {
    return new Promise<Feriado>((resolve, reject) => {
      let feriado = this.util.fill(new Feriado(), this.entity!);
      feriado = this.util.fillForm(feriado, this.form!.value);
      if(feriado.abrangencia == "MUNICIPAL" && this.cidade?.selectedEntity) {
        feriado.codigo_ibge = (this.cidade?.selectedEntity as Cidade).codigo_ibge;
      } else if(feriado.abrangencia == "ESTADUAL") {
        feriado.codigo_ibge = this.lookup.UF.find(x => x.key == feriado.uf)?.code;
      } else {
        feriado.codigo_ibge = null;
      }
      resolve(feriado);
    });
  }

  public titleEdit = (entity: Feriado): string => {
    return "Editando " + this.lex.translate("Feriado") + ': ' + (entity?.nome || "");
  }
}

