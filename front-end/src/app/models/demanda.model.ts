import { StatusDemanda } from '../modules/gestao/demanda/demanda-list-base';
import { LookupItem } from '../services/lookup.service';
import { Atividade } from './atividade.model';
import { Base } from './base.model';
import { Comentario } from './comentario';
import { DemandaAvaliacao } from './demanda-avaliacao.model';
import { DemandaEntrega } from './demanda-entrega.model';
import { DemandaPausa } from './demanda-pausa.model';
import { Plano } from './plano.model';
import { TipoProcesso } from './tipo-processo.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export type DemandaStatus = "AVALIADO" | "CONCLUIDO" | "INICIADO" | "LANCADO";

export type DemandaMetadados = {
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
    _status?: StatusDemanda[],
    extra?: any
}

export type DemandaChecklist = {
    id: string,
    texto: string,
    checked: boolean
}

export class Demanda extends Base {
    public atividade?: Atividade;
    public unidade?: Unidade;
    public usuario?: Usuario;
    public avaliacao?: DemandaAvaliacao;
    public plano?: Plano;
    public tipo_processo?: TipoProcesso;

    public numero: number = 0; /* Numero da demanda */
    public id_requisicao: number | null = null; /* ID da requisição do sistema integrado, caso seja o Sei será o ID_Documento */
    public numero_requisicao: string | null = null; /* Numero do documento de requisição, caso seja o Sei é o numero Sei */
    public id_processo: number | null = null; /* ID do processo, caso seja Sei será o ID do procedimento */
    public numero_processo: string | null = null; /* Número do processo, com a formatação de origem */
    public assunto: string | null = null; /* Assunto da demanda */
    public data_distribuicao: Date = new Date(); /* Data de cadastro da demanda */
    public tempo_planejado: number = 0.0; /* Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade) */
    public carga_horaria: number = 0.0; /* Carga horária diária (vinda do plano de trabalho) */
    //public dias_planejado: number = 0.0;  /* Diferença entre data_distribuicao e prazo_entrega em dias (úteis ou corridas, configurada na unidade) */
    public prazo_entrega: Date = new Date(); /* Data estipulada para entrega da demanda */
    public data_inicio: Date | null = null; /* Data em que o usuário iniciou a atividade */
    public data_entrega: Date | null = null; /* Data da entrega */
    public tempo_pactuado: number = 0.0; /* Tempo calculado a partir da atividade e utilizando o fator_complexidade */
    public fator_complexidade: number = 1; /* Multiplicador do tempo da atividade */
    public tempo_despendido: number | null = null; /* Calculado no fim da demanda, sendo o tempo líquido (considerando pausas) */
    //public dias_despendido: number | null = null; /* Calculado no fim da demanda, sendo o tempo líquido (considerando pausas) */
    public id_processo_entrega: number | null = null; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
    public numero_processo_entrega: string | null = null; /* Número do processo de entrega, com a formatação de origem */
    public id_documento_entrega: number | null = null; /* ID da entrega, caso seja o Sei será o ID_Documento */
    public numero_documento_entrega: string | null = null; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
    public titulo_documento_entrega: string | null = null; /* Numeração do tipo de documento no sistema integrado */
    public data_arquivamento: Date | null = null; /* Data de arquivamento da demanda */
    public tempo_homologado: number | null = null; /* Caso a avaliação seja positiva ou tenha sido concluido e o plano de trabalho não requer avaliação será igual ao tempo pactuado */
    public produtividade: number | null = null; /* Diferença entre o tempo pactuado e o despendido */
    public etiquetas: LookupItem[] = []; /* Etiquetas */
    public checklist: DemandaChecklist[] = []; /* Checklist */
    public prioridade: number | null = null; /* Nível de prioridade */
    public recalcula_prazo: boolean = false; /* Recalcula data de entrega baseado nos dias planejado */
    public metadados: DemandaMetadados | undefined = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
    public comentarios: Comentario[] = []; /* Comentarios da demanda */
    public pausas: DemandaPausa[] = []; /* Pausas da demanda */
    public entregas: DemandaEntrega[] = []; /* Entregas da demanda */

    public atividade_id: string | null = null;
    public demandante_id: string = "";
    public usuario_id: string | null = null;
    public unidade_id: string = "";
    public plano_id: string | null = null;
    public avaliacao_id: string | null = null;
    public tipo_documento_requisicao_id: string | null = null;
    public tipo_documento_entrega_id: string | null = null;
    public tipo_processo_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}