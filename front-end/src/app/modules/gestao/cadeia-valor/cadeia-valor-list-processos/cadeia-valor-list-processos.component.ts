import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
    selector: 'cadeia-valor-list-processos',
    templateUrl: './cadeia-valor-list-processos.component.html',
    styleUrls: ['./cadeia-valor-list-processos.component.scss'],
    standalone: false
})
export class CadeiaValorListProcessosComponent extends PageFrameBase {
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: CadeiaValor | undefined) { super.entity = value; } get entity(): CadeiaValor | undefined { return super.entity; }

  public processosDao?: CadeiaValorProcessoDaoService;
  public draggedProcesso: CadeiaValorProcesso | null = null;
  public dropTarget: CadeiaValorProcesso | null = null;
  public dropPosition: 'before' | 'after' | 'child' | null = null;
  public editingId: string | null = null;

  public get items(): CadeiaValorProcesso[] {
    if (!this.gridControl.value) this.gridControl.setValue(new CadeiaValor());
    if (!this.gridControl.value.processos) this.gridControl.value.processos = [];
    const sorted = this.sortProcessos(this.gridControl.value.processos);
    return sorted;
  }

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.processosDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" }
    }, this.cdRef);
  }

  public loadData(entity: IIndexable, form?: FormGroup): void {
    this.cdRef.detectChanges();
  }

  private sortProcessos(processos: CadeiaValorProcesso[]): CadeiaValorProcesso[] {
    const buildTree = (paiId: string | null = null): CadeiaValorProcesso[] => {
      return processos
        .filter(p => p.processo_pai_id === paiId)
        .sort((a, b) => a.sequencia - b.sequencia)
        .flatMap(p => [p, ...buildTree(p.id)]);
    };
    return buildTree();
  }

  public getNivel(processo: CadeiaValorProcesso): string {
    let nivel = '';
    let paiId = processo.processo_pai_id;
    while (paiId) {
      const pai = this.items.find(x => x.id === paiId);
      nivel = (pai?.sequencia || '') + '.' + nivel;
      paiId = pai?.processo_pai_id || null;
    }
    return nivel + processo.sequencia;
  }

  public getIndent(processo: CadeiaValorProcesso): number {
    return this.getNivel(processo).split('.').length - 1;
  }

  public async addProcesso() {
    const processo = new CadeiaValorProcesso({
      id: this.dao!.generateUuid(),
      cadeia_valor_id: this.entity?.id,
      sequencia: this.gridControl.value.processos.filter((x: CadeiaValorProcesso) => !x.processo_pai_id).length + 1,
      nome: ""
    });
    this.gridControl.value.processos.push(processo);
    this.editingId = processo.id;
    this.cdRef.detectChanges();
  }

  public async addChildProcesso(pai: CadeiaValorProcesso) {
    const processo = new CadeiaValorProcesso({
      id: this.dao!.generateUuid(),
      cadeia_valor_id: this.entity?.id,
      processo_pai_id: pai.id,
      sequencia: this.gridControl.value.processos.filter((x: CadeiaValorProcesso) => x.processo_pai_id === pai.id).length + 1,
      nome: ""
    });
    this.gridControl.value.processos.push(processo);
    this.editingId = processo.id;
    this.cdRef.detectChanges();
  }

  public async saveProcesso(processo: CadeiaValorProcesso) {
    if (!processo.nome?.trim()) {
      await this.dialog.alert("Atenção", "Nome é obrigatório");
      return;
    }
    if (!this.isNoPersist && this.processosDao) {
      await this.processosDao.save(processo);
    }
    this.editingId = null;
    this.cdRef.detectChanges();
  }

  public cancelEdit() {
    const processo = this.items.find(x => x.id === this.editingId);
    if (processo && !processo.nome) {
      this.items.splice(this.items.indexOf(processo), 1);
    }
    this.editingId = null;
    this.cdRef.detectChanges();
  }

  public async removeProcesso(processo: CadeiaValorProcesso) {
    const confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir o processo e seus filhos?");
    if (!confirm) return;

    const processos = this.gridControl.value.processos;
    
    if (!this.isNoPersist && this.processosDao) {
      await this.processosDao.delete(processo);
      const result = await this.processosDao.query({ where: [["cadeia_valor_id", "==", this.entity!.id]] }).asPromise();
      this.gridControl.value.processos = result;
    } else {
      const toRemove = [processo];
      let i = 0;
      while (i < toRemove.length) {
        const filhos = processos.filter((x: CadeiaValorProcesso) => x.processo_pai_id === toRemove[i].id);
        toRemove.push(...filhos);
        i++;
      }
      for (const p of toRemove.reverse()) {
        const idx = processos.indexOf(p);
        if (idx > -1) processos.splice(idx, 1);
      }
      this.gridControl.value.processos = [...processos];
    }
    
    this.cdRef.detectChanges();
  }

  public onDragStart(event: DragEvent, processo: CadeiaValorProcesso) {
    this.draggedProcesso = processo;
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/plain', processo.id);
  }

  public onDragOver(event: DragEvent, processoAlvo: CadeiaValorProcesso) {
    if (!this.draggedProcesso) return;
    event.preventDefault();
    
    if (this.draggedProcesso.id === processoAlvo.id) return;
    if (this.isDescendant(processoAlvo, this.draggedProcesso)) return;
    
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const y = event.clientY - rect.top;
    const height = rect.height;
    
    if (y < height * 0.33) {
      this.dropPosition = 'before';
    } else if (y > height * 0.66) {
      this.dropPosition = 'after';
    } else {
      this.dropPosition = 'child';
    }
    
    this.dropTarget = processoAlvo;
    event.dataTransfer!.dropEffect = 'move';
  }

  public async onDrop(event: DragEvent, processoAlvo: CadeiaValorProcesso) {
    event.preventDefault();
    if (!this.draggedProcesso || !this.dropPosition) return;
    if (this.draggedProcesso.id === processoAlvo.id) return;
    if (this.isDescendant(processoAlvo, this.draggedProcesso)) return;

    const processos = this.gridControl.value.processos;
    const draggedItem = processos.find((p: CadeiaValorProcesso) => p.id === this.draggedProcesso!.id);
    
    if (!draggedItem) return;
    
    const oldPaiId = draggedItem.processo_pai_id;
    
    if (this.dropPosition === 'child') {
      draggedItem.processo_pai_id = processoAlvo.id;
    } else {
      draggedItem.processo_pai_id = processoAlvo.processo_pai_id;
      
      const irmaos = processos.filter((x: CadeiaValorProcesso) => x.processo_pai_id === processoAlvo.processo_pai_id && x.id !== draggedItem.id);
      const targetSequencia = processoAlvo.sequencia;
      
      if (this.dropPosition === 'before') {
        draggedItem.sequencia = targetSequencia - 0.5;
      } else {
        draggedItem.sequencia = targetSequencia + 0.5;
      }
      
      irmaos.push(draggedItem);
      irmaos.sort((a: CadeiaValorProcesso, b: CadeiaValorProcesso) => a.sequencia - b.sequencia);
      irmaos.forEach((p: CadeiaValorProcesso, idx: number) => p.sequencia = idx + 1);
    }
    
    if (oldPaiId !== draggedItem.processo_pai_id) {
      const irmaosAntigos = processos.filter((x: CadeiaValorProcesso) => x.processo_pai_id === oldPaiId);
      irmaosAntigos.forEach((p: CadeiaValorProcesso, idx: number) => p.sequencia = idx + 1);
    }
    
    const irmaosFilhos = processos.filter((x: CadeiaValorProcesso) => x.processo_pai_id === draggedItem.id);
    irmaosFilhos.forEach((p: CadeiaValorProcesso, idx: number) => p.sequencia = idx + 1);
    
    if (!this.isNoPersist && this.processosDao) {
      const processosParaOrdenar = processos.map((p: CadeiaValorProcesso) => ({
        id: p.id,
        sequencia: p.sequencia,
        processo_pai_id: p.processo_pai_id
      }));
      const result = await this.processosDao.ordenar(processosParaOrdenar);
      this.gridControl.value.processos = result;
    }

    this.onDragEnd();
    this.cdRef.detectChanges();
  }

  public onDragEnd() {
    this.draggedProcesso = null;
    this.dropTarget = null;
    this.dropPosition = null;
  }

  private isDescendant(processo: CadeiaValorProcesso, ancestral: CadeiaValorProcesso): boolean {
    let paiId = processo.processo_pai_id;
    while (paiId) {
      if (paiId === ancestral.id) return true;
      const pai = this.items.find(x => x.id === paiId);
      paiId = pai?.processo_pai_id || null;
    }
    return false;
  }
}
