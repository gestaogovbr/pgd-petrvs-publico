import { Base } from './base.model';
import { Entidade } from './entidade.model';
import { PlanejamentoObjetivo } from './planejamento-objetivo.model';
import { Unidade } from './unidade.model';

export class Planejamento extends Base {
    public unidade?: Unidade;
    public entidade?: Entidade;
    
    public data_inicio: Date = new Date();  /* Data de criação */
    public data_fim: Date | null = null;  /* Data final do registro */
    public inicio: Date = new Date(); /* Data de início do planejamento */
    public fim: Date | null = null; /* Data do fim do planejamento */
    public nome: string = ""; /* Nome do plano de gestão/entregas */
    public objetivos?: PlanejamentoObjetivo[];
    public unidade_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */

    public constructor(data?: any) { super(); this.initialization(data); }
}
