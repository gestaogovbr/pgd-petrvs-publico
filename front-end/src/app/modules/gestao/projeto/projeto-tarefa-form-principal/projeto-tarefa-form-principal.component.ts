import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { ProjetoTarefaDaoService } from 'src/app/dao/projeto-tarefa-dao.service';

@Component({
  selector: 'projeto-tarefa-form-principal',
  templateUrl: './projeto-tarefa-form-principal.component.html',
  styleUrls: ['./projeto-tarefa-form-principal.component.scss']
})
export class ProjetoTarefaFormPrincipalComponent extends PageFrameBase {

  public form: FormGroup;
  public projetoTarefaDao!: ProjetoTarefaDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.projetoTarefaDao = injector.get<ProjetoTarefaDaoService>(ProjetoTarefaDaoService);
    this.form = this.fh.FormBuilder({
      indice: {default: ""},
      nome: {default: ""},
      status_tarefa: {default: "PLANEJADO"},
      descricao: {default: ""},
      numero_processo: {default: ""},
      numero_documento: {default: ""},
      marco_inicio: {default: ""},
      inicio_tarefa: {default: new Date()},
      marco_termino: {default: ""},
      termino_tarefa: {default: new Date()},
      duracao: {default: ""},
      progresso: {default: 0},
      custo_tarefa: {default: 0.00},
      possui_custos_proprios: {default: true},
      soma_recursos_alocados_filhos: {default: true},
      soma_progresso_filhos: {default: true},
      tem_filhos: {default: true},
      agrupador: {default: false},
      contraido: {default: false},
      aloca_recursos_proprios: {default: true},
      calcula_intervalo: {default: true},
    }, this.cdRef, this.validate);
    this.join = ["projeto_recurso", "projeto_tarefa", "projeto_alocacao","projeto_regra","projeto_envolvido"];
  }
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

}
