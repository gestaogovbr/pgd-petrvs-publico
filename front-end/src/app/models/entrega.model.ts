import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export type EntregaTipoIndicador = "QUANTIDADE" | "VALOR" | "PORCENTAGEM" | "QUALITATIVO";
export type EntregaValor = {
    porcentagem?: number,
    quantitativo?: number,
    valor?: number,
    qualitativo?: string
};

export class Entrega extends Base {
    public nome: string = ""; //Nome da entrega;
    public tipo_indicador: EntregaTipoIndicador = "PORCENTAGEM"; //Tipo_indicador: "QUANTIDADE", "VALOR", "PORCENTAGEM", "QUALITATIVO");
    public lista_qualitativos: LookupItem[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}