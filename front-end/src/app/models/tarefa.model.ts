import { Base } from './base.model';
import { Entidade } from './entidade.model';
import { Unidade } from './unidade.model';

export class Tarefa extends Base {
    public unidade?: Unidade;
    public entidade?: Entidade;

    public nome: string = ""; /* Nome da tarefa */
    public tempo_estimado: number = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
    public documental: boolean = false; /* Se a entrega requer obrigatoriamente um documento */
    public comentario_predefinido: string | null = null; /* Comentário predefinida para a tarefa */
    public unidade_id: string | null = null; /* Unidade vinculada a tarefa */
    public entidade_id: string | null = null; /* Entidade vinculada a tarefa */

    public constructor(data?: any) { super(); this.initialization(data); }
}
