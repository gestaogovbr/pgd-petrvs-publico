import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { QueryContext } from 'src/app/dao/query-context';
import { IIndexable } from 'src/app/models/base.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

export class NeastedProcesso extends CadeiaValorProcesso {
  public children: NeastedProcesso[] = [];
  public cor: string = "#010101";
  public level: string = "";
  public constructor(data?: any) { super(); this.initialization(data); }
}

@Component({
  selector: 'cadeia-valor-mapa',
  templateUrl: './cadeia-valor-mapa.component.html',
  styleUrls: ['./cadeia-valor-mapa.component.scss']
})
export class CadeiaValorMapaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('cadeiaValorInstitucional', { static: false }) public cadeiaValorInstitucional?: InputSelectComponent;

  public cadeiasValor: LookupItem[] = [];
  public cadeiaValor?: CadeiaValor;
  public processos: NeastedProcesso[] = [];
  public query?: QueryContext<CadeiaValor>;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.join = ['processos'];
    this.title = this.lex.noun('Cadeia de valor', true);
    this.form = this.fh.FormBuilder({
      cadeia_valor_id: {default: null}
    }, this.cdRef, this.validate);
  }

  public options: ToolbarButton[] = [
    {
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consultProcesso.bind(this)
    },
    { divider: true },
    {
      icon: "bi bi-plus-circle",
      label: "Incluir subprocesso",
      onClick: this.addProcesso.bind(this) 
    },
    {
      icon: "bi bi-pencil-square",
      label: "Editar",
      onClick: this.editProcesso.bind(this)
    },
    { divider: true },
    {
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.deleteProcesso.bind(this)
    }    
  ]

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.loadData(this.entity);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public consultProcesso(data: any, button: ToolbarButton) {

  }

  public addProcesso(data: any, button: ToolbarButton) {
    
  }

  public editProcesso(data: any, button: ToolbarButton) {
    
  }

  public deleteProcesso(data: any, button: ToolbarButton) {
    
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.query = this.dao!.query({ where: [["data_arquivamento", "==", null]], orderBy: [["inicio", "desc"]], join: this.join }) as QueryContext<CadeiaValor>;
    this.query!.asPromise().then(cadeiasValor => {
      this.cadeiasValor = cadeiasValor.map(x => Object.assign({} as LookupItem, {
        key: x.id,
        value: x.nome,
        data: x
      }));
      this.form!.controls.cadeia_valor_id.setValue(this.cadeiasValor.length ? this.cadeiasValor[0].key : null);
    });
  }

  public onCadeiaValorChange() {
    const recursiveProcesso = (level: string, processos: CadeiaValorProcesso[]): NeastedProcesso[] => processos.sort((a, b) => b.sequencia - a.sequencia).map(x => Object.assign(new NeastedProcesso({
      children: recursiveProcesso(level + x.sequencia + '.', this.cadeiaValor!.processos.filter(y => y.processo_pai_id == x.id)),
      level: level + x.sequencia,
      cor: this.lookup.CORES_BACKGROUND[Math.floor(Math.random() * this.lookup.CORES_BACKGROUND.length)].color
    }), x));
    this.cadeiaValor = this.cadeiaValorInstitucional?.selectedItem?.data as CadeiaValor;
    if(this.cadeiaValor) this.processos = recursiveProcesso("", this.cadeiaValor.processos.filter(x => !x.processo_pai_id));
  }

  public onProcessoClick(data: any) {
    let objetivo = data as CadeiaValorProcesso;
    this.go.navigate({route: ['gestao', 'cadeiaValor', this.cadeiaValor?.id, 'objetivos', objetivo.id]});
  }

  public onObjetivoDeleteClick(data: any) {
    let objetivo = data as CadeiaValorProcesso;
  }

  public onObjetivoEditClick(data: any) {
    let objetivo = data as CadeiaValorProcesso;
  }
}