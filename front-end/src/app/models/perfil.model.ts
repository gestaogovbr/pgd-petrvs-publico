import { Base } from './base.model';
import { Capacidade } from './capacidade.model';

export class Perfil extends Base {
    public capacidades?: Capacidade[]; /* Objecto com lista de capacidades */

    public nivel: number = 0; /* Nível de permissões */
    public nome: string = ""; /* Nome do perfil */
    public descricao: string = ""; /* Descrição sobre o perfil */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data fim */

    public constructor(data?: any) { super(); this.initialization(data); }
}