import { Component, Injector, ViewChild } from '@angular/core';
import { PageFormBase } from '../../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { Questionario } from 'src/app/models/questionario.model';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioPreenchimento } from 'src/app/models/questionario-preenchimento.model';
import { QuestionarioPreenchimentoDaoService } from 'src/app/dao/questionario-preenchimento-dao.service';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'curriculum-atributos-qvt-form',
  templateUrl: './curriculum-atributos-qvt-form.component.html',
  styleUrls: ['./curriculum-atributos-qvt-form.component.scss']
})
export class CurriculumAtributosQvtFormComponent extends PageFormBase<QuestionarioPreenchimento, QuestionarioPreenchimentoDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public unidadeDao: UnidadeDaoService;
  public questionario?: Questionario;
  public perguntas: QuestionarioPergunta[] = [];
  public indice0a9: number[] = Array.from(new Array(10), (x, i) => i + 0);

  constructor(public injector: Injector) {
    super(injector, QuestionarioPreenchimento, QuestionarioPreenchimentoDaoService);
    this.join = ['respostas'];
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      concorda: { default: false },
      idade: { default: 0 },
      sexo: { default: '' },
      concordaSexo: { default: true },
      raca: { default: '' },
      estadoCivil: { default: '' },
      escolaridade: { default: '' },
      ufExercicio: { default: '' },
      situacaoFuncional: { default: '' },
      anosInstituicao: { default: 0 },
      unidade_id: { default: '' },
      necessitaAtencao: { default: false },
      cuidadoCrianca: { default: false },
      numeroCrianca: { default: 0 },
      deficiencia: { default: false },
      satisfeitoRemuneracao: { default: '' },
      satisfeitoBeneficio: { default: '' },
      comparaRemuneracao: { default: '' },
      satisfeitoMeios: { default: '' },
      satisfeitoCarga: { default: '' },
      satisfeitoTarefas: { default: '' },
      satisfeitoHabilidades: { default: '' },
      satisfeitoRelevancia: { default: '' },
      satisfeitoAutonomia: { default: '' },
      satisfetoAvaliacao: { default: '' },
      satisfeitoCrescimento: { default: '' },
      satisfeitoIncentivo: { default: '' },
      satisfeitoiniciativas: { default: '' },
      satisfeitoColegas: { default: '' },
      satisfeitoChefia: { default: '' },
      comunicacaoChefia: { default: '' },
      satisfeitoLeis: { default: '' },
      satisfeitoIndividualidade: { default: '' },
      satisfeitoExpressao: { default: '' },
      satisfeitoPreocupacao: { default: '' },
      satisfeitoInfluencia: { default: '' },
      satisfeitoLazer: { default: '' },
      satisfeitoEntrega: { default: '' },
      oportunidades: { default: '' },
      orgulho: { default: '' },
      etarismo: { default: false },
      discriminacao: { default: false },
      assedio: { default: false },
      discriminacaoTrabalho: { default: false },
      formasDiscriminacao: { default: [] },
      perecebeDiscriminacao: { default: '' },
      dass1: { default: '' },
      dass2: { default: '' },
      dass3: { default: '' },
      dass4: { default: '' },
      dass5: { default: '' },
      dass6: { default: '' },
      dass7: { default: '' },
      dass8: { default: '' },
      dass9: { default: '' },
      dass10: { default: '' },
      dass11: { default: '' },
      dass12: { default: '' },
      dass13: { default: '' },
      dass14: { default: '' },
      dass15: { default: '' },
      dass16: { default: '' },
      dass17: { default: '' },
      dass18: { default: '' },
      dass19: { default: '' },
      dass20: { default: '' },
      dass21: { default: '' },
      participaPGD: { default: '' },
      regimePGD: { default: '' },
      qualidadeVidaPGD: { default: '' },
      produtividadePGD: { default: '' },
      qualidadeTrabalhoPGD: { default: '' },
      entregaPGD: { default: false },
      chefia: { default: '' },
      colaboradoresPGD: { default: false },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: QuestionarioPreenchimento, form: FormGroup) {
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'QVT']], join: ['perguntas.respostas'] }).asPromise();
    this.questionario = questionario?.length ? questionario[0] : undefined;
    if (this.questionario) {
      /* Ordena as perguntas */
      this.questionario.perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.perguntas = this.questionario.perguntas || [];
      /* Adiona metadatas */
      for (let pergunta of this.perguntas) {
        pergunta._metadata = { control: this.form!.controls[pergunta.codigo || ""] }
      }
    } else {
      this.dialog.alert("Questionário QVT não localizado", "Questionário não localizado");
    }
  }

  public async initializeData(form: FormGroup) {
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<QuestionarioPreenchimento | boolean> {
    if (!this.questionario) return false;
    let questionarioResposta = this.util.fill(new QuestionarioPreenchimento(), this.entity || {});
    questionarioResposta.usuario_id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeee";
    questionarioResposta.editavel = 0;
    questionarioResposta.questionario_id = this.questionario!.id;
    return questionarioResposta;
  }

  public range(start: number, end: number) {
    let result: number[] = [];
    for (let idx = start; idx <= end; idx++) result.push(idx);
    return result;
  }
}

