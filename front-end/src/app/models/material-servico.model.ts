import { Base } from './base.model';

export type MaterialServicoTipo = "MATERIAL" | "SERVICO";
export type MaterialServicoUnidade = "UNIDADE" | "CAIXA" | "METRO" | "KILO" | "LITRO" | "DUZIA" | "FARDO" | "HORAS" | "DIAS" | "PACOTE" | "FRASCO";

export class MaterialServico extends Base {

    public tipo: MaterialServicoTipo = "MATERIAL"; /* Tipo */
    public codigo: string | null = null; /* Código */
    public referencia: string | null = null; /* Referência */
    public descricao: string = ""; /* Descrição */
    public unidade_medida: MaterialServicoUnidade = "UNIDADE"; /* Unidade */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    constructor(){
        super();
    }

}
