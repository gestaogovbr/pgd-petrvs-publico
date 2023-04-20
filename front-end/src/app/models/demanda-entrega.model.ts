import { Base } from './base.model';
import { Comentario, HasComentarios } from './comentario';
import { Demanda } from './demanda.model';
import { Entidade } from './entidade.model';
import { Tarefa } from './tarefa.model';
import { TipoDocumento } from './tipo-documento.model';
import { TipoProcesso } from './tipo-processo.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class DemandaEntrega extends Base implements HasComentarios {
    public demanda?: Demanda;
    public usuario?: Usuario;
    public tarefa?: Tarefa;
    public tipo_documento?: TipoDocumento;
    public tipo_processo?: TipoProcesso;

    public descricao: string | null = null; /* Descrição da tarefa */
    public data_hora: Date = new Date(); /* Data hora do lançamento da tarefa */
    public tempo_estimado: number = 0; /* Tempo estimado para a execução da tarefa (Horas decimais) */
    public id_processo: number | null = null; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
    public numero_processo: string | null = null; /* Número do processo de entrega, com a formatação de origem */
    public id_documento: number | null = null; /* ID da entrega, caso seja o Sei será o ID_Documento */
    public numero_documento: string | null = null; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
    public titulo_documento: string | null = null; /* Numeração do tipo de documento no sistema integrado */
    public concluido: boolean = false; /* Se a tarefa foi concluída */
    public demanda_id: string = ""; /* Demanda */
    public usuario_id: string = ""; /* Usuário */
    public tarefa_id: string | null = null; /* Tarefa */
    public tipo_documento_id: string | null = null; /* Tipo de documento */
    public tipo_processo_id: string | null = null; /* Tipo de processo */
    public comentarios: Comentario[] = []; /* Comentarios da tarefa */

    public constructor(data?: any) { super(); this.initialization(data); }
}
