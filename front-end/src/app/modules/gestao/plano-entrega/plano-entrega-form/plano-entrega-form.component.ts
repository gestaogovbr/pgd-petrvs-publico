import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputDatetimeComponent } from 'src/app/components/input/input-datetime/input-datetime.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { ProgramaDaoService, ProgramaMetadata } from 'src/app/dao/programa-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { Programa } from 'src/app/models/programa.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import moment from 'moment';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';

@Component({
  selector: 'app-plano-entrega-form',
  templateUrl: './plano-entrega-form.component.html',
  styleUrls: ['./plano-entrega-form.component.scss']
})

export class PlanoEntregaFormComponent extends PageFormBase<PlanoEntrega, PlanoEntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: true }) public grid?: GridComponent;
  @ViewChild('programa', { static: true }) public programa?: InputSearchComponent;
  @ViewChild('unidade', { static: true }) public unidade?: InputSearchComponent;
  @ViewChild('nome', { static: true }) public nomePE?: InputTextComponent;
  @ViewChild('data_fim', { static: true }) public dataFim?: InputDatetimeComponent;

  public unidadeDao: UnidadeDaoService;
  public programaDao: ProgramaDaoService;
  public cadeiaValorDao: CadeiaValorDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public planejamentoInstitucionalDao: PlanejamentoDaoService;
  public form: FormGroup;
  public maxPE: Number | undefined;
  public programaMetadata: ProgramaMetadata;


  constructor(public injector: Injector) {
    super(injector, PlanoEntrega, PlanoEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.cadeiaValorDao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.planejamentoInstitucionalDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.join = [
      "entregas.entrega", 
      "entregas.objetivos.objetivo", 
      "entregas.processos.processo", 
      "entregas.produtos.produto", 
      "entregas.unidade", 
      "unidade", 
      'entregas.reacoes.usuario:id,nome,apelido'
    ];
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      data_inicio: { default: new Date()},
      data_fim: { default: new Date() },
      unidade_id: { default: "" },
      plano_entrega_id: { default: null },  // até o momento, um plano de entrega não poderá estar vinculado a outro (adesão de Plano de Entrega)
      planejamento_id: { default: null },
      cadeia_valor_id: { default: null },
      programa_id: { default: null },
      entregas: { default: [] },
    }, this.cdRef, this.validate);

    this.programaMetadata = {
      todosUnidadeExecutora: false,      
      vigentesUnidadeExecutora: true
    }  
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome', 'unidade_id', 'programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    if (['data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {    
    const inicio = this.form?.controls.data_inicio.value;
    const fim = this.form?.controls.data_fim.value;
    const programa = this.programa?.selectedEntity as Programa;
    if (!programa) {
      return "Obrigatório selecionar o programa";
    } else if (!this.dao?.validDateTime(inicio)) {
      return "Data de início inválida";
    } else if (!this.dao?.validDateTime(fim)) {
      return "Data de fim inválida";
    } else if (inicio > fim) {
      return "A data do fim não pode ser menor que a data do início!";
    } else {
      const entregas = this.form!.controls.entregas.value || [];
      for (let entrega of entregas) {
        if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && entrega.data_inicio < inicio) return "A " + this.lex.translate("entrega") + " '" + entrega.descricao + "' possui data inicial anterior à " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(inicio);
        if (!this.auth.hasPermissionTo("MOD_PENT_ENTR_EXTRPL") && entrega.data_fim > fim) return "A " + this.lex.translate("entrega") + " '" + entrega.descricao + "' possui data fim posterior à " + this.lex.translate("do Plano de Entrega") + ": " + this.util.getDateFormatted(fim);
      }
    }
    return undefined;
  }

  public async loadData(entity: PlanoEntrega, form: FormGroup, action?: string) {
    
    if(action == 'clone') {
      entity.id = "";
      entity.data_inicio = new Date();
      entity.data_fim = moment().add(1, 'day').toDate();

      // só clonar entregas que não possuem vínculos excluídos
      const entregas = entity.entregas || [];

      // array de ids com vinculos excluídos
      const possuiVinculosExcluidos = await this.planoEntregaEntregaDao.possuiVinculosExcluidos(entregas.map(e => e.id));
      // filtra entregas que não possuem vínculos excluídos
      entity.entregas = entregas.filter(entrega => !possuiVinculosExcluidos.includes(entrega.id));
      entity.entregas = entity.entregas.map(entrega => {
        entrega.id = this.planoEntregaDao.generateUuid();
        entrega.plano_entrega_id = null;
        entrega._status = "ADD";
        entrega.progresso_realizado = 0;
        entrega.progresso_esperado = 0;
        entrega.realizado.valor = 0;
        entrega.realizado.porcentagem = 0;
        entrega.data_inicio = new Date();
        entrega.data_fim = moment().add(1, 'day').toDate();
        return entrega as PlanoEntregaEntrega;
      });
    }

    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));    
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {   
    this.entity = new PlanoEntrega();
    this.entity.unidade_id = this.auth.unidade?.id || "";
    this.entity.unidade = this.auth.unidade;

    let programas = await this.programaDao.query({
      where: [['vigentesUnidadeExecutora', '==', this.auth.unidade!.id]],
      orderBy: [["unidade.path", "desc"]]
    }).asPromise();
    let ultimo = programas[0];
    if(ultimo){
      this.entity.programa = ultimo;
      this.entity.programa_id = ultimo.id;
    }
    const di = new Date(this.entity.data_inicio).toLocaleDateString();
    const df= this.entity.data_fim ? new Date(this.entity.data_fim).toLocaleDateString() : new Date().toLocaleDateString();
    this.entity.nome = this.auth.unidade!.sigla + " - " + di + " - " + df;
    this.loadData(this.entity!, this.form!);
  }

  public async saveData(form: IIndexable): Promise<PlanoEntrega> {
    return new Promise<PlanoEntrega>((resolve, reject) => {
      let planoEntrega: PlanoEntrega = this.util.fill(new PlanoEntrega(), this.entity!);      
      planoEntrega = this.util.fillForm(planoEntrega, this.form!.value);
      planoEntrega.entregas = planoEntrega.entregas?.filter(x => x._status) || [];
      resolve(planoEntrega);
    });
  }

  public titleEdit = (entity: PlanoEntrega): string => {
    return "Editando " + this.lex.translate("Plano de Entregas") + ': ' + (entity?.nome || "");
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

  public onDataChange(){ this.sugereNome(); }

  public async onUnidadeChange(){
   
    const unidadeIdValue = this.form.controls['unidade_id'].value;
    let unidade_id = unidadeIdValue? unidadeIdValue :  this.auth.unidade?.id ;
    if(unidade_id){
      try {
        const permissaoIncluir = await this.planoEntregaDao.permissaoIncluir( unidade_id );
      } catch (error: any) {
        this.error(error);
      }

    }
    this.sugereNome();
}

  public sugereNome() {
    //if(this.action == 'new') {
      const sigla = this.unidade?.selectedItem ? this.unidade?.selectedItem?.entity.sigla : this.auth.unidade?.sigla;
      const di = new Date(this.form!.controls.data_inicio.value).toLocaleDateString();
      const df = this.form!.controls.data_fim.value ? " - " + new Date(this.form!.controls.data_fim.value).toLocaleDateString() : '';
      this.form!.controls.nome.setValue(sigla + " - " + di + df);
    //}
  }

  public somaDia(date: Date, days: number){
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public onProgramaChange(){
    const dias=(this.programa?.selectedEntity as Programa)?.prazo_max_plano_entrega;
    const data=this.somaDia(this.entity!.data_inicio,dias);
    if (!this.entity?.data_fim) {
      this.form!.controls.data_fim.setValue(new Date(data));
      this.dataFim?.change.emit();
    }
  }

}

