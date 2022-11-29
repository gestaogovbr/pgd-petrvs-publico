import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoTarefa } from 'src/app/models/projeto-tarefa.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { ProjetoRecursoDaoService } from 'src/app/dao/projeto-recurso-dao.service';
import { ProjetoRegraDaoService } from 'src/app/dao/projeto-regra-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { ProjetoRecurso } from 'src/app/models/projeto-recurso.model';
import { ProjetoRegra } from 'src/app/models/projeto-regra.model';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ProjetoService } from '../projeto.service';
import { ProjetoAlocacaoRegra } from 'src/app/models/projeto-alocacao-regra.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';

@Component({
  selector: 'projeto-form-alocacoes',
  templateUrl: './projeto-form-alocacoes.component.html',
  styleUrls: ['./projeto-form-alocacoes.component.scss']
})
export class ProjetoFormAlocacoesComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild("recurso", { static: false }) public recurso?: InputSelectComponent;
  @ViewChild("regra", { static: false }) public regra?: InputSelectComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }
  @Input() cdRef: ChangeDetectorRef;

  public recursoDao: ProjetoRecursoDaoService;
  public regraDao: ProjetoRegraDaoService;
  public projetoService: ProjetoService;
  public formRegra: FormGroup;
  public recursos: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<ProjetoDaoService>(ProjetoDaoService);
    this.recursoDao = injector.get<ProjetoRecursoDaoService>(ProjetoRecursoDaoService);
    this.regraDao = injector.get<ProjetoRegraDaoService>(ProjetoRegraDaoService);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      id: {default: ""},
      descricao: {default: ""},
      quantidade: {default: 1},
      recurso_id: {default: ""},
      regras: {default: []}
    }, this.cdRef, this.validate);
    this.formRegra = this.fh.FormBuilder({
      regra_id: {default: null}
    }, this.cdRef, this.validateRegra);
    this.groupBy = [{field: "recurso.tipo", label: "Tipo"}];
  }

  public get items(): ProjetoAlocacao[] {
    if(!this.gridControl.value) this.gridControl.setValue(new Projeto());
    if(!this.gridControl.value.alocacoes) this.gridControl.value.alocacoes = [];
    return this.gridControl.value.alocacoes;
  }

  public loadRecursos(alocacao: ProjetoAlocacao) {
    const items = (this.entity!.recursos || []).filter(x => x.id != "NEW" && !this.entity!.alocacoes?.find(r => r.recurso_id != alocacao.recurso_id && r.recurso_id == x.id));
    const recursoNome = (recurso: ProjetoRecurso) => recurso.usuario?.nome || recurso.unidade?.nome || recurso.material_servico?.descricao || recurso.nome;
    this.recursos = items.map(x => Object.assign({}, {key: x.id, value: recursoNome(x), icon: this.lookup.getIcon(this.lookup.PROJETO_TIPO_RECURSOS, x.tipo), data: x}));
  }

  private _regras: LookupItem[] = [];
  public get regras(): LookupItem[] {
    const items = (this.entity!.regras || []).filter(x => x.id != "NEW");
    if(this._regras.map(x => x.key + x.value).join(";") != items.map(x => x.id + x.nome).join(";")) {
      this._regras = items.map(x => Object.assign({}, {key: x.id, value: x.nome, data: x}));
    }
    return this._regras;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public validateRegra = (control: AbstractControl, controlName: string) => {
    if(controlName == "regra_id" && !control.value?.length) return "Obrigatório";
    return null;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Projeto();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    return new Promise<Projeto>((resolve, reject) => {
      resolve(this.entity!);
    });
  }

  public async addAlocacao() {
    return {
      id: "NEW",
      descricao: "",
      quantidade: 1,
      recurso_id: "",
      regra_id: null
    } as IIndexable;
  }

  public async loadAlocacao(form: FormGroup, row: any) {
    this.loadRecursos(row);
    form.controls.descricao.setValue(row.descricao);
    form.controls.quantidade.setValue(row.quantidade);
    form.controls.recurso_id.setValue(row.recurso_id);
    form.controls.regras.setValue((row.regras || []).map((regra: ProjetoAlocacaoRegra) => Object.assign({}, {
      key: regra.regra!.id,
      value: regra.regra!.nome,
      color: this.lookup.getColor(this.lookup.PROJETO_TIPO_RECURSOS, regra.regra!.tipo_recurso),
      icon: this.lookup.getIcon(this.lookup.PROJETO_TIPO_RECURSOS, regra.regra!.tipo_recurso),
      data: regra
    })));
    this.cdRef.detectChanges();
  }

  public async removeAlocacao(row: any) {
    return true;
  }

  public async saveAlocacao(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.descricao = form.controls.descricao.value;
      row.quantidade = form.controls.quantidade.value;
      row.recurso_id = form.controls.recurso_id.value;
      row.recurso = this.recurso?.selectedItem?.data;
      row.regras = (form.controls.regras.value || []).map((x: LookupItem) => x.data);
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

  public get isHumanoDepartamento(): boolean {
    return ["HUMANO", "DEPARTAMENTO"].includes(this.recurso?.selectedItem?.data?.tipo);
  }

  public addItemHandleRegras(): LookupItem | undefined {
    let result = undefined;
    const key = this.formRegra.controls.regra_id.value;
    this.formRegra.markAllAsTouched();
    if(this.formRegra.valid && this.regra?.selectedItem && this.util.validateLookupItem(this.form!.controls.regras.value, key)) {
      let regra = this.regra?.selectedItem.data as ProjetoRegra;
      result = {
        key: key,
        value: regra.nome,
        color: this.lookup.getColor(this.lookup.PROJETO_TIPO_RECURSOS, regra.tipo_recurso),
        icon: this.lookup.getIcon(this.lookup.PROJETO_TIPO_RECURSOS, regra.tipo_recurso),
        data: new ProjetoAlocacaoRegra({
          projeto_alocacao_id: this.form!.controls.id.value,
          regra_id: regra.id,
          regra: regra
        })
      };
      this.formRegra.controls.regra_id.setValue(null);
    }
    return result;
  }

  public isAcessivel(row: ProjetoAlocacao) {
    return this.projetoService.isEnvolvido(row, this.entity!);
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let alocacao: ProjetoAlocacao = row as ProjetoAlocacao;
    if (!alocacao.tarefa_id?.length) {
      result.push(Object.assign(this.grid!.BUTTON_EDIT, { onClick: this.grid!.onEditItem.bind(this.grid) }));
      result.push(Object.assign(this.grid!.BUTTON_DELETE, { onClick: this.grid!.onDeleteItem.bind(this.grid) }));
    }
    return result;
  }

  public onRecursoChange() {
    const recurso = this.recurso?.selectedItem?.data as ProjetoRecurso;
    this.form!.controls.regras.setValue(this.form!.controls.regras.value.filter((x: LookupItem) => x.data?.regra?.tipo_recurso == recurso?.tipo));
    this.cdRef.detectChanges();
  }

}
