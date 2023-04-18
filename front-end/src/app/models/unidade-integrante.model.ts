import { Base } from './base.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export type UnidadeIntegranteTipo = "AVALIADOR_DEMANDAS" | "LOTADO" | "CHEFE" | "CHEFE_SUBSTITUTO";

export class UnidadeIntegrante extends Base {
    public unidade?: Unidade;
    public usuario?: Usuario;

    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
    public tipo: UnidadeIntegranteTipo = "LOTADO"; //Tipo do vinculo
    public unidade_id: string = "";
    public usuario_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}


 