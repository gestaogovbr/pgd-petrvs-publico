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
  @ViewChild('listaTipoResposta', { static: false }) public listaTipoResposta?: InputSelectComponent;

  public tipoQuestionario: LookupItem[] = [{ 'key': 'Interno', 'value': 'Interno' },{ 'key': 'Personalizado', 'value': 'Personalizado' }];
  public exemploLista: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' },{ 'key': '2', 'value': 'Exemplo 2' },{ 'key': '3', 'value': 'Exemplo 3' }];
  public exemploRadio: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' },{ 'key': '2', 'value': 'Exemplo 2' },{ 'key': '3', 'value': 'Exemplo 3' }];
  public tipoPergunta: LookupItem[] = [{ 'key': 'LISTA', 'value': 'Lista' },{ 'key': 'SWITCH', 'value': 'Sim/Não' },{ 'key': 'MULTIPLA', 'value': 'Resposta Múltipla' },{ 'key': 'UNICA', 'value': 'Resposta Única' }];

  constructor(public injector: Injector) {
    super(injector, QuestionarioPergunta, QuestionarioPerguntaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      codigo: {default: ""},
      tipo: {default: ""},
      perguntas: {default: []},
      pergunta: {default: ""},
      switchExemplo: {default: false},
      multiOpcaoResposta: { default: [] },
      inputPergunta: {default: ""},
      listaTipoResposta: {default: ""},
      inputOpcoesResposta: {default: ""},
      inputValorResposta: {default: ""},
           
    }, this.cdRef, this.validate);
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    if(['inputPergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
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
  console.log('PERGUNTAS', this.form?.controls.perguntas.value)
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

  public addMultiPerguntas(){
    console.log('PERGUNTAS', this.form?.controls.perguntas.value)
    let result = undefined;
    const pergunta = this.form?.controls.inputPergunta.value;
    const tipoResposta = this.listaTipoResposta?.selectedItem;
    const key = this.util.textHash(pergunta);
    
    if (pergunta && tipoResposta?.value && this.form?.controls.multiOpcaoResposta.value && this.util.validateLookupItem(this.form!.controls.perguntas.value,key)) {
      let opcoesResposta = this.form?.controls.multiOpcaoResposta.value;
      let opcoesTexto =""
      let valoresResposta =""
      let index=opcoesResposta.length;
    
    if(tipoResposta.key != 'SWITCH'){
        opcoesResposta.forEach((element: {data: any; value: any;}) => {
              if(index==1){
                //opcoesTexto += (element.value)
                opcoesTexto += (element.data.opcao) + ' - Valor: ' + (element.data.valor)
               // valoresResposta += (element.data.valor)
              }else{
                opcoesTexto += (element.data.opcao) + ' - Valor: ' + (element.data.valor)+ ' - ';
                //valoresResposta += (element.data.valor) + ' - ' 
              }
              index--;  
        });
        console.log('opcoesTexto',opcoesTexto)
        result = {
          key: key,
          value: 'Pergunta: ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opção de Resposta: ' + opcoesTexto,
          data: {
            pergunta: pergunta,
            tipo: tipoResposta,
            opcaoResposta: opcoesResposta,
            _status: "ADD",
          }
        };
    }else{
        result = {
          key: key,
          value: 'Pergunta: ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opção de Resposta: ' +  tipoResposta.value,
          data: {
            pergunta:{'pergunta':pergunta, 'valor':''},
            tipo: tipoResposta,
            opcaoResposta: { 'key': 'UNICA', 'value': 'Resposta Única' },
            _status: "ADD",
          }
        };
    }
      this.form!.controls.inputPergunta.setValue("");
      this.form!.controls.listaTipoResposta.setValue("");
      this.form!.controls.inputOpcoesResposta.setValue("");
      this.form!.controls.multiOpcaoResposta.setValue([]);
    }
    return result;

  }

  public addMultiRespostas(){
    let result = undefined;
    
    const opcaoResposta = this.form?.controls.inputOpcoesResposta.value;
    const valorResposta = this.form?.controls.inputValorResposta.value
    const key = this.util.textHash(opcaoResposta);
    
    if (opcaoResposta && this.form?.controls.inputPergunta.value && this.listaTipoResposta?.selectedItem?.value && this.util.validateLookupItem(this.form!.controls.multiOpcaoResposta.value,key)) {
      result = {
        key: key,
        value: opcaoResposta + ' - ' + valorResposta,
        data: {
          opcao : opcaoResposta,
          valor : valorResposta,
          _status: "ADD",
        }
      };
      this.form!.controls.inputOpcoesResposta.setValue("");
      this.form!.controls.inputValorResposta.setValue("");
      
    }
    return result;
    
  }
}

