import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'plano-trabalho-consolidacao-list',
  templateUrl: './plano-trabalho-consolidacao-list.component.html',
  styleUrls: ['./plano-trabalho-consolidacao-list.component.scss']
})
export class PlanoTrabalhoConsolidacaoListComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() set entity(value: PlanoTrabalho | undefined) { super.entity = value; } get entity(): PlanoTrabalho | undefined { return super.entity; }

  public get items(): PlanoTrabalhoConsolidacao[] {
    return this.entity?.consolidacoes || [];
  }

  public dao?: PlanoTrabalhoConsolidacaoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.dao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.title = this.lex.translate("Consolidações");
    this.code = "MOD_PTR_CSLD";
    this.form = this.fh.FormBuilder({
      'data_inicio': {default: new Date()},
      'data_fim': {default: new Date()}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    // TODO: Validar data
    return result;
  }

  public async addConsolidacao() {
    return new PlanoTrabalhoConsolidacao({
      id: this.dao!.generateUuid(),
      plano_trabalho_id: this.entity!.id
    });
  }

  public async loadConsolidacao(form: FormGroup, row: any) {
    this.form!.patchValue({
      data_inicio: row.data_inicio,
      data_fim: row.data_fim
    });    
    this.cdRef.detectChanges();
  }

  public async removeConsolidacao(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
      try {
        let consolidacao = row as PlanoTrabalhoConsolidacao;
        await this.dao?.delete(consolidacao);
        this.items.splice(this.items.findIndex(x => x.id == consolidacao.id), 1);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  public async saveConsolidacao(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if (this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.data_inicio = form.controls.data_inicio.value;
      row.data_fim = form.controls.data_fim.value;
      result = await this.dao?.save(row);
    }
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }  

}
