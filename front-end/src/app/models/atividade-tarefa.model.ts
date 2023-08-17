import { Base } from './base.model';
import { Comentario, HasComentarios } from './comentario';
import { Atividade } from './atividade.model';
import { TipoTarefa } from './tipo-tarefa.model';
import { Usuario } from './usuario.model';
import { Documento } from './documento.model';

export class AtividadeTarefa extends Base implements HasComentarios {
    public atividade?: Atividade;
    public usuario?: Usuario;
    public tipo_tarefa?: TipoTarefa;
    public documento: Documento | null = null ; /* Documento de entrga */ 
    public comentarios: Comentario[] = []; /* Comentarios da tarefa */

    public descricao: string | null = null; /* Descrição da tarefa */
    public data_lancamento: Date = new Date(); /* Data hora do lançamento da tarefa */
    public tempo_estimado: number = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
    public concluido: boolean = false; /* Se a tarefa foi concluída */

    public documento_id: string | null = null ; /* Documento de entrga */ 
    public atividade_id: string = ""; /* Atividade */
    public usuario_id: string = ""; /* Usuário */
    public tipo_tarefa_id: string | null = null; /* Tarefa */

    public constructor(data?: any) { super(); this.initialization(data); }
}
