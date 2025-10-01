import { Base } from './base.model';
import { TipoModalidade } from './tipo-modalidade.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';
import { Programa } from './programa.model';
import { TipoCargaHoraria } from './entidade.model';
import { PlanoEntrega } from './plano-entrega.model';
import { PlanoTrabalhoEntrega } from './plano-trabalho-entrega.model';
import { Documento, HasDocumentos } from './documento.model';
import { Atividade } from './atividade.model';
import { HasStatus, StatusJustificativa } from './status-justificativa.model';
import { PlanoTrabalhoConsolidacao } from './plano-trabalho-consolidacao.model';
import { LookupItem } from '../services/lookup.service';
import { AssinaturaList } from '../modules/gestao/plano-trabalho/plano-trabalho.service';

export type PlanoMetadados = { concluido: boolean }

export type PlanoTrabalhoStatus = 'INCLUIDO' | 'AGUARDANDO_ASSINATURA' | 'ATIVO' | 'CONCLUIDO' | 'AVALIADO' | 'SUSPENSO' | 'CANCELADO';

export type PlanoTrabalhoMetadata = {
    assinaturasExigidas: AssinaturaList;
    jaAssinaramTCR: AssinaturaList;
    criterios_avaliacao: LookupItem[];
};

export class PlanoTrabalho extends Base implements HasDocumentos, HasStatus {
    public tipo_modalidade?: TipoModalidade;
    public unidade?: Unidade;
    public usuario?: Usuario;
    public programa?: Programa;
    public documento?: Documento;

    public carga_horaria: number = 0; //Carga horária diária do usuário
    public tempo_total: number = 0; //Horas úteis de trabalho no período de data_inicio (vigência) à data_fim (vigência) considerando carga_horaria, feriados, fins de semana
    public tempo_proporcional: number = 0; //tempo_total menos os afastamentos
    public data_inicio: Date = new Date(); //Início do plano
    public data_fim: Date = new Date(); //Final do plano
    public data_arquivamento?: Date; //Data do arquivamento do plano
    public status: PlanoTrabalhoStatus = 'INCLUIDO'; // Status atual do plano de trabalho
    public forma_contagem_carga_horaria: TipoCargaHoraria = "DIA"; // Forma de contagem padrão da carga horária
    public metadados: PlanoMetadados | undefined = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
    public arquivar: boolean = false;                                 // Campo virtual utilizado pelos métodos arquivar/desarquivar
    public entregas: PlanoTrabalhoEntrega[] = []; /* Entregas vinculadas ao Plano de Trabalho*/
    public documentos: Documento[] = [];
    public atividades: Atividade[] = [];
    public status_historico: StatusJustificativa[] = [];  // Mudanças de status sofridas pelo plano de trabalho (histórico)
    public consolidacoes: PlanoTrabalhoConsolidacao[] = [];
    public assinaturasExigidas: AssinaturaList = { "participante": [], "gestores_unidade_executora": [],  "gestores_unidade_lotacao": [], "gestores_entidade": [] };
    public jaAssinaramTCR: AssinaturaList = { "participante": [], "gestores_unidade_executora": [],  "gestores_unidade_lotacao": [], "gestores_entidade": [] };
    public criterios_avaliacao: LookupItem[] = []; /* Critérios de avaliação do plano de trabalho */
    public quantidadeAssinaturasExigidas: number = 2;

    /*public _metadata: PlanoTrabalhoMetadata = {
        assinaturasExigidas: { "participante": [], "gestores_unidade_executora": [],  "gestores_unidade_lotacao": [], "gestores_entidade": [] },
        jaAssinaramTCR: { "participante": [], "gestores_unidade_executora": [],  "gestores_unidade_lotacao": [], "gestores_entidade": [] },
        criterios_avaliacao: []
    };*/

    public programa_id: string = "";
    public usuario_id: string = "";
    public unidade_id: string = "";
    public tipo_modalidade_id: string = "";
    public documento_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}