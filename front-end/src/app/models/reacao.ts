import { Base } from './base.model';
import { Usuario } from './usuario.model';

export type ReacaoTipo = 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';
export type ReacaoOrigem = undefined | "ATIVIDADE" | "PLANO_ENTREGA_ENTREGA" | "PLANO_TRABALHO_ENTREGA";

export type ReacaoPorTipo = {
    tipo: string;
    reacoes: Reacao[];
}

export interface HasReacoes {
    id: string;
    reacoes: Reacao[];
}

export class Reacao extends Base {
    public usuario?: Usuario;
    public tipo: ReacaoTipo = "like"; /* Tipo reação */
    public usuario_id: string = ""; /* ID do usuário que fez a reação */
    public atividade_id: string | null = null; /* ID da atividade que gerou a reação */
    public plano_entrega_entrega_id: string | null = null; /* ID da etrega do plano de entrega que gerou a reação*/
    public plano_trabalho_entrega_id: string | null = null; /* ID da etrega do plano de trabalho que gerou a reação*/

    public constructor(data?: any) { super(); this.initialization(data); }
}