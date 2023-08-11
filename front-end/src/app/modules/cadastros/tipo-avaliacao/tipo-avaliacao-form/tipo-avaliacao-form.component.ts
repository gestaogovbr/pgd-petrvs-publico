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
import { TipoAvaliacaoNota } from 'src/app/models/tipo-avaliacao-nota';
import { TipoAvaliacaoJustificativa } from 'src/app/models/tipo-avaliacao-justificativas.model';

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
    this.join = ["notas.justificativas.tipo_justificativa"];
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tipo: {default: "QUANTITATIVO"},
      notas: {default: []}
    }, this.cdRef, this.validate);
    this.formNota = this.fh.FormBuilder({
      nota: {default: 0},
      descricao: {default: ""},
      aprova: {default: false},
      pergunta: {default: ""},
      justifica: {default: false},
      icone: {default: ""},
      cor: {default: ""},
      justificativas: {default: []},
      tipo_justificativa_id: {default: null}
    }, this.cdRef, this.validateNota);
  }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validateNota = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['pergunta', 'descricao', 'icone'].indexOf(controlName) >= 0 && !control.value?.length) {
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

  public async addNota() {
    return new TipoAvaliacaoNota({
      tipo_avaliacao_id: this.entity!.id, 
      sequencia: this.form!.controls.notas.value.length + 1
    }) as IIndexable;
  }

  public async loadNota(form: FormGroup, row: any) {
    form.controls.nota.setValue(row.nota);
    form.controls.descricao.setValue(row.descricao);
    form.controls.aprova.setValue(row.aprova);
    form.controls.pergunta.setValue(row.pergunta);
    form.controls.justifica.setValue(row.justifica);
    form.controls.icone.setValue(row.icone);
    form.controls.cor.setValue(row.cor);
    form.controls.tipo_justificativa_id.setValue(null);
    form.controls.justificativas.setValue(row.justificativas.map((x: TipoAvaliacaoJustificativa) => Object.assign({}, {
      key: x.tipo_justificativa_id,
      value: x.tipo_justificativa!.nome,
      data: x.tipo_justificativa
    })));
  }

  public async removeNota(row: any) {
    return await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
  }

  public async saveNota(form: FormGroup, row: any) {
    let justificativas: LookupItem[] = form!.controls.justificativas.value || [];
    row.justificativas = justificativas.map(x => {
      let older = row.justificativas.find((y: TipoAvaliacaoJustificativa) => y.tipo_justificativa_id == x.key);
      return older || new TipoAvaliacaoJustificativa({
        tipo_avaliacao_nota_id: this.entity!.id,
        tipo_justificativa_id: x.key,
        tipo_justificativa: x.data
      });
    });
    return row;
  }
}

