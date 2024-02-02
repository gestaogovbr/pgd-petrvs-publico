import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';

@Component({
  selector: 'planejamento-list-objetivo',
  templateUrl: './planejamento-list-objetivo.component.html',
  styleUrls: ['./planejamento-list-objetivo.component.scss']
})
export class PlanejamentoListObjetivoComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() public planejamento_superior_id?: string;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Planejamento | undefined) { super.entity = value; } get entity(): Planejamento | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }

  public get items(): PlanejamentoObjetivo[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Planejamento());
    if (!this.gridControl.value.objetivos) this.gridControl.value.objetivos = [];
    return this.gridControl.value.objetivos;
  }
  public minHeight: number = 350;
  public options: ToolbarButton[] = [];
  public objetivoDao?: PlanejamentoObjetivoDaoService;
  public eixoDao?: EixoTematicoDaoService;
  private _disabled: boolean = false;
  public eixos: EixoTematico[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.objetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.eixoDao = injector.get<EixoTematicoDaoService>(EixoTematicoDaoService);
    this.groupBy = [{ field: "eixo_tematico_id", label: "Eixo Temático" }];
    this.orderBy = [['nome','asc']];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      fundamentacao: { default: "" },
      planejamento_id: { default: null },
      eixo_tematico_id: { default: null },
      objetivo_superior_id: { default: null }
    }, this.cdRef);
    this.OPTION_INFORMACOES.onClick = (objetivo: PlanejamentoObjetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true });
    this.OPTION_EXCLUIR.onClick = (objetivo: PlanejamentoObjetivo) => { this.removeObjetivo(objetivo); };
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR,'MOD_PLAN_INST_EXCL');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    this.carregaEixos();
    this.sortObjetivos();
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let objetivo: PlanejamentoObjetivo = row as PlanejamentoObjetivo;
    if (this.auth.hasPermissionTo('MOD_PLAN_INST_EDT') && !this.disabled) {
      result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (objetivo: PlanejamentoObjetivo) => { this.editObjetivo(objetivo); } });
    }
    result.push({ hint: "Entregas", icon: "bi bi-file-earmark-bar-graph", onClick: (objetivo: PlanejamentoObjetivo) => this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id]}, { modal: true })});
    return result;
  }

  public marcador(row: PlanejamentoObjetivo): string {
    let level = row._metadata?.level || 0;
    return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
  }

  public async addObjetivo() {
    // ************ 
    // se for adicionar um objetivo num grid não persistente é necessário checar se o planejamento é da entidade ou da unidade, pois
    // se for de uma unidade será obrigatório já ter escolhido o planejamento superior
    let objetivo = new PlanejamentoObjetivo({ 
      _status: "ADD", 
      id: this.dao!.generateUuid(),
      planejamento_id: this.entity?.id
    });
    this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
      metadata: { 
        planejamento: this.entity!, 
        objetivo: objetivo,
        objetivos: this.objetivosPai(objetivo.id) 
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          try {
            this.carregaEixos();
            this.isNoPersist ? this.items.push(modalResult) : this.items.push(await this.objetivoDao!.save(modalResult)); 
            this.sortObjetivos();
          } catch (error: any) {
            this.error(error?.error || error?.message || error);            
          }
        };
      }
    });
  }

  public objetivosPai(filhoId: string) {
    let items: PlanejamentoObjetivo[] = [];
    let addItens = (list: PlanejamentoObjetivo[]) => {
      for(let item of list) {
        if(item.id != filhoId) {
          items.push(item);
          addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a,b) => a.sequencia - b.sequencia));
        }
      }
    }
    addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a,b) => a.sequencia - b.sequencia));
    return items;
  }

  public sortObjetivos() {
    let items: PlanejamentoObjetivo[] = [];
    let addItens = (list: PlanejamentoObjetivo[], level: number) => {
      for(let item of list) {
        item._metadata = Object.assign(item._metadata || {}, { level });
        items.push(item);
        //if(item._status != "DELETE") addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a,b) => a.sequencia - b.sequencia), level + 1);
        if(item._status != "DELETE") addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a,b) => (a.nome > b.nome ? 1 : -1)), level + 1);
      }
    }
    //addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a,b) => a.sequencia - b.sequencia), 0);
    addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a,b) => (a.nome > b.nome ? 1 : -1)), 0);
    this.items.length = 0;
    this.items.push(...items);
    this.cdRef.detectChanges();
  }

  public async editObjetivo(objetivo: PlanejamentoObjetivo) {
    objetivo._status = objetivo._status == "ADD" ? "ADD" : "EDIT";
    let index = this.items.indexOf(objetivo);
    this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
      metadata: { 
        planejamento: this.entity!, 
        objetivo: objetivo,
        objetivos: this.objetivosPai(objetivo.id) 
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          if (!this.isNoPersist) await this.objetivoDao?.save(modalResult);
          this.items[index] = modalResult;
          this.carregaEixos();
          this.sortObjetivos();
        };
      }
    });
  }

  public async removeObjetivo(objetivo: PlanejamentoObjetivo) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      let index = this.items.indexOf(objetivo);
      if (this.isNoPersist) {
        objetivo._status = "DELETE";
      } else {
        await this.objetivoDao!.delete(objetivo);
        this.grid?.items.splice(index, 1);
      };
      this.sortObjetivos();
      return true;
    } else {
      return false;
    }
  }

  public getEixo(id: string): EixoTematico | undefined {
    return this.eixos?.find(x => x.id == id);
  }

  public carregaEixos(){
    this.eixoDao?.query().getAll().then(eixos => {
      this.eixos = eixos;
    });
  }
}


