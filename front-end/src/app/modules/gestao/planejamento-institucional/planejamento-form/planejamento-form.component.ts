import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { PlanejamentoListObjetivoComponent } from '../planejamento-list-objetivo/planejamento-list-objetivo.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: 'app-planejamento-form',
  templateUrl: './planejamento-form.component.html',
  styleUrls: ['./planejamento-form.component.scss']
})
export class PlanejamentoFormComponent extends PageFormBase<Planejamento, PlanejamentoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: true }) public grid?: GridComponent;
  @ViewChild('planejamentoSuperior', { static: false }) public planejamentoSuperior?: InputSelectComponent;
  @ViewChild('objetivos', { static: false }) public objetivos?: PlanejamentoListObjetivoComponent;

  public unidadeDao: UnidadeDaoService;
  public planejamentosSuperiores: LookupItem[] = [];
  public hasPermissionToUNEX: boolean = false;
  public form: FormGroup;
  public util: UtilService;
  public joinPlanejamentoSuperior: string[] = [];

  constructor(public injector: Injector) {
    super(injector, Planejamento, PlanejamentoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.hasPermissionToUNEX = this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER');
    this.join = [
      'objetivos',
      'objetivos.objetivo_pai:id,nome',
      'objetivos.objetivo_superior:id,planejamento_id',
      'objetivos.eixo_tematico:id,nome',
      'planejamento_superior:id,nome',
      'planejamento_superior.objetivos'
    ];
    this.joinPlanejamentoSuperior = [
      "objetivos"
    ];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      unidade_id: { default: null },
      entidade_id: { default: null },
      planejamento_superior_id: { default: null },
      data_inicio: { default: new Date() },
      data_fim: { default: null },
      missao: { default: "" },
      visao: { default: "" },
      valores: { default: [] },
      valor_texto: { default: "" },
      resultados_institucionais: { default: [] },
      resultados_texto: { default: "" },
      utilizar_superior: {default: false}
    }, this.cdRef, this.validate);
    this.util = injector.get<UtilService>(UtilService);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    /*  (RN_PLAN_INST_A) 
        Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, unidade responsável e ao menos um dos valores institucionais.
    */
    if (['nome', 'unidade_id', 'missao', 'visao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (controlName == 'data_inicio' && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    if (controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }
    return result;
  }

  public formValidation = async (form?: FormGroup) => {
    /* (RN_PLAN_INST_A) Para a criação de um planejamento institucional são informações obrigatórias: nome, missão, visão, data de início, unidade responsável e ao menos um dos valores institucionais. */
    let result = undefined;
    if (this.form!.controls.data_fim.value && this.form!.controls.data_inicio.value > this.form!.controls.data_fim.value) return "A data do início não pode ser maior que a data do fim! [RN_PLAN_INST_A]";
    if (this.form!.controls.valores.value.length == 0) return "É obrigatória a inclusão de ao menos um valor institucional! [RN_PLAN_INST_A]";
    /* (RN_PLAN_INST_B) Não pode existir mais de um planejamento institucional para uma mesma unidade em um mesmo período de tempo. */
    let unidades = await this.dao?.query({ where: [['unidade_id', '==', this.form!.controls.unidade_id.value]] }).asPromise();
    (unidades || []).forEach(un => {
      if (un.id != this.entity!.id && this.util.intersection([{ start: this.util.asDate(un.data_inicio)!, end: this.util.asDate(un.data_fim)! },
      { start: this.util.asDate(this.form!.controls.data_inicio.value)!, end: this.util.asDate(this.form!.controls.data_fim.value)! }])) {
        result = "Sobreposição de planejamento para o período de datas selecionadas [RN_PLAN_INST_B]";
      }
    });
    return result;
  }

  public async loadData(entity: Planejamento, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await this.carregaPlanejamentosSuperiores(entity.unidade_id);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.form.controls.planejamento_superior_id.setValue(entity.planejamento_superior_id);
  }

  public initializeData(form: FormGroup) {
    this.entity = new Planejamento();
    this.loadData(this.entity, form);
  }

  public async saveData(form: IIndexable): Promise<Planejamento> {
    return new Promise<Planejamento>((resolve, reject) => {
      this.objetivos!.grid!.confirm();
      let planejamento = this.util.fill(new Planejamento(), this.entity!);
      planejamento = this.util.fillForm(planejamento, this.form!.value);
      planejamento.objetivos = this.objetivos!.items;
      resolve(planejamento);
    });
  }

  public titleEdit = (entity: Planejamento): string => {
    return "Editando " + this.lex.translate("Planejamento Institucional") + ': ' + (entity?.nome || "");
  }

  public addValorHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.valor_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.valores.value, key)) {
      result = {
        key: key,
        value: this.form.controls.valor_texto.value
      };
      this.form.controls.valor_texto.setValue("");
    }
    return result;
  };

  public addResultadoHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.resultados_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form.controls.resultados_institucionais.value, key)) {
      result = {
        key: key,
        value: this.form.controls.resultados_texto.value
      };
      this.form.controls.resultados_texto.setValue("");
    }    
    return result;
  };

  public async onUnidadeChange(event: Event) {
    if (this.entity!.unidade_id != this.form.controls.unidade_id.value) await this.carregaPlanejamentosSuperiores(this.form.controls.unidade_id.value);
  }

  public async carregaPlanejamentosSuperiores(unidadeId?: string | null) {
    if (unidadeId?.length) {
      let pls = await this.dao?.query({ where: [['unidade_id', '==', unidadeId], ['manut_planej_unidades_executoras', '==', true]], join: this.joinPlanejamentoSuperior }).asPromise();
      this.planejamentosSuperiores = (pls || []).map(x => Object.assign({}, { key: x.id, value: x.nome, data: x }) as LookupItem);
      this.planejamentosSuperiores.unshift({ key: null, value: 'Escolha um Planejamento superior...' });
      this.objetivos!.loadData(this.entity!, this.form!);
      this.cdRef.detectChanges();
    }
  }

  public async onUtilizarSuperiorChange(event: Event) {
    let unidade_superior_id = this.form.controls.planejamento_superior_id.value;
    if (this.form.controls.utilizar_superior.value && unidade_superior_id?.length) {
      let pls = await this.dao?.query({ where: [['id', '==', unidade_superior_id]]}).asPromise();
      this.form.controls.missao.setValue(pls![0].missao);
      this.form.controls.visao.setValue(pls![0].visao);
      this.form.controls.valores.setValue(pls![0].valores);
      this.form.controls.resultados_institucionais.setValue(pls![0].resultados_institucionais);
    }
  }

  /**
   * @param event 
   * Se o planejamento superior for alterado, e já houver objetivos na lista vinculados a objetivos dele, avisar que eles perderão esses vínculos.
   */
  public async onPlanejamentoChange(event: Event) {
    if (this.form.controls.planejamento_superior_id.value != this.entity?.planejamento_superior_id && this.entity?.objetivos?.length && this.entity?.objetivos.filter(x => x.objetivo_superior && x.objetivo_superior!.planejamento_id == this.entity?.planejamento_superior_id).length) {
      let confirm = await this.dialog.confirm("Alteração de Planejamento Superior", "Como já existe(m) objetivo(s) neste Planejamento, vinculado(s) a objetivo(s) do Planejamento Superior anterior, seus vínculos serão perdidos! Deseja continuar?");
      if (confirm) {
        this.entity?.objetivos?.forEach(obj => obj.objetivo_superior_id = null);
        //atualizar a lista de objetivos superiores
      } else {
        this.form.controls.planejamento_superior_id.setValue(this.entity?.planejamento_superior_id);
      };
    };
    this.entity!.planejamento_superior_id = this.form.controls.planejamento_superior_id.value;
    this.entity!.planejamento_superior = this.planejamentoSuperior!.selectedItem?.data;
    this.objetivos!.planejamento_superior_id = this.form.controls.planejamento_superior_id.value;
    this.objetivos?.grid?.loadColumns();
    this.cdRef.detectChanges();
  }

  /**
   * 
   * @returns boolean Informa se o planejamento é da Unidade Instituidora ou não.
   */
/*   public isPlanejamentoUNINST(): boolean {
    return !this.form.controls.unidade_id.value?.length
  } */

  /**
   * 
   * @returns boolean Informa se o planejamento é da Unidade Executora ou não.
   */
/*   public isPlanejamentoUNEXEC(): boolean {
    return !this.isPlanejamentoUNINST();
  } */
}
