import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioRespostaDaoService } from 'src/app/dao/questionario-resposta-dao.service';
import { QuestionarioRespostaPerguntaDaoService } from 'src/app/dao/questionario-resposta-pergunta-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPergunta, QuestionarioPerguntaTipo } from 'src/app/models/questionario-pergunta.model';
import { Questionario } from 'src/app/models/questionario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'questionario-pergunta-form',
  templateUrl: './questionario-pergunta-form.component.html',
  styleUrls: ['./questionario-pergunta-form.component.scss']
})
export class QuestionarioPerguntaFormComponent extends PageFormBase<Questionario, QuestionarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('listaExemplo', { static: false }) public listaExemplo?: InputSelectComponent;
  @ViewChild('listaTipoResposta', { static: false }) public listaTipoResposta?: InputSelectComponent;
  @ViewChild('listaTipoRespostaB', { static: false }) public listaTipoRespostaB?: InputSelectComponent;

  public exemploLista: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' }, { 'key': '2', 'value': 'Exemplo 2' }, { 'key': '3', 'value': 'Exemplo 3' }];
  public exemploRadio: LookupItem[] = [{ 'key': '1', 'value': 'Exemplo 1' }, { 'key': '2', 'value': 'Exemplo 2' }, { 'key': '3', 'value': 'Exemplo 3' }];
  public questionarioPerguntaDao?: QuestionarioPerguntaDaoService;
  public questionarioRespostaPerguntaDao?: QuestionarioRespostaPerguntaDaoService;
  public formPergunta: FormGroup;

  constructor(public injector: Injector) {
    super(injector, Questionario, QuestionarioDaoService);
    this.questionarioPerguntaDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);
    this.questionarioRespostaPerguntaDao = injector.get<QuestionarioRespostaPerguntaDaoService>(QuestionarioRespostaPerguntaDaoService);
    this.join = ["perguntas"];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      perguntas: { default: [] },
      codigo: { default: "" },
      tipoQuestionario: { default: "" },
      switchExemplo: { default: false },
    }, this.cdRef, this.validate);
    this.formPergunta = this.fh.FormBuilder({
      pergunta: { default: "" },
      tipo: { default: "" },
      respostas: { default: [] },
      inputOpcoesResposta: { default: "" },
      inputValorResposta: { default: "" },
      inputMinimo: { default: 0 },
      inputMaximo: { default: 10 }
      //criado_versao: number | undefined;
      //deletado_versao: number | undefined;
    }, this.cdRef, this.perguntaValidate);
  }

  public perguntaValidate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public async loadData(entity: Questionario, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    this.entity = new Questionario();
    await this.loadData(this.entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Questionario> {
    return new Promise<Questionario>((resolve, reject) => {
      let questionario = this.util.fill(new Questionario(), this.entity!);
      questionario = this.util.fillForm(questionario, this.form!.value);
      questionario.perguntas = this.form!.controls.perguntas.value.filter((x: QuestionarioPergunta) => x._status?.length);
      resolve(questionario);
    });
  }

  public titleEdit = (entity: Questionario): string => {
    return "Editando " + (entity?.nome || "");
  }

  /*public onEscolheTipoChange(){
    let select = document.getElementById('tdID') as HTMLInputElement;
    let table = document.getElementById('tables') as HTMLInputElement;
    let input = this.listaExemplo?.value
    let teste = `<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>`;
    if(input != "SWICTH"){
      //select.innerHTML += '<input-text [size]="4" label="Opção de resposta" icon="bi bi-pen" controlName="opres" [control]="form!.controls.opres" [attr.maxlength]=250></input-text>';
          select.innerHTML +=teste;
    }
  }*/

  public addMultiRespostas() {
    let result = undefined;
    const opcaoResposta = this.formPergunta.controls.inputOpcoesResposta.value;
    const valorResposta = this.formPergunta.controls.inputValorResposta.value;
    const key = opcaoResposta;
    if (opcaoResposta && valorResposta && this.util.validateLookupItem(this.formPergunta.controls.respostas.value, key)) {
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
    if (form?.valid) {
      row.pergunta = form.pergunta;
      row.tipo = form.tipo;

      // limpar campos do formulario
      // TODO
      return row;
    }
    return undefined;
  }

  public isList(tipo: QuestionarioPerguntaTipo) {
    return ['LISTA_UNICA', 'LISTA_MULTIPLA'].includes(tipo);
  }

  public isRange(tipo: QuestionarioPerguntaTipo) {
    return ['CLASSIFICACAO', 'INTENSIDADE'].includes(tipo);
  }

  public async addPergunta() {
    const maxSequencia = Math.max(0, ...(this.form!.controls.perguntas.value || []).map((x: QuestionarioPergunta) => x.sequencia));
    return new QuestionarioPergunta({ sequencia: maxSequencia + 1 , _status: "ADD" });
  }

  public async loadPergunta(form: FormGroup, row: QuestionarioPergunta) {
    this.formPergunta.controls.pergunta.setValue(row.pergunta);
    this.formPergunta.controls.tipo.setValue(row.tipo);
    this.formPergunta.controls.respostas.setValue(this.isList(row.tipo) ? row.respostas || [] : []);
    this.formPergunta.controls.inputMinimo.setValue(this.isRange(row.tipo) ? row.respostas.min : 0);
    this.formPergunta.controls.inputMaximo.setValue(this.isRange(row.tipo) ? row.respostas.max : 10);
  }

  public async removePergunta(row: any) {
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir esta pergunta?")) {
      row._status = "DEL";
    }
    return undefined;
  }

  public async savePergunta(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.pergunta = values.pergunta;
      row.tipo = values.tipo;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      row.respostas = this.isList(values.tipo) ? values.respostas : 
        (this.isRange(values.tipo) ? { min: values.inputMinimo, max: values.inputMaximo} : null);
      return row;
    }
    return undefined;
  }

  public onTipoPerguntaChange() {
    if(!this.isList(this.formPergunta.controls.tipo.value)) this.formPergunta.controls.respostas.setValue([]);
    if(!this.isRange(this.formPergunta.controls.tipo.value)) {
      this.formPergunta.controls.inputMinimo.setValue(0);
      this.formPergunta.controls.inputMaximo.setValue(10);
    }
    this.cdRef.detectChanges();
  }

  public addItemHandle() { return { 'key': 'key', 'value': 'value' } }

  public deleteItemHandle() { }
}

