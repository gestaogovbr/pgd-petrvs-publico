import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { TipoJustificativa} from 'src/app/models/tipo-justificativa.model';

@Component({
  selector: 'app-tipo-avaliacao-form',
  templateUrl: './tipo-avaliacao-form.component.html',
  styleUrls: ['./tipo-avaliacao-form.component.scss']
})

export class TipoAvaliacaoFormComponent extends PageFormBase<TipoAvaliacao, TipoAvaliacaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public tipoJustificativaDao: TipoJustificativaDaoService;
  public justificativasLista: LookupItem[] = [];
  public form: FormGroup;
  public formNota: FormGroup;
  public tipoJustificativa: TipoJustificativa = new TipoJustificativa();

  constructor(public injector: Injector) {
    super(injector, TipoAvaliacao, TipoAvaliacaoDaoService);
    this.tipoJustificativaDao = injector.get<TipoJustificativaDaoService>(TipoJustificativaDaoService);
    this.join = ["tipos_avaliacoes_justificativas", "tipos_avaliacoes_justificativas.tipo_justificativa"];
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tipo: {default: "QUANTITATIVO"},
      notas: {default: []}
    }, this.cdRef, this.validate);
    this.formNota = this.fh.FormBuilder({
      aceita_entrega: {default: ""},
      pergunta: {default: ""},
      icone: {default: ""},
      cor: {default: ""}
    }, this.cdRef, this.validateNota);
  }
  
  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    if(this.util.validateLookupItem(this.justificativasLista, this.form.controls.justificativa_id.value)) {
      this.tipoJustificativaDao.getById(this.form.controls.justificativa_id.value).then(j => {
        result = {
          key: j?.id,
          value: j?.nome
        }
        return result;
      })
    }
    return result;
  };

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validateNota = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['pergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: TipoAvaliacao, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new TipoAvaliacao();
    this.loadData(this.entity, form);    
  }

  public saveData(form: IIndexable): Promise<TipoAvaliacao> {
    return new Promise<TipoAvaliacao>((resolve, reject) => {
      let tipoAvaliacao = this.util.fill(new TipoAvaliacao(), this.entity!);
      tipoAvaliacao = this.util.fillForm(tipoAvaliacao, this.form!.value);
      resolve(tipoAvaliacao);
    });
  }

  public titleEdit = (entity: TipoAvaliacao): string => {
    return "Editando " + this.lex.translate("Tipo de Avaliação") + ': ' + (entity?.nome || "");
  }
}

