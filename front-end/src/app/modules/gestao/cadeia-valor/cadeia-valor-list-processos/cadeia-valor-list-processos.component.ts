import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputLevelItem } from 'src/app/components/input/input-level/input-level.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'cadeia-valor-list-processos',
  templateUrl: './cadeia-valor-list-processos.component.html',
  styleUrls: ['./cadeia-valor-list-processos.component.scss']
})
export class CadeiaValorListProcessosComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: CadeiaValor | undefined) { super.entity = value; } get entity(): CadeiaValor | undefined { return super.entity; }

  public button: any;

  public processosDao?: CadeiaValorProcessoDaoService;

  public get items(): CadeiaValorProcesso[] {
    if (!this.gridControl.value) this.gridControl.setValue(new CadeiaValor());
    if (!this.gridControl.value.processos) this.gridControl.value.processos = [];
    return this.gridControl.value.processos;
  }

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.processosDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      sequencia: { default: 1 },
      nivel: { default: "" }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: IIndexable, form?: FormGroup): Promise<void> | void {
    this.cdRef.detectChanges();
    this.sortProcessos();
  }

  public async addProcesso() {
    let processo = new CadeiaValorProcesso({
      id: this.dao!.generateUuid(),
      sequencia: this.items.filter(x => !x.processo_pai_id).length + 1,
      nome: ""
    });
    return processo;
  }

  public async addChildProcesso(row: CadeiaValorProcesso, metadata: any, index: number) {
    let processo = new CadeiaValorProcesso({
      id: this.dao!.generateUuid(),
      processo_pai_id: row.id,
      sequencia: this.items.filter(x => x.processo_pai_id == row.id).length + 1,
      nome: ""
    });
    this.items.push(processo);
    this.grid!.setMetadata(processo, { nivel: this.getSequencia({}, processo) });
    this.sortProcessos();
    this.grid!.adding = true;
    await this.grid!.edit(processo);
    return undefined;
  }

  public getSequencia(metadata: any, row: CadeiaValorProcesso) {
    if (!metadata.nivel) {
      let paiId: string | null = row.processo_pai_id;
      let niveis = "";
      let path = [];
      while (paiId) {
        path.push(paiId);
        let atual = this.items.find(x => x.id == paiId);
        niveis = (atual?.sequencia || "") + "." + niveis;
        paiId = atual?.processo_pai_id || null;
      }
      niveis += row.sequencia;
      if (metadata.nivel != niveis) {
        metadata.nivel = niveis;
        metadata.path = path;
      }
    }
    return metadata.nivel;
  }

  public getNivelSequencia(metadata: any): number {
    return 10 * (metadata.nivel.match(/\./g) || []).length;
  }

  public async loadProcesso(form: FormGroup, row: any) {
    form.controls.nivel.setValue(this.getSequencia(this.grid?.getMetadata(row), row));
    form.controls.sequencia.setValue(row.sequencia);
    form.controls.nome.setValue(row.nome);

    this.cdRef.detectChanges();
  }

  public sortProcessos() {
    this.items.sort((a, b) => {
      const sa = (this.grid!.getMetadata(a)?.nivel || "").split(".").map((x: string) => ("000" + x).substr(-3)).join(".");
      const sb = (this.grid!.getMetadata(b)?.nivel || "").split(".").map((x: string) => ("000" + x).substr(-3)).join(".");
      return sa < sb ? -1 : sa > sb ? 1 : 0;
    });
  }

  public async removeProcesso(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
        let processo = row as CadeiaValorProcesso;
        let filhos = this.items.filter(x => x.processo_pai_id == processo.id) || [];
        filhos.forEach(x => this.removeProcesso(x));
        this.items.splice(this.items.findIndex(x => x.id == processo.id), 1);
        if (!this.isNoPersist)  await this.processosDao?.delete(row);
        return true;
      
    } else {
      return false;
    }
  }

  public async saveProcesso(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if (this.form!.valid) {
      let niveis = form.controls.nivel.value.split(".");
      let parents = this.processos(niveis.slice(0, niveis.length - 1));
      let parentId = parents?.length ? parents[parents.length - 1].id : null;
      let sequencia = niveis[niveis.length - 1] * 1;
      /* Atualiza o indice a partir sa sequencia atual para os irmão que tem sequencia maior */
      this.items.filter(x => x.processo_pai_id == parentId && x.sequencia >= sequencia).forEach(x => x.sequencia++);
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.sequencia = sequencia;
      row.processo_pai_id = parentId;
      row.nome = form.controls.nome.value;
      result = row;
      if (!this.isNoPersist) result = await this.processosDao?.save(row);
      //this.cdRef.detectChanges();
    }
    return result;
  }

  public editEndProcesso(id?: string) {
    this.grid?.clearMetadata();
    this.cdRef.detectChanges();
    this.sortProcessos();
    this.cdRef.detectChanges();
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let cadeiaValorProcesso: CadeiaValorProcesso = row as CadeiaValorProcesso;
    result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }

  public validateLevel = (parents: InputLevelItem[], item: InputLevelItem, children: InputLevelItem[]): Promise<boolean> | boolean => {
    if (children.length) {
      let path = [...parents.map(x => x.value), item.value] as number[];
      //this.hasIndexChanged(path, (item.value as number));
      return this.processos(path).length == path.length;
    } else {
      let items = this.processos(parents.map(x => x.value) as number[]);
      let sibilings = items.length == parents.length && items.length ? this.items.filter(x => x.processo_pai_id == items[items.length - 1].id) : [];
      return sibilings.length + 1 >= (item.value as number);
    }
  }

  public processos = (path: number[]): CadeiaValorProcesso[] => {
    let items: CadeiaValorProcesso[] = [];
    path.reduce((a, v) => {
      let item = a.find(x => x.sequencia == v);
      if (item) {
        items.push(item);
        return this.items.filter(x => x.processo_pai_id == item?.id);
      } else {
        return [];
      }
    }, this.items.filter(x => !x.processo_pai_id));
    return items;
  };

}
