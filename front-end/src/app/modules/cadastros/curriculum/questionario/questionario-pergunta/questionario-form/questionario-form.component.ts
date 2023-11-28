import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioRespostaDaoService } from 'src/app/dao/questionario-resposta-dao.service';
import { QuestionarioRespostaPerguntaDaoService } from 'src/app/dao/questionario-resposta-pergunta-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Questionario } from 'src/app/models/questionario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'questionario-form',
  templateUrl: './questionario-form.component.html',
  styleUrls: ['./questionario-form.component.scss']
})
export class QuestionarioFormComponent extends PageFormBase<Questionario, QuestionarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('listaExemplo', { static: false }) public listaExemplo?: InputSelectComponent;
  @ViewChild('listaTipoResposta', { static: false }) public listaTipoResposta?: InputSelectComponent;
  @ViewChild('listaTipoRespostaB', { static: false }) public listaTipoRespostaB?: InputSelectComponent;

  public tipoQuestionario: LookupItem[] = [{ 'key': 'INTERNO', 'value': 'Interno' },{ 'key': 'PERSONALIZADO', 'value': 'Personalizado' }];
  public exemploLista: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' },{ 'key': '2', 'value': 'Exemplo 2' },{ 'key': '3', 'value': 'Exemplo 3' }];
  public exemploRadio: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' },{ 'key': '2', 'value': 'Exemplo 2' },{ 'key': '3', 'value': 'Exemplo 3' }];
  public tipo: LookupItem[] = [{ 'key': 'LISTA', 'value': 'Lista' },{ 'key': 'SWITCH', 'value': 'Sim/Não' },{ 'key': 'MULTIPLA', 'value': 'Resposta Múltipla' },{ 'key': 'UNICA', 'value': 'Resposta Única' }];
  public formPergunta: FormGroup;
  public questionarioPerguntaDao? : QuestionarioPerguntaDaoService;
  public questionarioRespostaPerguntaDao? : QuestionarioRespostaPerguntaDaoService;
  
  constructor(public injector: Injector) {
    super(injector, Questionario, QuestionarioDaoService);
    this.questionarioPerguntaDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);
    this.questionarioRespostaPerguntaDao = injector.get<QuestionarioRespostaPerguntaDaoService>(QuestionarioRespostaPerguntaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      codigo: {default: ""},
      tipo: {default: ""},
      perguntas: {default: []},
      pergunta: {default: ""},
      switchExemplo: {default: false},
      multiOpcaoResposta: { default: [] },
      input: {default: ""},
      listaTipoResposta: {default: ""},
      inputOpcoesResposta: {default: ""},
      inputValorResposta: {default: ""},  
    }, this.cdRef, this.validate);
    this.formPergunta = this.fh.FormBuilder ({
      perguntasB:{default:[]},
      perguntaB: {default: ""},
      listaTipoRespostaB:{default: ""},
      tipoRespostaB:{default: []},
      inputOpcoesRespostaB:{default: ""},
      inputValorRespostaB:{default: ""},
      opcoesResposta:{default: {'opcao':"",'valor':""}},
    }, this.cdRef, this.perguntaValidate);
  }

  public perguntaValidate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    if(['input'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Questionario, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Questionario());
  }


  public saveData(form: IIndexable): Promise<Questionario> {
  console.log('PERGUNTAS', this.form?.controls.perguntas.value)
  return new Promise<Questionario>((resolve, reject) => {
      const questionario = this.util.fill(new Questionario(), this.entity!);
      resolve(this.util.fillForm(questionario, this.form!.value));
    });
  }


  public titleEdit = (entity: Questionario): string => {
    return "Editando " + (entity?.nome || "");
  }

  public onEscolheTipoChange(){
    let select = document.getElementById('tdID') as HTMLInputElement;
    let table = document.getElementById('tables') as HTMLInputElement;
    let input = this.listaExemplo?.value
    let teste = `<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>`;
    if(input != "SWICTH"){
      //select.innerHTML += '<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>';
          select.innerHTML +=teste;
    }
  }

  public addMultis(){
    console.log('PERGUNTAS', this.form?.controls.perguntas.value)
    let result = undefined;
    const pergunta = this.form?.controls.input.value;
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
          value: ': ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opção de Resposta: ' + opcoesTexto,
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
          value: ': ' + pergunta + ' - Tipo de Resposta: ' + tipoResposta.value + ' - Opção de Resposta: ' +  tipoResposta.value,
          data: {
            pergunta:{'pergunta':pergunta, 'valor':''},
            tipo: tipoResposta,
            opcaoResposta: { 'key': 'UNICA', 'value': 'Resposta Única' },
            _status: "ADD",
          }
        };
    }
      this.form!.controls.input.setValue("");
      this.form!.controls.listaTipoResposta.setValue("");
      this.form!.controls.inputOpcoesResposta.setValue("");
      this.form!.controls.multiOpcaoResposta.setValue([]);
    }
    return result;

  }

  public addMultiRespostasB(){
    let result = undefined;

    const opcaoResposta = this.formPergunta.controls.inputOpcoesRespostaB.value;
    const valorResposta = this.formPergunta.controls.inputValorRespostaB.value;
    const key = this.util.textHash(opcaoResposta + valorResposta);

/*
   valor - respota ?
*/

    if (opcaoResposta && valorResposta && this.util.validateLookupItem(this.formPergunta!.controls.perguntasB.value, key)) {
      result = {
        key: key,
        value: opcaoResposta + ' - ' + valorResposta,
        data: {
          opcaoResposta: opcaoResposta,
          valorResposta: valorResposta,
          _status: "ADD"
        }
      };
      //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
      //this.formPergunta.controls.inputOpcoesRespostaB.setValue("");
      //this.formPergunta.controls.inputValorRespostaB.setValue("");
    }
    
    return result;
       
  }

     /**
   * Método chamado para inserir um integrante no grid, seja este componente persistente ou não.
   /** @returns 
   
     public async add() {
      return {
        id: this.dao!.generateUuid(),
        perguntaB: "",
        listaTipoRespostaB:"",
        tipoRespostaB:"",
        multiOpcaoRespostaB:[],
        inputOpcoesRespostaB:"",
        inputValorRespostaB:"",
        opcoesResposta:{'opcao':'','valor':''},
      } as IIndexable;
    }
 
    /**
     * Método chamado na edição de um integrante da Unidade.
     * @param form 
     * @param row 
     */
    public async load(form: FormGroup, row: any) {
      ///form.controls.usuario_id.setValue(this.grid?.adding ? row.usuario_id : row.id);
      ///form.controls.atribuicoes.setValue(this.unidadeIntegranteService.converterAtribuicoes(row.atribuicoes));
      ///form.controls.atribuicao.setValue("");
    }
  
    /**
     * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não. 
     * @param row 
     * @returns 
     */
    public async remove(row: any) {
      return await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor?");
    }

    /**
     * Método chamado no salvamento de um integrante da unidade, seja este componente persistente ou não.
     * @param form 
     * @param row 
     * @returns 
     */
    public async save(form: IIndexable, row: any) {
      form?.markAllAsTouched();
      if(form?.valid) {
        row.pergunta = form.pergunta;
        row.tipo = form.tipo;
       
        // limpar campos do formulario
        // TODO
        return row;
      }
      return undefined;
    }

  
  
  
  public async addPergunta() {
    return {
    } ;
    
    
    
    /*{
      id: this.dao!.generateUuid(),
      perguntaB: "",
      listaTipoRespostaB:"",
      tipoRespostaB:"",
      multiOpcaoRespostaB:[],
      inputOpcoesRespostaB:"",
      inputValorRespostaB:"",
      opcoesResposta:{'opcao':'','valor':''},
    };*/


   }

  public async loadPergunta(){  }

  public async removePergunta(){  }

  public async savePergunta(){ }

  public addItemHandle(){ return {'key':'key', 'value':'value'}}

  public deleteItemHandle(){}
}

