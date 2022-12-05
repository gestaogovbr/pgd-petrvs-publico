import { Base } from './base.model';

export class Planejamento extends Base {
    
    public inicio: Date = new Date(); /* Data de início do planejamento */
    public fim: Date | null = null; /* Data do fim do planejamento */
    public unidade_id: string = ""; /* Unidade à qual está vinculado o plano de gestão/entregas */
    public nome: string = ""; /* Nome do plano de gestão/entregas */

    public constructor(data?: any) { super(); this.initialization(data); }
}