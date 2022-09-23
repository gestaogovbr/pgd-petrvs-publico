import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DemandaEntregaDaoService } from 'src/app/dao/demanda-entrega-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { DemandaEntrega } from 'src/app/models/demanda-entrega.model';
import { Demanda } from 'src/app/models/demanda.model';
import { PageBase } from 'src/app/modules/base/page-base';

@Component({
  selector: 'demanda-list-entrega',
  templateUrl: './demanda-list-entrega.component.html',
  styleUrls: ['./demanda-list-entrega.component.scss']
})
export class DemandaListEntregaComponent extends PageBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() control: AbstractControl = new FormControl();
  @Input() persist?: string;
  @Input() disabled: boolean = false;
  @Input() editable: boolean = true;
  @Input() selectable: boolean = false;
  @Input() id_processo: number = 0;
  @Input() set demanda(value: Demanda | undefined) {
    if(this._demanda != value) {
      this._demanda = value;
      if(this.isPersist && value?.entregas) {
        this.control.setValue(value?.entregas);
      }
    }
  }
  get demanda(): Demanda | undefined {
    return this._demanda;
  }

  public formEdit: FormGroup;
  public dao: DemandaEntregaDaoService;
  public allPages: ListenerAllPagesService;
  public join: string[];
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }

  private _demanda?: Demanda;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<DemandaEntregaDaoService>(DemandaEntregaDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.formEdit = this.fh.FormBuilder({
      concluido: {default: false}
    });
    this.join = ["tarefa", "comentarios.usuario"];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(this.queryParams?.id_processo) {
      this.id_processo = this.queryParams?.id_processo;
    }
    if(this.isPersist && this.demanda?.entregas) {
      this.control.setValue(this.demanda?.entregas);
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if(this.id_processo) {
      this.loading = true;
      this.dao!.query({where: [["id_processo", "==", this.id_processo]]}).asPromise().then(entregas => {
        this.control.setValue(entregas || []);
        this.cdRef.detectChanges();
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  public get isPersist(): boolean {
    return this.persist != undefined;
  }

  public async addEntrega() {
    const entrega = new DemandaEntrega();
    entrega.id = this.dao!.generateUuid();
    entrega.usuario = this.auth.usuario;
    entrega.usuario_id = this.auth.usuario!.id;
    entrega.demanda_id = this.demanda?.id || "";
    entrega.comentarios = [];
    entrega._status = "ADD";
    this.go.navigate({route: ['gestao', 'demanda', 'entrega']}, {metadata: {entrega: entrega, demanda: this.demanda}, modalClose: (modalResult) => {
      if(modalResult) {
        (async () => {
          const entregas = (this.control!.value || []) as DemandaEntrega[];
          if(this.isPersist && this.demanda?.entregas) {
            this.grid!.error = undefined;
            try {
              this.dialog.showSppinerOverlay("Salvando dados do formulário");
              modalResult = await this.dao.save(modalResult, this.join);
            } catch (error: any) {
              this.grid!.error = error.message ? error.message : error;
              modalResult = undefined;
            } finally {
              this.dialog.closeSppinerOverlay();
            }
          }
          if(modalResult) {
            entregas.push(modalResult);
            this.control!.setValue(entregas);
          }
          this.cdRef.detectChanges();
        })();
      }
    }});
    return undefined;
  }

  public editEntrega = async (row: any) => {
    this.go.navigate({route: ['gestao', 'demanda', 'entrega']}, {metadata: {entrega: row, demanda: this.demanda}, modalClose: (modalResult) => {
      if(modalResult) {
        (async () => {
          const entregas = this.control!.value as DemandaEntrega[];
          const index = entregas.findIndex(x => x.id == row.id);
          if(index >= 0) {
            modalResult._status = modalResult._status == "ADD" ? "ADD" : "EDIT";
            if(this.isPersist && this.demanda?.entregas) {
              this.grid!.error = undefined;
              try {
                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                modalResult = await this.dao.save(modalResult, this.join);
              } catch (error: any) {
                this.grid!.error = error.message ? error.message : error;
                modalResult = undefined;
              } finally {
                this.dialog.closeSppinerOverlay();
              }
            }
            if(modalResult) {
              entregas[index] = modalResult;
              this.control!.setValue(entregas);
            }
          }
          this.cdRef.detectChanges();
        })();
      }
    }});
    return undefined;
  }

  public async deleteEntrega(row: any) {
    const confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    this.grid!.error = undefined;
    if(confirm) {
      try {
        if((this.isPersist && this.demanda?.entregas) || row._status == "ADD") {
          const entregas = this.control!.value as DemandaEntrega[];
          const index = entregas.findIndex(x => x.id == row.id);
          if(this.isPersist && this.demanda?.entregas) await this.dao!.delete(row);
          if(index >= 0) {
            entregas.splice(index, 1);
            this.control!.setValue(entregas);
          }
        } else {
          row._status = "DELETE";
        }
        this.dialog.alert("Sucesso", "Registro excluído com sucesso!");
        this.cdRef.detectChanges();
      } catch (error: any) {
        this.grid!.error = error?.message ? error?.message : error;
      }
    }
  }

  public comentarioClick(element: HTMLSpanElement) {
    const value = element.getAttribute("data-expanded");
    element.setAttribute("data-expanded", value == "true" ? "false" : "true");
  }

  public addComentarioClick(row: any) {
    this.go.navigate({route: ['gestao', 'demanda', 'entrega', row.id, 'comentar']}, {modal: true, metadata: {entrega: row, demanda: this.demanda}, modalClose: this.addComentarioResult.bind(this)});
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.id_processo, row.id_documento);
  }

  public async onColumnConcluidoEdit(row: any) {
    this.formEdit.controls.concluido.setValue(row.concluido);
  }

  public async onColumnConcluidoSave(row: any) {
    try {
      const saved = await this.dao!.update(row.id, {
        concluido: this.formEdit.controls.concluido.value
      });
      row.concluido = this.formEdit.controls.concluido.value;
      return !!saved;
    } catch (error) {
      return false;
    }
  }

  public addComentarioResult(modalResult: DemandaEntrega) {
    if(modalResult) {
      this.dao!.getById(modalResult.id, this.join).then(entrega => {
        if (entrega) {
          const entregas = this.control.value || [];
          const index = entregas.findIndex((x: DemandaEntrega) => x.id = entrega.id);
          if(index >= 0) {
            entregas[index] = entrega;
            this.control.setValue(entregas);
            this.cdRef.detectChanges();
          }
        }
      });
    }
  }

}
