import { Base } from './base.model';
import { Capacidade } from './capacidade.model';

export class Perfil extends Base {
    public static readonly NIVEL = {
        DESENVOLVEDOR: 0,
        ADM_MASTER: 1,
        ADM_NEGOCIAL: 2,
        UNIDADE: 3,
        PARTICIPANTE: 5,
        COLABORADOR: 6
    } as const;

    public capacidades: Capacidade[] = []; /* Objecto com lista de capacidades */

    public nivel: number = 0; /* Nível de permissões */
    public nome: string = ""; /* Nome do perfil */
    public descricao: string = ""; /* Descrição sobre o perfil */

    public constructor(data?: any) { super(); this.initialization(data); }
}