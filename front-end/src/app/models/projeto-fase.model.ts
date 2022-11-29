import { Base } from './base.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoRegra } from './projeto-regra.model';
import { Projeto } from './projeto.model';
import { ProjetoAlocacaoRegra } from './projeto-alocacao-regra.model';

export class ProjetoFase extends Base {
    public projeto?: Projeto;

    public inicio: Date | null = null /* Inicio (Opcional) */
    public termino: Date | null = null /* Termino (Opcional) */
    public cor: string = ""; /* Código da cor em formato hex */
    public nome: string = ""; /* Nome */
    public descricao: string = ""; /* Descrição */
    public projeto_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}