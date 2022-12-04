import { Injectable } from '@angular/core';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoRecurso } from 'src/app/models/projeto-recurso.model';
import { Projeto } from 'src/app/models/projeto.model';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(public auth: AuthService) { }

  public getRecursoPicture(recurso: ProjetoRecurso): string {
    return (!recurso ? "assets/images/projetos/material.png" :
           (recurso.tipo == "HUMANO" ? recurso.usuario?.url_foto || "assets/images/projetos/usuario.png" :
           (recurso.tipo == "CUSTO" ? "assets/images/projetos/custo.png" :
           (recurso.tipo == "DEPARTAMENTO" ? "assets/images/projetos/unidade.png" :
           (recurso.tipo == "SERVICO" ? "assets/images/projetos/servico.png" : "assets/images/projetos/material.png")))));
  }

  public getNomesRegras(alocacao: ProjetoAlocacao, prefix?: string, sufix?: string) {
    let result: string = alocacao.regras?.map(x => x.regra?.nome).filter(x => x).join(", ") || "";
    return result.length ? (prefix || "") + result + (sufix || "") : result; 
  }

  public isHumanoDepartamento(tipo: string | undefined, tipos: string[] = ['HUMANO', 'DEPARTAMENTO']): boolean {
    return tipos.includes(tipo || '');
  }

  public isMaterialServico(tipo: string | undefined, tipos: string[] = ['MATERIAL', 'SERVICO']): boolean {
    return tipos.includes(tipo || '');
  }

  /* Os envolvidos são considerados os recursos humano e departamental que possuem acesso ao projeto */
  public isEnvolvido(alocacao: ProjetoAlocacao, projeto: Projeto): boolean {
    return !!alocacao.regras?.find(x => (x.regra || projeto.regras?.find(y => y.id == x.regra_id))?.perfis?.includes("ACESSAR"));
  }

  public canAcessar(projeto: Projeto): boolean {
    return !!(projeto.alocacoes || []).find(x => this.isEnvolvido(x, projeto) && ((x.recurso!.tipo == "HUMANO" && x.recurso!.usuario_id == this.auth.usuario?.id) || (x.recurso!.tipo == "DEPARTAMENTO" && this.auth.hasLotacao(x.recurso!.unidade_id!))));
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
