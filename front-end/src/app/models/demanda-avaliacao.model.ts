import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Demanda } from './demanda.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { Usuario } from './usuario.model';

export class DemandaAvaliacao extends Base {
    public usuario?: Usuario;
    public demanda?: Demanda;
    public tipo_avaliacao?: TipoAvaliacao;

    public data_inicio: Date = new Date(); /* Data de inicio da avaliacao */
    public data_fim: Date | null = null; /* Data fim da avaliacao */
    public nota_atribuida: number = 0; /* Nota atribuida */
    public justificativas: LookupItem[] = []; /* Justificativas */

    public demanda_id: string = ""; /* ID da Demanda */
    public usuario_id: string = ""; /* ID do Usuario */
    public tipo_avaliacao_id: string = ""; /* ID do Usuario */

    constructor(){
        super();
    }
}