import { Base } from './base.model';
import { Usuario } from './usuario.model';

export type ComentarioTipo = "COMENTARIO" | "TECNICO" | "GERENCIAL" | "AVALIACAO" | "TAREFA" | "ATIVIDADE";
export type ComentarioPrivacidade = "PUBLICO" | "PRIVADO";
export type ComentarioOrigem = undefined | "DEMANDA" | "ENTREGA" | "PROJETO" | "TAREFA";

export interface HasComentarios {
    id: string;
    comentarios: Comentario[];
}

export class Comentario extends Base {
    public usuario?: Usuario;

    public texto: string = ""; /* Texto do comentário */
    public path: string = ""; /* Path dos ids dos comentários; */
    public data_hora: Date = new Date(); /* Data e horário que foi feito o comentário */
    public tipo: ComentarioTipo = "COMENTARIO"; /* Tipo comentario */
    public privacidade: ComentarioPrivacidade = "PUBLICO"; /* Tipo comentario */

    public usuario_id: string = ""; /* ID do usuário que fez o comentário */
    public comentario_id: string | null = null; /* ID do comentário pai, quando existir */
    public demanda_id: string | null = null; /* ID da demanda que gerou o comentário */
    public entrega_id: string | null = null; /* ID da entrega que gerou o comentário */
    public projeto_id: string | null = null; /* ID do projeto que gerou o comentário */
    public projeto_tarefa_id: string | null = null; /* ID da tarefa que gerou o comentário */

    public constructor(data?: any) { super(); this.initialization(data); }
}