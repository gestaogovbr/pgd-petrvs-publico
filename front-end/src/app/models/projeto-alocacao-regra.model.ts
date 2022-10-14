import { Base } from './base.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoRegra } from './projeto-regra.model';
import { Projeto } from './projeto.model';
import { ProjetoAlocacao } from './projeto-alocacao.model';

export class ProjetoAlocacaoRegra extends Base {
    public projeto_alocacao?: ProjetoAlocacao;
    public regra?: ProjetoRegra;

    public projeto_alocacao_id: string = "";
    public regra_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}