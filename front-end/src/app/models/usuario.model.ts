import { LookupItem } from '../services/lookup.service';
import { Afastamento } from './afastamento.model';
import { Atividade } from './atividade.model';
import { Base, IIndexable } from './base.model';
import { Lotacao } from './lotacao.model';
import { HasNotificacao, NotificacoesConfig } from './notificacao.model';
import { Perfil } from './perfil.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { Unidade } from './unidade.model';

export type UsuarioVinculacao = "SERVIDOR_EFETIVO" | "SERVIDOR_COMISSIONADO" | "EMPREGADO" | "CONTRATADO_TEMPORARIO";

export class UsuarioConfig {
    etiquetas: LookupItem[] = [];
    menu_contexto: string = "";
    ocultar_menu_sei: boolean = true;
    ocultar_container_petrvs: boolean = false;
}

export class Usuario extends Base implements HasNotificacao {
    public perfil?: Perfil; /* Objeto do perfil */
    public planos_trabalho?: PlanoTrabalho[]; /* Lista de planos de trabalho */
    public afastamentos?: Afastamento[]; /* Lista de afastamentos */
    public atividades?: Atividade[];
    public chefias_titulares?: Unidade[];
    public chefias_substitutas?: Unidade[];
    public lotacoes: Lotacao[] = [];

    public nome: string = ""; /* Nome do Usuário */
    public email: string = ""; /* Email do Usuário */
    public email_verified_at?: Date; /* Data de validação do email */
    public cpf: string = ""; /* CPF do usuário */
    public matricula: string | null = null; /* Matrícula do usuário */
    public apelido: string = ""; /* Apelido / Nome de Guerra / Nome funcional */
    public telefone: string | null = null; /* Telefone */
    public uf: string = "AC"; /* UF - Setar a primeira do LIST */
    public sexo: string | null = null; /* Sexo */
    public config: UsuarioConfig & IIndexable = new UsuarioConfig(); /*UsuarioConfig = new UsuarioConfig();*/ /* Configurações diversas */
    public notificacoes: NotificacoesConfig = new NotificacoesConfig();
    public perfil_id: number = 0; /* ID do perfil - Setar o primeiro do list*/
    public id_google: string | null = null; /* ID do usuário google */
    public url_foto: string | null = null; /* URL da foto do usuário (temporário) */
    public vinculacao: UsuarioVinculacao = "SERVIDOR_EFETIVO";
    public texto_complementar_plano: string | null = ""; // Mensagem adicional para o plano de trabalho

    public constructor(data?: any) { super(); this.initialization(data); }
}