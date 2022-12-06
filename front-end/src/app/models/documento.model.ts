import { Base } from './base.model';
import { DocumentoAssinatura } from './documento-assinatura.model';
import { Entidade } from './entidade.model';
import { Plano } from './plano.model';
import { TipoDocumento } from './tipo-documento.model';
import { TipoProcesso } from './tipo-processo.model';

export type DocumentoEspecie = "TERMO_ADESAO" | "SEI";
export type DocumentoStatus = "GERADO" | "AGUARDANDO_SEI";

export class Documento extends Base {

    public static STATUS_GERADO = "GERADO"; 
    public static STATUS_AGUARDANDO_SEI = "GERADO"; 

    public entidade?: Entidade;
    public plano?: Plano;
    public tipo_documento?: TipoDocumento;
    public tipo_processo?: TipoProcesso;

    public numero: number = 0; /* Numero do documento (gerado pelo sistema) */
    public especie: DocumentoEspecie = "TERMO_ADESAO"; /* Especificação da espécie do documento (interno do sistema) */
    public conteudo: string | null = null; /* "Conteúdo do arquivo */
    public assinatura: any = null; /* Dados da assinatura, se nulo não está assinado */
    public metadados: any = null; /* Metadados */
    public id_processo: number | null = null; /* ID do processo de entrega, caso seja Sei será o ID do procedimento */
    public numero_processo: string | null = null; /* Número do processo de entrega, com a formatação de origem */
    public id_documento: number | null = null; /* ID da entrega, caso seja o Sei será o ID_Documento */
    public numero_documento: string | null = null; /* Numero do documento de entrega, caso seja o Sei é o numero Sei */
    public titulo_documento: string | null = null; /* Numeração do tipo de documento no sistema integrado */
    public entidade_id: string | null = null; /* Entidade */
    public plano_id: string | null = null; /* Plano */
    public tipo_documento_id: string | null = null; /* Tipo documento */
    public tipo_processo_id: string | null = null; /* Tipo processo */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
    public status: DocumentoStatus = "GERADO";
    public assinaturas: DocumentoAssinatura[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}