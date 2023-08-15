import { LookupItem } from '../services/lookup.service';
import { TipoAtividade } from './tipo-atividade.model';
import { Base } from './base.model';
import { Comentario, HasComentarios } from './comentario';
import { AtividadeTarefa } from './atividade-tarefa.model';
import { PlanoTrabalhoEntrega } from './plano-trabalho-entrega.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { TipoProcesso } from './tipo-processo.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';
import { BadgeButton } from '../components/badge/badge.component';
import { Documento } from './documento.model';
import { AtividadePausa } from './atividade-pausa.model';
import { Status } from './status.model';

export type AtividadeStatus = "CONCLUIDO" | "INICIADO" | "INCLUIDO";

export type AtividadeMetadados = {
    atrasado: boolean,
    tempo_despendido: number,
    tempo_atraso: number,
    suspenso: boolean,
    iniciado: boolean,
    concluido: boolean,
    avaliado: boolean,
    arquivado: boolean,
    produtividade: number,
    status: string,
    extra?: any
    _status?: BadgeButton[],
}

export type AtividadeChecklist = {
    id: string,
    texto: string,
    checked: boolean
}

export class Atividade extends Base implements HasComentarios {
    public plano_trabalho?: PlanoTrabalho;
    public plano_trabalho_entrega?: PlanoTrabalhoEntrega;
    public tipo_atividade?: TipoAtividade;
    public demandante?: Usuario;
    public usuario?: Usuario;
    public unidade?: Unidade;
    public documento_requisicao?: Documento;
    public documento_entrega?: Documento;
    public statusAtual?: Status;
    public statusHistorico: Status[] = [];                             // Mudanças de status sofridas pela atividade (histórico)

    public numero: number = 0; /* Numero da atividade */
    public descricao: string = ""; /* Assunto da atividade */
    public data_distribuicao: Date = new Date(); /* Data de cadastro da atividade */
    public tempo_planejado: number = 0.0; /* Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade) */
    public carga_horaria: number = 0.0; /* Carga horária diária (vinda do plano de trabalho) */
    public prazo_entrega: Date = new Date(); /* Data estipulada para entrega da atividade */
    public data_inicio: Date | null = null; /* Data em que o usuário iniciou a atividade */
    public data_entrega: Date | null = null; /* Data da entrega */
    public esforco: number = 0.0; /* Tempo calculado a partir da atividade e utilizando o fator_complexidade */
    public tempo_despendido: number | null = null; /* Calculado no fim da atividade, sendo o tempo líquido (considerando pausas) */
    public data_arquivamento: Date | null = null; /* Data de arquivamento da atividade */
    public etiquetas: LookupItem[] = []; /* Etiquetas */
    public checklist: AtividadeChecklist[] = []; /* Checklist */
    public prioridade: number | null = null; /* Nível de prioridade */
    public progresso: number = 0; /* Progresso a execução da atividade */
    public metadados: AtividadeMetadados | undefined = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
    public comentarios: Comentario[] = []; /* Comentarios da atividade */
    public pausas: AtividadePausa[] = []; /* Pausas da atividade */
    public tarefas: AtividadeTarefa[] = []; /* Tarefas da atividade */

    public plano_trabalho_id: string | null = null;
    public plano_trabalho_entrega_id: string | null = null;
    public tipo_atividade_id: string | null = null;
    public demandante_id: string = "";
    public usuario_id: string | null = null;
    public unidade_id: string = "";
    public documento_requisicao_id: string | null = null;
    public documento_entrega_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}