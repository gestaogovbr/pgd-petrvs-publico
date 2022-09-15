import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Cidade } from './cidade.model';
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

export class EntidadeNotificacoes {
    enviar_email: boolean = true;
    enviar_whatsapp: boolean = true;
    notifica_demanda_distribuicao: boolean = true;
    notifica_demanda_conclusao: boolean = true;
    notifica_demanda_avaliacao: boolean = true;
    notifica_demanda_modificacao: boolean = true;
    notifica_demanda_comentario: boolean = true;
    template_demanda_distribuicao: string = "Uma nova demanda foi atribuída a você, acesse o PETRVS para visualizá-la! (ID: #{{demanda_numero}})";
    template_demanda_conclusao: string = "A demanda #{{demanda_numero}}, atribuída à\ao {{demanda_responsavel}}, foi concluída, acesse o PETRVS para visualizá-la!";
    template_demanda_avaliacao: string = "Sua demanda #{{demanda_numero}} foi avaliada, acesse o PETRVS para avaliá-la!";
    template_demanda_modificacao: string = "A demanda #{{demanda_numero}}, atribuída à {{demanda_responsavel}}, foi atualizada, acesse o PETRVS para visualizá-la!";
    template_demanda_comentario: string = "Foi inserido um comentário na demanda #{{demanda_numero}}, atribuída a {{demanda_responsavel}}, acesse o PETRVS para visualizá-la!";
}

export class Entidade extends Base {
    public cidade?: Cidade;
    public tipoModalidade?: TipoModalidade;
    public gestor?: Usuario; /* Objeto do ususario gestor */
    public gestor_substituto?: Usuario; /* Objeto do ususario gestor substituto */

    public sigla: string = ""; // Sigla da entidade
    public nome: string = ""; // Nome da entidade
    public abrangencia: string = "NACIONAL"; //["NACIONAL", "ESTADUAL", "MUNICIPAL" // ("Abrangência da entidade
    public codigo_ibge: string | null = null; //Código da UF ou do município (IBGE)
    public carga_horaria_padrao: number = 8; //default(8) //Carga horária utilizada ao criar plano de trabalho
    public gravar_historico_processo: number = 0; //default(0) //Se grava andamento da demanda dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)
    public layout_formulario_demanda: string = "COMPLETO"; //["COMPLETO", "SIMPLIFICADO"]) default("COMPLETO") //Layout para a tela do formulário de demandas (cadastro simplificado ou completo)
    public campos_ocultos_demanda: LookupItem[] = []; //Campos que se deseja ocultar do formulário de daemanda, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco"
    public tipo_modalidade_id: string | null = null; //Tipo de modalidade utilizada ao criar plano de trabalho
    public cidade_id: string | null = null;
    public uf: string | null = null; /* UF para abrangencia estadual */
    public nomenclatura: Nomenclatura[] = []; /* Nomenclatura da entidade */
    public notificacoes: EntidadeNotificacoes = new EntidadeNotificacoes();
    public url_sei: string = ""; /* Url base do sei */
    public gestor_id: string | null = null; // Usuário gestor da unidade
    public gestor_substituto_id: string | null = null; // Usuário gestor substituto da unidade
    public forma_contagem_carga_horaria: TipoCargaHoraria = "DIA"; // Forma de contagem padrão da carga horária

    public constructor(data?: any) { super(); this.initialization(data); }
}