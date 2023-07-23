import { Base } from './base.model';

export type MaterialServicoTipo = "MATERIAL" | "SERVICO";
export type MaterialServicoUnidade = "UNIDADE" | "CAIXA" | "METRO" | "KILO" | "LITRO" | "DUZIA" | "MONETARIO" | "HORAS" | "DIAS" | "PACOTE";

export class MaterialServico extends Base {

    public tipo: MaterialServicoTipo = "MATERIAL"; /* Tipo */
    public codigo: string | null = null; /* Código */
    public referencia: string | null = null; /* Referência */
    public descricao: string = ""; /* Descrição */
    public unidade_medida: MaterialServicoUnidade = "UNIDADE"; /* Unidade */

    public constructor(data?: any) { super(); this.initialization(data); }
}
