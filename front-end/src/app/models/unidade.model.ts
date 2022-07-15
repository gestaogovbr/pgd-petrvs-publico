import { LookupItem } from '../services/lookup.service';
import { Base, IIndexable } from './base.model';
import { Cidade } from './cidade.model';
import { Entidade } from './entidade.model';
import { UnidadeOrigemAtividade } from './unidade-origem-atividade.model';
import { Usuario } from './usuario.model';

export class UnidadeNotificacoes {
    enviar_email: boolean = true;
    enviar_whatsapp: boolean = true;
    notifica_demanda_distribuicao: boolean = true;
    notifica_demanda_conclusao: boolean = true;
    notifica_demanda_avaliacao: boolean = true;
    notifica_demanda_modificacao: boolean = true;
    notifica_demanda_comentario: boolean = true;
    template_demanda_distribuicao: string = "";
    template_demanda_conclusao: string = "";
    template_demanda_avaliacao: string = "";
    template_demanda_modificacao: string = "";
    template_demanda_comentario: string = "";
}

export type DistribuicaoFormaContagemPrazos = "HORAS_CORRIDAS" | "DIAS_CORRIDOS" | "HORAS_UTEIS" | "DIAS_UTEIS";
export type EntregaFormaContagemPrazos = "HORAS_CORRIDAS" | "HORAS_UTEIS";

export class Unidade extends Base {
    public entidade?: Entidade; /* Objeto da entidade */
    public cidade?: Cidade; /* Objeto da cidade */
    public gestor?: Usuario; /* Objeto do ususario gestor */
    public gestor_substituto?: Usuario; /* Objeto do ususario gestor substituto */
    public unidade?: Unidade; /* Objeto da unidade pai */

    public codigo: string = ""; //Código da unidade
    public sigla: string = ""; //Sigla da unidade
    public nome: string = ""; //Nome da unidade
    public path: string = ""; //Path dos nós pais separados por /
    public atividades_arquivamento_automatico: number = 0; //Se arquiva automaticamente após avaliação
    public atividades_avaliacao_automatico: number = 0; //Se avalia automaticamente ao final do prazo para avaliação com nota 10 (pela IN65/2020-ME é 45 dias após a entrega)
    public planos_prazo_comparecimento: number = 1; //Prazo de antecedência para comunicar o usuário de seu comparecimento na unidade
    public planos_tipo_prazo_comparecimento: string = "DIAS"; //["HORAS", "DIAS"] //Unidade de medida para contagem do planos_prazo_comparecimento
    public horario_trabalho_inicio: string = "00:00"; //default("00:00")- //Referência do início da jornada de trabalho diária da unidade para fins de distribuição de demanda (contar a partir deste horário)
    public horario_trabalho_fim: string = "24:00"; //default("23:59")- //Referência do fim da jornada de trabalho diária da unidade para fins de distribuição de demanda (até este horário, caso seja superior será contado do dia seguinte)
    public horario_trabalho_intervalo: string = "00:00"; // Intervalo realizado dentro da jornada de trabalho (Ex.: horário de almoço). Para fins de computo de jornada de trabalho na ausência do plano de trabalho.
    public distribuicao_forma_contagem_prazos: DistribuicaoFormaContagemPrazos = "DIAS_UTEIS";// ["HORAS_CORRIDAS", "DIAS_CORRIDOS", "HORAS_UTEIS", "DIAS_UTEIS"]) //Forma da contagem de prazo na distribuição
    public entrega_forma_contagem_prazos: EntregaFormaContagemPrazos = "HORAS_UTEIS";// ["HORAS_CORRIDAS", "HORAS_UTEIS"]) //Forma da contagem de prazo na entrega
    public notificacoes: UnidadeNotificacoes = new UnidadeNotificacoes(); // Mensagens
    public autoedicao_subordinadas: number = 0; //Permitir a autoedição de informações gerais pelas unidades subordinadas (nome, sigla, codigo_pai)
    public etiquetas: LookupItem[] = []; //Configuração das etiquetas que serão utilizadas nas demandas (comtém nome, icone e cor)
    public data_inicio: Date = new Date(); //Data inicio da vigência
    public data_fim: Date | null = null; //Data final da vigência
    public unidades_origem_atividades: UnidadeOrigemAtividade[] = [];

    public unidade_id: string | null = null; //Unidade superior (nó pai hierárquico)
    public entidade_id: string | null = null; // Entidade referente
    public gestor_id: string | null = null; // Usuário gestor da unidade
    public gestor_substituto_id: string | null = null; // Usuário gestor substituto da unidade
    public cidade_id: string = ""; // Cidade;

    constructor(){
        super();
    }
}
