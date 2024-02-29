import { Base } from './base.model';
import { Usuario } from './usuario.model';

export type ComentarioTipo = "COMENTARIO" | "TECNICO" | "GERENCIAL" | "AVALIACAO" | "TAREFA" | "TIPO_ATIVIDADE";
export type ComentarioPrivacidade = "PUBLICO" | "PRIVADO";
export type ComentarioOrigem = undefined | "ATIVIDADE" | "ATIVIDADE_TAREFA" | "PROJETO" | "PROJETO_TAREFA" | "PLANO_ENTREGA_ENTREGA";

export interface HasComentarios {
    id: string;
    comentarios: Comentario[];
}

export class Comentario extends Base {
    public usuario?: Usuario;

    public texto: string = ""; /* Texto do comentário */
    public path: string = ""; /* Path dos ids dos comentários; */
    public data_comentario: Date = new Date(); /* Data e horário que foi feito o comentário */
    public tipo: ComentarioTipo = "COMENTARIO"; /* Tipo comentario */
    public privacidade: ComentarioPrivacidade = "PUBLICO"; /* Tipo comentario */

    public usuario_id: string = ""; /* ID do usuário que fez o comentário */
    public comentario_id: string | null = null; /* ID do comentário pai, quando existir */
    public atividade_id: string | null = null; /* ID da atividade que gerou o comentário */
    public atividade_tarefa_id: string | null = null; /* ID da tarefa que gerou o comentário */
    public projeto_id: string | null = null; /* ID do projeto que gerou o comentário */
    public projeto_tarefa_id: string | null = null; /* ID da tarefa que gerou o comentário */
    public plano_entrega_entrega_id: string | null = null; /* ID da etrega do plano de entrega */

    public constructor(data?: any) { super(); this.initialization(data); }
}