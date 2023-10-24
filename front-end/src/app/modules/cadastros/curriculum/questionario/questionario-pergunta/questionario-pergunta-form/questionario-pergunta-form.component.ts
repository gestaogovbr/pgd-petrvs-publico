import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-questionario-pergunta-form',
  templateUrl: './questionario-pergunta-form.component.html',
  styleUrls: ['./questionario-pergunta-form.component.scss']
})
export class QuestionarioPerguntaFormComponent extends PageFormBase<QuestionarioPergunta, QuestionarioPerguntaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('listaExemplo', { static: false }) public listaExemplo?: InputSelectComponent;

  public tipoQuestionario: LookupItem[] = [{ 'key': 'Interno', 'value': 'Interno' },{ 'key': 'Personalizado', 'value': 'Personalizado' }];
  public exemploLista: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' },{ 'key': '2', 'value': 'Exemplo 2' },{ 'key': '3', 'value': 'Exemplo 3' }];
  public exemploRadio: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' },{ 'key': '2', 'value': 'Exemplo 2' },{ 'key': '3', 'value': 'Exemplo 3' }];
  public tipoPergunta: LookupItem[] = [{ 'key': 'LISTA', 'value': 'Lista' },{ 'key': 'SWICTH', 'value': 'Sim/Não' },{ 'key': 'MULTIPLA', 'value': 'Resposta Múltipla' },{ 'key': 'UNICA', 'value': 'Resposta Única' }];

  constructor(public injector: Injector) {
    super(injector, QuestionarioPergunta, QuestionarioPerguntaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      codigo: {default: ""},
      tipo: {default: ""},
      perguntas: {default: ""},
      pergunta: {default: ""},
      switchExemplo: {default: false},
           
    }, this.cdRef, this.validate);
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: QuestionarioPergunta, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new QuestionarioPergunta());
  }


  public saveData(form: IIndexable): Promise<QuestionarioPergunta> {
  return new Promise<QuestionarioPergunta>((resolve, reject) => {
      const questionario = this.util.fill(new QuestionarioPergunta(), this.entity!);
      resolve(this.util.fillForm(questionario, this.form!.value));
    });
  }


  public titleEdit = (entity: QuestionarioPergunta): string => {
    return "Editando " + (entity?.nome || "");
  }

  public onEscolheTipoPerguntaChange(){
    let select = document.getElementById('tdID') as HTMLInputElement;
    let table = document.getElementById('tablePerguntas') as HTMLInputElement;
    let input = this.listaExemplo?.value
    let teste = `<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>`;
    if(input != "SWICTH"){
      //select.innerHTML += '<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>';
          select.innerHTML +=teste;
    }
  }
}

