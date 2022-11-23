import { Injectable } from '@angular/core';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoRecurso } from 'src/app/models/projeto-recurso.model';
import { Projeto } from 'src/app/models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor() { }

  public getRecursoPicture(recurso: ProjetoRecurso): string {
    return (!recurso ? "assets/images/projetos/material.png" :
           (recurso.tipo == "HUMANO" ? recurso.usuario?.url_foto || "assets/images/projetos/usuario.png" :
           (recurso.tipo == "CUSTO" ? "assets/images/projetos/custo.png" :
           (recurso.tipo == "DEPARTAMENTO" ? "assets/images/projetos/unidade.png" :
           (recurso.tipo == "SERVICO" ? "assets/images/projetos/servico.png" : "assets/images/projetos/material.png")))));
  }

  public getNomesRegras(envolvido: ProjetoAlocacao, prefix?: string, sufix?: string) {
    let result: string = envolvido.regras?.map(x => x.regra?.nome).filter(x => x).join(", ") || "";
    return result.length ? (prefix || "") + result + (sufix || "") : result; 
  }

  /* Todas as validações realizadas aqui DEVEM ser realizadas tambem no back-end em ProjetoService->recalcular */
  public recalcular(projeto: Projeto) {
    let minData: Date | null = null;
    let maxData: Date | null = null;
    for(let tarefa of projeto.tarefas || []) {
      minData = (!minData && tarefa.inicio) || (tarefa.inicio && minData && tarefa.inicio.getTime() < minData.getTime()) ? tarefa.inicio : minData;
      maxData = (!maxData && tarefa.inicio) || (tarefa.termino && maxData && tarefa.termino?.getTime() > maxData.getTime()) ? tarefa.termino : maxData;
    }
    if(projeto.calcula_intervalo) {
      projeto.inicio = minData || maxData || new Date();
      projeto.termino = maxData || projeto.inicio;
    }
  }
}
