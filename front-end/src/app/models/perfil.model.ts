import { Base } from './base.model';
import { Capacidade } from './capacidade.model';

export class Perfil extends Base {
    public capacidades: Capacidade[] = []; /* Objecto com lista de capacidades */

    public nivel: number = 0; /* Nível de permissões */
    public nome: string = ""; /* Nome do perfil */
    public descricao: string = ""; /* Descrição sobre o perfil */

    public constructor(data?: any) { super(); this.initialization(data); }
}