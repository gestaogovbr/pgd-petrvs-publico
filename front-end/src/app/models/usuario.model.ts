import { LookupItem } from '../services/lookup.service';
import { Afastamento } from './afastamento.model';
import { AtividadeTarefa } from './atividade-tarefa.model';
import { Atividade } from './atividade.model';
import { Avaliacao } from './avaliacao.model';
import { Base, IIndexable } from './base.model';
import { Comentario } from './comentario';
import { DocumentoAssinatura } from './documento-assinatura.model';
import { Entidade } from './entidade.model';
import { Favorito } from './favorito.model';
import { Integracao } from './integracao.model';
import { NotificacaoDestinatario } from './notificacao-destinatario.model';
import { HasNotificacao, Notificacao, NotificacoesConfig } from './notificacao.model';
import { Perfil } from './perfil.model';
import { PlanoEntrega } from './plano-entrega.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { ProgramaParticipante } from './programa-participante.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { Projeto } from './projeto.model';
import { UnidadeIntegrante } from './unidade-integrante.model';
import { Unidade } from './unidade.model';

export type UsuarioSituacaoFuncional = "ATIVO_PERMANENTE" |
    "APOSENTADO" |
    "CEDIDO/REQUISITADO" |
    "NOMEADO_CARGO_COMISSIONADO" |
    "SEM_VINCULO" |
    "TABELISTA(ESP/EMERG)" |
    "NATUREZA_ESPECIAL" |
    "ATIVO_EM_OUTRO_ORGAO" |
    "REDISTRIBUIDO" |
    "ATIVO_TRANSITORIO" |
    "EXCEDENTE_A_LOTACAO" |
    "EM_DISPONIBILIDADE" |
    "REQUISITADO_DE_OUTROS_ORGAOS" |
    "INSTITUIDOR_PENSAO" |
    "REQUISITADO_MILITAR_FORCAS_ARMADAS" |
    "APOSENTADO_TCU733/94" |
    "EXERCICIO_DESCENTRALIZADO_CARREIRA" |
    "EXERCICIO_PROVISORIO" |
    "CELETISTA" |
    "ATIVO_PERMANENTE_LEI_8878/94" |
    "ANISTIADO_ADCT_CF" |
    "CELETISTA/EMPREGADO" |
    "CLT_ANS_DECISAO_JUDICIAL" |
    "CLT_ANS_JUDICIAL_CEDIDO" |
    "CLT_APOS_COMPLEMENTO" |
    "CLT_APOS_DECISAO_JUDICIAL" |
    "INST_PS_DECISAO_JUDICIAL" |
    "EMPREGO_PUBLICO" |
    "REFORMA_CBM/PM" |
    "RESERVA_CBM/PM" |
    "REQUISITADO_MILITAR_GDF" |
    "ANISTIADO_PUBLICO_L10559" |
    "ANISTIADO_PRIVADO_L10559" |
    "ATIVO_DECISAO_JUDICIAL" |
    "CONTRATO_TEMPORARIO" |
    "COLAB_PCCTAE_E_MAGISTERIO" |
    "COLABORADOR_ICT" |
    "CLT_ANS_DEC_6657/08" |
    "EXERCICIO_7_ART93_8112" |
    "CEDIDO_SUS/LEI_8270" |
    "INST_ANIST_PUBLICO" |
    "INST_ANIST_PRIVADO" |
    "CELETISTA_DECISAO_JUDICIAL" |
    "CONTRATO_TEMPORARIO_CLT" |
    "EMPREGO_PCC/EX-TERRITORIO" |
    "EXC_INDISCIPLINA" |
    "CONTRATO_PROFESSOR_SUBSTITUTO" |
    "ESTAGIARIO" |
    "ESTAGIARIO_SIGEPE" |
    "RESIDENCIA_E_PMM" |
    "APOSENTADO_TEMPORARIRIO" |
    "CEDIDO_DF_ESTADO_MUNICIPIO" |
    "EXERC_DESCEN_CDT" |
    "EXERC_LEI_13681/18" |
    "PENSIONISTA" |
    "BENEFICIARIO_PENSAO" |
    "QE/MRE_CEDIDO" |
    "QUADRO_ESPEC_QE/MRE";

export class UsuarioConfig {
    etiquetas: LookupItem[] = [];
    menu_contexto: string = "EXECUCAO";
    ocultar_menu_sei: boolean = true;
    ocultar_container_petrvs: boolean = false;
    theme: string = 'light';
    unidade_id: string | undefined;
}

export class Usuario extends Base implements HasNotificacao {
    public perfil?: Perfil; /* Objeto do perfil */
    public gerencia_entidade?: Entidade;
    public gerencia_substituta_entidade?: Entidade;
    public lotacao?: UnidadeIntegrante;
    public lotacao_id?: string;
    public gerencia_titular?: UnidadeIntegrante;

    public afastamentos?: Afastamento[];
    //public anexos?: Anexo[];
    public areas_trabalho?: UnidadeIntegrante[];
    public assinaturas?: DocumentoAssinatura[];
    public atividades?: Atividade[];
    public atividades_demandadas?: Atividade[];
    public avaliacoes?: Avaliacao[];
    public colaboracoes?: UnidadeIntegrante[];
    public comentarios?: Comentario[];
    public consolidacoes?: PlanoTrabalhoConsolidacao[];
    public favoritos?: Favorito[];
    public gerencias_substitutas?: UnidadeIntegrante[] = [];
    public gerencias_delegadas?: UnidadeIntegrante[] = [];
    //public historicos_projeto?: ProjetoHistorico[];
    public integracoes?: Integracao[];
    public notificacoes_destinatario?: NotificacaoDestinatario[];
    public notificacoes_enviadas?: Notificacao[];
    //public notificacoes_whatsapp?: NotificacaoWhatsapp[];
    public participacoes_programas: ProgramaParticipante[] = [];
    public planos_entrega_criados?: PlanoEntrega[];
    public planos_trabalho?: PlanoTrabalho[];
    public planos_trabalho_criados?: PlanoEntrega[];
    public ultimo_plano_trabalho_ativo?: PlanoTrabalho;
    public projetos?: Projeto[];
    public recursos_projeto?: ProjetoRecurso[];
    public tarefas_atividade?: AtividadeTarefa[];
    public tarefas_projeto?: ProjetoTarefa[];
    public unidades?: Unidade[];
    public unidades_integrantes?: UnidadeIntegrante[];
    public audits_externo?: any= [];

    public nome: string = ""; /* Nome do Usuário */
    public email: string = ""; /* Email do Usuário */
    public usuario_externo: boolean = true;
    public email_verified_at?: Date; /* Data de validação do email */
    public cpf: string = ""; /* CPF do usuário */
    public matricula: string | null = null; /* Matrícula do usuário */
    public apelido: string = ""; /* Apelido / Nome de Guerra / Nome funcional */
    public telefone: string | null = null; /* Telefone */
    public data_nascimento: Date = new Date(); /* Data de nascimento do Usuário */
    public uf: string = "DF"; /* UF - Setar a primeira do LIST */
    public sexo: string | null = null; /* Sexo */
    public config: UsuarioConfig & IIndexable = new UsuarioConfig(); /*UsuarioConfig = new UsuarioConfig();*/ /* Configurações diversas */
    public notificacoes: NotificacoesConfig = new NotificacoesConfig();
    public id_google: string | null = null; /* ID do usuário google */
    public url_foto: string | null = null; /* URL da foto do usuário (temporário) */
    public situacao_funcional: UsuarioSituacaoFuncional = "ATIVO_PERMANENTE";
    public texto_complementar_plano: string | null = ""; // Mensagem adicional para o plano de trabalho

    //public perfil_id: number = 0; /* ID do perfil - Setar o primeiro do list*/
    public perfil_id: string = ""; /* ID do perfil - Setar o primeiro do list*/

    public tipo_pedagio: number | null = null; /* Tipo de Pedágio */
    public data_inicial_pedagio: Date | null = null; /* Data Inicial do Pedágio */
    public data_final_pedagio: Date | null = null; /* Data Final do Pedágio */
    public pedagio: boolean = false;

    public constructor(data?: any) { super(); this.initialization(data); }
}