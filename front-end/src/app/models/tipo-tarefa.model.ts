import { Base } from './base.model';

export class TipoTarefa extends Base {
    public nome: string = ""; /* Nome da tarefa */
    public tempo_estimado: number = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
    public documental: boolean = false; /* Se a entrega requer obrigatoriamente um documento */
    public comentario: string | null = null; /* Comentário predefinida para a tarefa */

    public constructor(data?: any) { super(); this.initialization(data); }
}
