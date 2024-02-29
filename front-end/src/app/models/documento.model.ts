import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { AtividadeTarefa } from './atividade-tarefa.model';
import { Atividade } from './atividade.model';
import { Base } from './base.model';
import { DocumentoAssinatura } from './documento-assinatura.model';
import { Entidade } from './entidade.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { TipoDocumento } from './tipo-documento.model';
import { TipoProcesso } from './tipo-processo.model';

export type DocumentoTipo = "HTML" | "PDF" | "LINK" | "RELATORIO";
export type DocumentoEspecie = "SEI" | "TCR" | "OUTRO" | "NOTIFICACAO" | "RELATORIO";
export type DocumentoStatus = "GERADO" | "AGUARDANDO_SEI";
export type DocumentoLinkTipo = "SEI" | "URL";
export type DocumentoLink = {
    tipo: DocumentoLinkTipo;
    url?: string; /* Url do documento externo */
    id_processo?: number; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
    numero_processo?: string; /* Número do processo de entrega, com a formatação de origem */
    id_documento?: number; /* ID da entrega, caso seja o Sei será o ID_Documento */
    numero_documento?: string; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
    titulo_documento?: string; /* Numeração do tipo de documento no sistema integrado */
};

export interface HasDocumentos {
    documentos: Documento[];
    documento?: Documento;
    documento_id: string | null;
    id: string;
};

export class Documento extends Base {
    public static STATUS_GERADO = "GERADO";
    public static STATUS_AGUARDANDO_SEI = "GERADO";

    public entidade?: Entidade;
    public atividade?: Atividade;
    public atividade_tarefa?: AtividadeTarefa;
    public plano_trabalho?: PlanoTrabalho;
    public tipo_documento?: TipoDocumento;
    public tipo_processo?: TipoProcesso;
    public assinaturas?: DocumentoAssinatura[] = [];

    public numero: number = 0; /* Numero do documento (gerado pelo sistema) */
    public titulo: string = ""; /* Título do documento */
    public tipo: DocumentoTipo = "HTML"; /* Especificação da espécie do documento (interno do sistema) */
    public especie: DocumentoEspecie = "OUTRO"; /* Especificação da espécie do documento (interno do sistema) */
    public conteudo: string | null = null; /* "Conteúdo do arquivo */
    public metadados: any = null; /* Metadados */
    public link: DocumentoLink | null = null;
    public status: DocumentoStatus = "GERADO";
    public template: string | null = null; /* Campo de Template */
    public dataset: TemplateDataset[] | null = null; /* DataSet do template (Define as variáveis disponíveis) */
    public datasource: any = null; /* DataSource do template (Dados disponíveis para interpolação) */

    public entidade_id: string | null = null; /* Entidade */
    public tipo_documento_id: string | null = null; /* Tipo documento */
    public tipo_processo_id: string | null = null; /* Tipo processo */
    public template_id: string | null = null; /* Template */
    public plano_trabalho_id: string | null = null; /* Plano de trabalho */
    public atividade_id: string | null = null; /* Atividade */
    public atividade_tarefa_id: string | null = null; /* Tarefa da Atividade */

    public constructor(data?: any) { super(); this.initialization(data); }
}
