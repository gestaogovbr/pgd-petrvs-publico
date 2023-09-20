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
import { PlanoTrabalho } from './plano-trabalho.model';
import { ProgramaParticipante } from './programa-participante.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { Projeto } from './projeto.model';
import { UnidadeIntegrante } from './unidade-integrante.model';
import { Unidade } from './unidade.model';

export type UsuarioSituacaoFuncional = "SERVIDOR_EFETIVO" | "SERVIDOR_COMISSIONADO" | "EMPREGADO" | "CONTRATADO_TEMPORARIO";

export class UsuarioConfig {
    etiquetas: LookupItem[] = [];
    menu_contexto: string = "EXECUCAO";
    ocultar_menu_sei: boolean = true;
    ocultar_container_petrvs: boolean = false;
    theme: string = 'light';
}

export class Usuario extends Base implements HasNotificacao {
    public perfil?: Perfil; /* Objeto do perfil */
    public gerencia_entidade?: Entidade;
    public gerencia_substituta_entidade?: Entidade;
    public lotacao?: UnidadeIntegrante;
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
    //public consolidacoes?: PlanoTrabalhoConsolidacao[];
    public favoritos?: Favorito[];
    public gerencias_substitutas?: UnidadeIntegrante[] = [];
    //public historicos_projeto?: ProjetoHistorico[];
    public integracoes?: Integracao[];
    public notificacoes_destinatario?: NotificacaoDestinatario[];
    public notificacoes_enviadas?: Notificacao[];
    //public notificacoes_whatsapp?: NotificacaoWhatsapp[];
    public participacoes_programas: ProgramaParticipante[] = [];
    public planos_entrega_criados?: PlanoEntrega[];
    public planos_trabalho?: PlanoTrabalho[];
    public planos_trabalho_criados?: PlanoEntrega[];
    public projetos?: Projeto[];
    public recursos_projeto?: ProjetoRecurso[];
    public tarefas_atividade?: AtividadeTarefa[];
    public tarefas_projeto?: ProjetoTarefa[];
    public unidades?: Unidade[];
    public unidades_integrante?: UnidadeIntegrante[];

    public nome: string = ""; /* Nome do Usuário */
    public email: string = ""; /* Email do Usuário */
    public email_verified_at?: Date; /* Data de validação do email */
    public cpf: string = ""; /* CPF do usuário */
    public matricula: string | null = null; /* Matrícula do usuário */
    public apelido: string = ""; /* Apelido / Nome de Guerra / Nome funcional */
    public telefone: string | null = null; /* Telefone */
    public data_nascimento?: Date | null = null; /* Data de nascimento do Usuário */
    public uf: string = "AC"; /* UF - Setar a primeira do LIST */
    public sexo: string | null = null; /* Sexo */
    public config: UsuarioConfig & IIndexable = new UsuarioConfig(); /*UsuarioConfig = new UsuarioConfig();*/ /* Configurações diversas */
    public notificacoes: NotificacoesConfig = new NotificacoesConfig();
    public id_google: string | null = null; /* ID do usuário google */
    public url_foto: string | null = null; /* URL da foto do usuário (temporário) */
    public situacao_funcional: UsuarioSituacaoFuncional = "SERVIDOR_EFETIVO";
    public texto_complementar_plano: string | null = ""; // Mensagem adicional para o plano de trabalho

    public perfil_id: number = 0; /* ID do perfil - Setar o primeiro do list*/

    public constructor(data?: any) { super(); this.initialization(data); }
}