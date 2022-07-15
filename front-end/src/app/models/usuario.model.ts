import { KanbanDocker } from '../components/kanban/kanban.component';
import { StatusDockerConfig } from '../modules/gestao/demanda/demanda-list-kanban/demanda-list-kanban.component';
import { LookupItem } from '../services/lookup.service';
import { Afastamento } from './afastamento.model';
import { Base, IIndexable } from './base.model';
import { Demanda } from './demanda.model';
import { Lotacao } from './lotacao.model';
import { Perfil } from './perfil.model';
import { Plano } from './plano.model';

export type UsuarioVinculacao = "SERVIDOR_EFETIVO" | "SERVIDOR_COMISSIONADO" | "EMPREGADO" | "CONTRATADO_TEMPORARIO";

export class UsuarioNotificacoes {
    enviar_email: boolean = true;
    enviar_whatsapp: boolean = true;
    notifica_demanda_distribuicao: boolean = true;
    notifica_demanda_conclusao: boolean = true;
    notifica_demanda_avaliacao: boolean = true;
    notifica_demanda_modificacao: boolean = true;
    notifica_demanda_comentario: boolean = true;
}

export class UsuarioConfig {
    etiquetas: LookupItem[] = [];
    ocutar_menu_sei: boolean = true;
    ocutar_container_petrvs: boolean = false;
}

export class Usuario extends Base {
    public perfil?: Perfil; /* Objeto do perfil */
    public planos?: Plano[]; /* Lista de planos de trabalho */
    public afastamentos?: Afastamento[]; /* Lista de afastamentos */
    public demandas?: Demanda[];

    public nome: string = ""; /* Nome do Usuário */
    public email: string = ""; /* Email do Usuário */
    public email_verified_at?: Date; /* Data de validação do email */
    public cpf: string = ""; /* CPF do usuário */
    public matricula: string | null = null; /* Matrícula do usuário */
    public apelido: string = ""; /* Apelido / Nome de Guerra / Nome funcional */
    public telefone: string | null = null; /* Telefone */
    public uf: string = "AC"; /* UF - Setar a primeira do LIST */
    public sexo: string | null = null; /* Sexo */
    public lotacoes: Lotacao[] = [];
    public config: UsuarioConfig & IIndexable = new UsuarioConfig(); /*UsuarioConfig = new UsuarioConfig();*/ /* Configurações diversas */
    public notificacoes: UsuarioNotificacoes = new UsuarioNotificacoes();
    public data_inicio?: Date; /* Data de início */
    public data_fim?: Date; /* Data fim */
    public perfil_id: number = 0; /* ID do perfil - Setar o primeiro do list*/
    public id_google: string | null = null; /* ID do usuário google */
    public url_foto: string | null = null; /* URL da foto do usuário (temporário) */
    public vinculacao: UsuarioVinculacao = "SERVIDOR_EFETIVO";

    constructor(){
        super();
    }
}
