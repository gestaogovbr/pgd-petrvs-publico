import { Base } from './base.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoRegra } from './projeto-regra.model';
import { Projeto } from './projeto.model';
import { ProjetoAlocacaoRegra } from './projeto-alocacao-regra.model';

export class ProjetoAlocacao extends Base {
    public projeto?: Projeto;
    public tarefa?: ProjetoTarefa;
    public recurso?: ProjetoRecurso;
    public regras?: ProjetoAlocacaoRegra[];

    public descricao: string = ""; /* Descrição */
    public quantidade: number = 1; /* Quantidade */
    public projeto_id: string | null = null;
    public tarefa_id: string | null = null;
    public recurso_id: string = "";
    //public regra_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}