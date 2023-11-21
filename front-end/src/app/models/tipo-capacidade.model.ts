import { Base } from './base.model';

export class TipoCapacidade extends Base {
    public descricao: string = ""; /* Descrição da capacidade (acesso) */
    public codigo: string = ""; /* Código da rotina no sistema (acesso) */
    public grupo_id: string | null = null; /*Define o módulo */
    public filhos: TipoCapacidade[] = [];
    
    public constructor(data?: any) { super(); this.initialization(data); }
}