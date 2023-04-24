import { Base } from './base.model';
import { ProjetoRecursoTipo } from './projeto-recurso.model';
import { Projeto } from './projeto.model';

export class ProjetoRegra extends Base {
    public projeto?: Projeto;

    public nome: string = ""; /* Nome da regra */
    public tipo_recurso: ProjetoRecursoTipo = "MATERIAL"; /* Tipo do recurso */
    public perfis: string[] = []; /* Lista de perfis da regra */
    public data_inicio: Date = new Date(); /* Data de criação */
    public data_fim: Date | null = null; /* Data final do registro */

    public projeto_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}
