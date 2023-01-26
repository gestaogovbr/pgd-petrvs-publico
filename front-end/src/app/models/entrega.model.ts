import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export class Entrega extends Base {
    public nome: string = ""; //Nome da entrega;
    public tipo_indicador: string = ""; //Tipo_indicador: "QUANTIDADE", "VALOR", "PORCENTAGEM", "QUALITATIVO");
    public lista_qualitativos: LookupItem[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}