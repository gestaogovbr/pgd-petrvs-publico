import { LookupItem } from '../services/lookup.service';
import { Atividade } from './atividade.model';
import { Base } from './base.model';
import { CadeiaValor } from './cadeia-valor.model';
import { Cidade } from './cidade.model';
import { Entidade } from './entidade.model';
import { Expediente } from './expediente.model';
import { HasNotificacao, NotificacoesConfig } from './notificacao.model';
import { Planejamento } from './planejamento.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { PlanoEntrega } from './plano-entrega.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { Programa } from './programa.model';
import { Template } from './template.model';
import { UnidadeIntegrante } from './unidade-integrante.model';
import { Usuario } from './usuario.model';

export type DistribuicaoFormaContagemPrazos = "HORAS_CORRIDAS" | "DIAS_CORRIDOS" | "HORAS_UTEIS" | "DIAS_UTEIS";
export type EntregaFormaContagemPrazos = "HORAS_CORRIDAS" | "HORAS_UTEIS";

export class Unidade extends Base implements HasNotificacao {
    public entidade?: Entidade; /* Objeto da entidade */
    public cidade?: Cidade; /* Objeto da cidade */
    public unidade_pai?: Unidade; /* Objeto da unidade pai */
    public gestor: UnidadeIntegrante | null = null; /* Objeto do vinculo entre unidade/usuario que possui a atribuição de gestor */
    public gestores_substitutos: UnidadeIntegrante[] = []; /* Objeto do vinculo entre unidade/usuarios que possuem a atribuição de gestor_substituto */
    public gestores_delegados: UnidadeIntegrante[] = []; /* Objeto do vinculo entre unidade/usuarios que possuem a atribuição de gestor_delegado */
    public atividades?: Atividade[]; /* Lista de atividades */
    public planos_trabalho?: PlanoTrabalho[]; /* Lista de planos de trabalho */
    public planos_entrega?: PlanoEntrega[]; /* Lista de planos de entrega */
    public entregas_plano_entrega?: PlanoEntregaEntrega[]; /* Lista de entregas de plano de entrega */
    public programas?: Programa[]; /* Lista de programas */
    public notificacoes_templates?: Template[];  /* Lista de templates */
    public unidades?: Unidade[]; /* Lista de unidades */
    public planejamentos?: Planejamento[]; /* Lista de planejamentos institucionais */
    public cadeias_valor?: CadeiaValor[]; /* Lista de cadeias de valor */
    public integrantes?: UnidadeIntegrante[]; /* Lista de vínculos unidade-integrante */

    public codigo: string = ""; //Código da unidade
    public sigla: string = ""; //Sigla da unidade
    public nome: string = ""; //Nome da unidade
    public path: string = ""; //Path dos nós pais separados por /
    public atividades_arquivamento_automatico: number = 0; //Se arquiva automaticamente após avaliação
    public distribuicao_forma_contagem_prazos: DistribuicaoFormaContagemPrazos = "DIAS_UTEIS";// ["HORAS_CORRIDAS", "DIAS_CORRIDOS", "HORAS_UTEIS", "DIAS_UTEIS"]) //Forma da contagem de prazo na distribuição
    public entrega_forma_contagem_prazos: EntregaFormaContagemPrazos = "HORAS_UTEIS";// ["HORAS_CORRIDAS", "HORAS_UTEIS"]) //Forma da contagem de prazo na entrega
    public notificacoes: NotificacoesConfig = new NotificacoesConfig(); // Mensagens
    public etiquetas: LookupItem[] = []; //Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)
    public checklist: LookupItem[] = []; //Nome dos checklist
    public data_inativacao: Date | null = null; //Data em que a unidade foi inativada, se for o caso
    public instituidora: number = 0; //Se a unidade é instituidora (Programas)
    public informal: number = 1; //Se a unidade é informal
    public expediente: Expediente | null = null; // Expediente (Não nulo)
    public texto_complementar_plano: string | null = ""; // Mensagem adicional para o plano de trabalho

    public unidade_pai_id: string | null = null; //Unidade superior (nó pai hierárquico)
    public entidade_id: string | null = null; // Entidade referente
    public cidade_id: string = ""; // Cidade;

    public constructor(data?: any) { super(); this.initialization(data); }
}
