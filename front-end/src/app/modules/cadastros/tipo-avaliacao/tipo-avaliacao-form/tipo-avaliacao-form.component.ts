import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoAvaliacaoJustificativaDaoService } from 'src/app/dao/tipo-avaliacao-justificativa-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { TipoAvaliacaoJustificativa } from 'src/app/models/tipo-avaliacao-justificativas.model';
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
  public tipoJustificativa: TipoJustificativa = new TipoJustificativa();

  constructor(public injector: Injector) {
    super(injector, TipoAvaliacao, TipoAvaliacaoDaoService);
    this.tipoJustificativaDao = injector.get<TipoJustificativaDaoService>(TipoJustificativaDaoService);
    this.join = ["tipos_avaliacoes_justificativas", "tipos_avaliacoes_justificativas.tipo_justificativa"];
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      nota_atribuida: {default: 0}, 
      aceita_entrega: {default: ""},
      pergunta: {default: ""},
      icone: {default: ""},
      cor: {default: ""},
      justificativa_id: {default: ""},
      justificativas: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: null},
    }, this.cdRef, this.validate);
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

    if(['nome', 'pergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: TipoAvaliacao, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    if(entity.tipos_avaliacoes_justificativas?.length) {
      entity.tipos_avaliacoes_justificativas!.forEach(t => {
        this.justificativasLista.push({
          key: t.tipo_justificativa_id,
          value: t.tipo_justificativa?.nome || "Desconhecido",
          data: t
        });
      });      
    }
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
      tipoAvaliacao.tipos_avaliacoes_justificativas = this.justificativasLista.map(j => {
        return j.data ? j.data : Object.assign(new TipoAvaliacaoJustificativa(), {
          tipo_justificativa_id: j.key
        });
      });
      resolve(tipoAvaliacao);
    });
  }

  public titleEdit = (entity: TipoAvaliacao): string => {
    return "Editando " + (entity?.nome || "");
  }
}

