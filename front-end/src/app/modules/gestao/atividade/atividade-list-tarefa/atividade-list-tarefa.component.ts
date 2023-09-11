import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Comentario } from 'src/app/models/comentario';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PageBase } from 'src/app/modules/base/page-base';

@Component({
  selector: 'atividade-list-tarefa',
  templateUrl: './atividade-list-tarefa.component.html',
  styleUrls: ['./atividade-list-tarefa.component.scss']
})
export class AtividadeListTarefaComponent extends PageBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() control: AbstractControl = new FormControl();
  @Input() persist?: string;
  @Input() disabled: boolean = false;
  @Input() editable: boolean = true;
  @Input() selectable: boolean = false;
  @Input() id_processo: number = 0;
  @Input() set atividade(value: Atividade | undefined) {
    if(this._atividade != value) {
      this._atividade = value;
      if(this.isPersist && value?.tarefas) {
        this.control.setValue(value?.tarefas);
      }
    }
  }
  get atividade(): Atividade | undefined {
    return this._atividade;
  }

  public formEdit: FormGroup;
  public dao: AtividadeTarefaDaoService;
  public allPages: ListenerAllPagesService;
  public join: string[];
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }

  private _atividade?: Atividade;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<AtividadeTarefaDaoService>(AtividadeTarefaDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.formEdit = this.fh.FormBuilder({
      concluido: {default: false}
    });
    this.join = ["tipo_tarefa", "comentarios.usuario"];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(this.queryParams?.id_processo) {
      this.id_processo = this.queryParams?.id_processo;
    }
    if(this.isPersist && this.atividade?.tarefas) {
      this.control.setValue(this.atividade?.tarefas);
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if(this.id_processo) {
      this.loading = true;
      this.dao!.query({where: [["id_processo", "==", this.id_processo]]}).asPromise().then(tarefas => {
        this.control.setValue(tarefas || []);
        this.cdRef.detectChanges();
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  public get isPersist(): boolean {
    return this.persist != undefined;
  }

  public async addTarefa() {
    const tarefa = new AtividadeTarefa();
    tarefa.id = this.dao!.generateUuid();
    tarefa.usuario = this.auth.usuario;
    tarefa.usuario_id = this.auth.usuario!.id;
    tarefa.atividade_id = this.atividade?.id || "";
    tarefa.comentarios = [];
    tarefa._status = "ADD";
    this.go.navigate({route: ['gestao', 'atividade', 'tarefa']}, {metadata: {tarefa: tarefa, atividade: this.atividade}, modalClose: (modalResult) => {
      if(modalResult) {
        (async () => {
          const tarefas = (this.control!.value || []) as AtividadeTarefa[];
          if(this.isPersist && this.atividade?.tarefas) {
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
            tarefas.push(modalResult);
            this.control!.setValue(tarefas);
          }
          this.cdRef.detectChanges();
        })();
      }
    }});
    return undefined;
  }

  public editEntrega = async (row: any) => {
    this.go.navigate({route: ['gestao', 'atividade', 'tarefa']}, {metadata: {tarefa: row, atividade: this.atividade}, modalClose: (modalResult) => {
      if(modalResult) {
        (async () => {
          const tarefas = this.control!.value as AtividadeTarefa[];
          const index = tarefas.findIndex(x => x.id == row.id);
          if(index >= 0) {
            modalResult._status = modalResult._status == "ADD" ? "ADD" : "EDIT";
            if(this.isPersist && this.atividade?.tarefas) {
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
              tarefas[index] = modalResult;
              this.control!.setValue(tarefas);
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
        if((this.isPersist && this.atividade?.tarefas) || row._status == "ADD") {
          const tarefas = this.control!.value as AtividadeTarefa[];
          const index = tarefas.findIndex(x => x.id == row.id);
          if(this.isPersist && this.atividade?.tarefas) await this.dao!.delete(row);
          if(index >= 0) {
            tarefas.splice(index, 1);
            this.control!.setValue(tarefas);
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

  /*public comentarioClick(element: HTMLSpanElement) {
    const value = element.getAttribute("data-expanded");
    element.setAttribute("data-expanded", value == "true" ? "false" : "true");
  }*/

  /*public addComentarioClick(row: any) {
    this.go.navigate({route: ['gestao', 'atividade', 'entrega', row.id, 'comentar']}, {modal: true, metadata: {entrega: row, atividade: this.atividade}, modalClose: this.addComentarioResult.bind(this)});
  }*/

  public async onColumnConcluidoEdit(row: any) {
    this.formEdit.controls.concluido.setValue(!!row.data_conclusao);
  }

  public async onColumnConcluidoSave(row: any) {
    try {
      const data_conclusao = this.formEdit.controls.concluido.value && !!row.data_conclusao ? this.auth.hora : row.data_conclusao;
      const saved = await this.dao!.update(row.id, { data_conclusao });
      row.concluido = this.formEdit.controls.concluido.value;
      return !!saved;
    } catch (error) {
      return false;
    }
  }

  public addComentarioResult(modalResult: AtividadeTarefa) {
    if(modalResult) {
      if(this.isPersist) {
        this.dao!.getById(modalResult.id, this.join).then(tarefa => {
          if (tarefa) {
            const tarefas = this.control.value || [];
            const index = tarefas.findIndex((x: AtividadeTarefa) => x.id = tarefa.id);
            if(index >= 0) {
              tarefas[index] = tarefa;
              this.control.setValue(tarefas);
              this.cdRef.detectChanges();
            }
          }
        });
      } else {
        const changed = modalResult.comentarios.filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || "")).length > 0;
        modalResult._status = changed && !["ADD", "EDIT", "DELETE"].includes(modalResult._status || "") ? "EDIT" : modalResult._status;
      }
    }
  }

}
