import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export type UnidadeIntegranteTipo = "AVALIADOR_DEMANDAS" | "LOTADO" | "GESTOR" | "GESTOR_SUBSTITUTO";

export class UnidadeIntegranteConsolidado {
    public usuario?: Usuario;

    public id: string = ""; /* Utilizado somente para garantir o funcionamento do grid */
    public usuario_id: string = "";
    public atribuicoes: string[] = [];
};

export class UnidadeIntegrante extends Base {
    public unidade?: Unidade;
    public usuario?: Usuario;

    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
    public atribuicao: UnidadeIntegranteTipo = "LOTADO"; //Tipo do vinculo
    public unidade_id: string = "";
    public usuario_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}


 