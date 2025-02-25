import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Cidade } from './cidade.model';
import { EntidadeEmail } from './entidade-email';
import { Expediente } from './expediente.model';
import { HasNotificacao, NotificacoesConfig } from './notificacao.model';
import { HasRelatorio } from './relatorio.model';
import { Template } from './template.model';
import { TipoModalidade } from './tipo-modalidade.model';
import { Usuario } from './usuario.model';

export type Nomenclatura = {
    id: string,
    nome: string,
    singular: string,
    plural: string,
    feminino: boolean
}

export type TipoCargaHoraria = "DIA" | "SEMANA" | "MES";

export class Entidade extends Base implements HasNotificacao, HasRelatorio {
    public cidade?: Cidade;
    public tipo_modalidade?: TipoModalidade;
    public gestor?: Usuario; /* Objeto do usuario gestor */
    public gestor_substituto?: Usuario;
    public relatorios_templates?: Template[] | undefined;

    public sigla: string = ""; // Sigla da entidade
    public nome: string = ""; // Nome da entidade
    public abrangencia: string = "NACIONAL"; //["NACIONAL", "ESTADUAL", "MUNICIPAL" // ("Abrangência da entidade
    public codigo_ibge: string | null = null; //Código da UF ou do município (IBGE)
    public uf: string | null = null; /* UF para abrangencia estadual */
    public carga_horaria_padrao: number = 8; //default(8) //Carga horária utilizada ao criar plano de trabalho
    public gravar_historico_processo: number = 0; //default(0) //Se grava andamento da atividade dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)
    public layout_formulario_atividade: string = "COMPLETO"; //["COMPLETO", "SIMPLIFICADO"]) default("COMPLETO") //Layout para a tela do formulário de atividades (cadastro simplificado ou completo)
    public campos_ocultos_atividade: LookupItem[] = []; //Campos que se deseja ocultar do formulário de atividade, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco"
    public nomenclatura: Nomenclatura[] = []; /* Nomenclatura da entidade */
    public url_sei: string = ""; /* Url base do sei */
    public notificacoes: NotificacoesConfig = new NotificacoesConfig();
    public notificacoes_templates?: Template[];  /* Lista de templates */
    public forma_contagem_carga_horaria: TipoCargaHoraria = "DIA"; // Forma de contagem padrão da carga horária
    public expediente: Expediente = new Expediente(); // Expediente (Não nulo)

    public gestor_id: string | null = null; // Usuário gestor da unidade
    public gestor_substituto_id: string | null = null; // Usuário gestor substituto da unidade
    public cidade_id: string | null = null;
    public tipo_modalidade_id: string | null = null; //Tipo de modalidade utilizada ao criar plano de trabalho
    public email_responsavel_siape: string = ""; // Email do responsável pelas alterações no SIAPE
    public email_remetente_siape: string = ""; // Email do remetente a ser usado em relato de alterações no SIAPE

    public emails: EntidadeEmail[] = []; /* Emails */

    public constructor(data?: any) { super(); this.initialization(data); }
}