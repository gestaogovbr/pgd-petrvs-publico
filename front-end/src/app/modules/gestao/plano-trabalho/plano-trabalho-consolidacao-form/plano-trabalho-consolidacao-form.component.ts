import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputLevelItem } from 'src/app/components/input/input-level/input-level.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoTrabalhoConsolidacaoAtividadeDaoService } from 'src/app/dao/plano-trabalho-consolidacao-atividade-dao.service';
import { PlanoTrabalhoConsolidacaoOcorrenciaDaoService } from 'src/app/dao/plano-trabalho-consolidacao-ocorrencia-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Atividade } from 'src/app/models/atividade.model';
import { PlanoTrabalhoConsolidacaoAtividade } from 'src/app/models/plano-trabalho-consolidacao-atividade.model';
import { PlanoTrabalhoConsolidacaoOcorrencia } from 'src/app/models/plano-trabalho-consolidacao-ocorrencia.model';
import { Afastamento } from 'src/app/models/afastamento.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';

export type ConsolidacaoEntrega = {
  entrega: PlanoTrabalhoEntrega,
  atividades: (Atividade | PlanoTrabalhoConsolidacaoAtividade)[]
};

@Component({
  selector: 'plano-trabalho-consolidacao-form',
  templateUrl: './plano-trabalho-consolidacao-form.component.html',
  styleUrls: ['./plano-trabalho-consolidacao-form.component.scss']
})
export class PlanoTrabalhoConsolidacaoFormComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() planoTrabalho?: PlanoTrabalho;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: PlanoTrabalhoConsolidacao | undefined) { super.entity = value; } get entity(): PlanoTrabalhoConsolidacao | undefined { return super.entity; }

  public consolidacaoAtividadeDao: PlanoTrabalhoConsolidacaoAtividadeDaoService;
  public ocorrenciaDao: PlanoTrabalhoConsolidacaoOcorrenciaDaoService;
  public formAtividade: FormGroup;
  public formOcorrencia: FormGroup;
  public dao: PlanoTrabalhoConsolidacaoDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public itemsEntregas: ConsolidacaoEntrega[] = [];
  public itemsOcorrencias: PlanoTrabalhoConsolidacaoOcorrencia[] = [];
  public itemsAfastamentos: Afastamento[] = [];
  
  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.consolidacaoAtividadeDao = injector.get<PlanoTrabalhoConsolidacaoAtividadeDaoService>(PlanoTrabalhoConsolidacaoAtividadeDaoService);
    this.ocorrenciaDao = injector.get<PlanoTrabalhoConsolidacaoOcorrenciaDaoService>(PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.formAtividade = this.fh.FormBuilder({
      esforco: { default: 0 },
      realizado: { default: null },
      descricao: { default: "" }
    }, this.cdRef, this.validateEntrega);
    this.formOcorrencia = this.fh.FormBuilder({
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      descricao: { default: "" }
    }, this.cdRef, this.validateOcorrencia);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.loadData(this.entity!, this.form);
    })();
  }

  public validateEntrega = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validateOcorrencia = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
      result = "Inválido";
    } else if(controlName == 'data_fim' && control.value.getTime() < this.formOcorrencia.controls.data_inicio.value.getTime()) {
        result = "Menor que início";
    } 
    return result;
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    let dados = await this.dao!.dadosConsolidacao(entity.id);
    this.itemsEntregas = dados.entregas.map(x => {
      return {
        entrega: x,
        atividades: [
          ...dados.atividades.filter(y => y.plano_trabalho_entrega_id == x.id),
          ...dados.consolidaoAtividades.filter(y => y.plano_trabalho_entrega_id == x.id)
        ]
      };
    });
    this.itemsOcorrencias = dados.ocorrencias;
    this.itemsAfastamentos = dados.afastamentos;
    this.cdRef.detectChanges();
  }
  
  /***************************************************************************************
  * Atividades 
  ****************************************************************************************/
  public async addAtividade() {
    return new PlanoTrabalhoConsolidacaoAtividade({
      id: this.dao!.generateUuid(),
      plano_trabalho_consolidacao_id: this.entity!.id
    });
  }

  public async loadAtividade(form: FormGroup, row: any) {
    
    
    /*form.controls.nivel.setValue(this.getSequencia(this.grid?.getMetadata(row), row));
    form.controls.sequencia.setValue(row.sequencia);
    form.controls.nome.setValue(row.nome);
    this.cdRef.detectChanges();*/
  }

  public async removeProcesso(row: any) {
    /*let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
        let processo = row as CadeiaValorProcesso;
        let filhos = this.items.filter(x => x.processo_pai_id == processo.id) || [];
        filhos.forEach(x => this.removeProcesso(x));
        this.items.splice(this.items.findIndex(x => x.id == processo.id), 1);
        if (!this.isNoPersist)  await this.processosDao?.delete(row);
        return true;
      
    } else {
      return false;
    }*/
  }

  public async saveProcesso(form: FormGroup, row: any) {
    /*let result = undefined;
    this.form!.markAllAsTouched();
    if (this.form!.valid) {
      let niveis = form.controls.nivel.value.split(".");
      let parents = this.processos(niveis.slice(0, niveis.length - 1));
      let parentId = parents?.length ? parents[parents.length - 1].id : null;
      let sequencia = niveis[niveis.length - 1] * 1;
      /* Atualiza o indice a partir sa sequencia atual para os irmão que tem sequencia maior * /
      this.items.filter(x => x.processo_pai_id == parentId && x.sequencia >= sequencia).forEach(x => x.sequencia++);
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.sequencia = sequencia;
      row.cadeia_valor_id = this.entity?.id;
      row.sequencia = sequencia;
      row.processo_pai_id = parentId;
      row.nome = form.controls.nome.value;
      result = row;
      if (!this.isNoPersist) result = await this.processosDao?.save(row);
    }
    return result;*/
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }  

  /***************************************************************************************
  * Ocorrências 
  ****************************************************************************************/


}
