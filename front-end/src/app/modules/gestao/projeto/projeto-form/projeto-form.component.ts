import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { ComentariosComponent } from 'src/app/modules/uteis/comentarios/comentarios.component';
import { LookupItem } from 'src/app/services/lookup.service';
import { ProjetoFormAlocacoesComponent } from '../projeto-form-alocacoes/projeto-form-alocacoes.component';
import { ProjetoFormPrincipalComponent } from '../projeto-form-principal/projeto-form-principal.component';
import { ProjetoFormRecursosComponent } from '../projeto-form-recursos/projeto-form-recursos.component';
import { ProjetoFormRegrasComponent } from '../projeto-form-regras/projeto-form-regras.component';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss']
})
export class ProjetoFormComponent extends PageFormBase<Projeto, ProjetoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('principal', { static: false }) public principal?: ProjetoFormPrincipalComponent;
  @ViewChild('recursos', { static: false }) public recursos?: ProjetoFormRecursosComponent;
  @ViewChild('alocacoes', { static: false }) public alocacoes?: ProjetoFormAlocacoesComponent;
  @ViewChild('regras', { static: false }) public regras?: ProjetoFormRegrasComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: ComentariosComponent;

  constructor(public injector: Injector) {
    super(injector, Projeto, ProjetoDaoService);
    this.join = [];
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'pergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Projeto, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Projeto();
    this.loadData(this.entity, form);    
  }

  public async saveData(form: IIndexable): Promise<Projeto> {
    Promise.all([
      this.principal!.saveData(),
      this.recursos!.saveData(),
      this.alocacoes!.saveData(),
      this.regras!.saveData(),
      this.comentarios!.saveData()
    ]);
    return this.entity! as Projeto;
  }

  public titleEdit = (entity: Projeto): string => {
    return "Editando " + (entity?.nome || "");
  }
}

