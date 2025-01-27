import { LookupItem } from '../services/lookup.service';
import { Atividade, Checklist } from './atividade.model';
import { Base } from './base.model';
import { Produto } from './produto.model';
import { Unidade } from './unidade.model';

export type EntregaTipoIndicador = "QUANTIDADE" | "VALOR" | "PORCENTAGEM" | "QUALITATIVO";

export type EntregaValor = {
    porcentagem?: number,
    quantitativo?: number,
    valor?: number,
    qualitativo?: string
};

export class Entrega extends Base {
    public unidade?: Unidade;

    public nome: string = ""; //Nome da entrega;
    public descricao: string = ""; //Descrição da entrega;
    public tipo_indicador: EntregaTipoIndicador = "PORCENTAGEM"; //Tipo_indicador: "QUANTIDADE", "VALOR", "PORCENTAGEM", "QUALITATIVO");
    public lista_qualitativos: LookupItem[] = [];
    public etiquetas: LookupItem[] = []; /* Etiquetas */
    public checklist: Checklist[] = []; /* Checklist */

    public unidade_id: string | null = null;
    public atividades?: Atividade[];
    public produtos?: Produto[];

    public constructor(data?: any) { super(); this.initialization(data); }
}