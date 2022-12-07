import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Capacidade } from 'src/app/models/capacidade.model';
import { Perfil } from 'src/app/models/perfil.model';
import { TipoCapacidade } from 'src/app/models/tipo-capacidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent extends PageFormBase<Perfil, PerfilDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public capacidades: IIndexable = {};
  public tiposCapacidades: TipoCapacidade[] = [];
  public tipoCapacidadeDao: TipoCapacidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Perfil, PerfilDaoService);
    this.tipoCapacidadeDao = injector.get<TipoCapacidadeDaoService>(TipoCapacidadeDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      descricao: {default: ""},
      nivel: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      capacidades: {default: []}
    }, this.cdRef, this.validate);
    this.join = ["capacidades.tipo_capacidade"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    };
    return result;
  }

  public async loadData(entity: Perfil, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let capacidades: Capacidade[] = [];
    this.tiposCapacidades = await this.tipoCapacidadeDao.query().asPromise();
    formValue = this.util.fillForm(formValue, entity);
    for(let tipoCapacidade of this.tiposCapacidades) {
      const capacidade = entity.capacidades?.find(x => x.tipo_capacidade?.codigo == tipoCapacidade.codigo);
      this.capacidades[tipoCapacidade.codigo] = !!capacidade;
      capacidades.push(Object.assign(new Capacidade(), {
        id: capacidade ? capacidade.id : this.tipoCapacidadeDao.generateUuid(),
        tipo_capacidade: tipoCapacidade,
        perfil_id: entity.id,
        tipo_capacidade_id: tipoCapacidade.id
      }));
    }
    formValue.capacidades = capacidades;
    form.patchValue(formValue);
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Perfil());
  }

  public saveData(form: IIndexable): Promise<Perfil> {
    return new Promise<Perfil>((resolve, reject) => {
      let perfil = this.util.fill(new Perfil(), this.entity!);
      let capacidades = Object.entries(this.capacidades).filter(x => x[1]).map(x => x[0]);
      let changes: Capacidade[] = this.entity!.capacidades || [];
      perfil = this.util.fillForm(perfil, this.form!.value);
      changes.forEach(x => {
        if(!capacidades.includes(x.tipo_capacidade!.codigo)) x._status = "DELETE";
      });
      capacidades.forEach(x => {
        if(!changes.find(y => y.tipo_capacidade!.codigo == x)) {
          const tipoCapacidade = this.tiposCapacidades.find(z => z.codigo == x);
          changes.push(Object.assign(new Capacidade(), {
            id: this.tipoCapacidadeDao.generateUuid(),
            perfil_id: this.entity!.id,
            tipo_capacidade: tipoCapacidade,
            tipo_capacidade_id: tipoCapacidade!.id,
            _status: "ADD"
          }));
        }
      });
      perfil.capacidades = changes.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
      resolve(perfil);
    });
  }

  public titleEdit = (entity: Perfil): string => {
    return "Editando " + (entity?.nome || "");
  }
}

