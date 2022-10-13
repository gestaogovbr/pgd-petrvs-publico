import { Component, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoTarefa } from 'src/app/models/projeto-tarefa.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-alocacoes',
  templateUrl: './projeto-form-alocacoes.component.html',
  styleUrls: ['./projeto-form-alocacoes.component.scss']
})
export class ProjetoFormAlocacoesComponent extends PageFrameBase {
  @Input() projeto?: Projeto;
  @Input() tarefa?: ProjetoTarefa;

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({
      nome_recurso: {default: ""},
      regra: {default: ""},
      decricao_recurso: {default: ""},
      qtd_recurso: {default: 0}
    }, this.cdRef, this.validate);
  }

  public get items(): ProjetoAlocacao[] {
    return this.projeto?.alocacoes || this.tarefa?.alocacoes || [];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

}
