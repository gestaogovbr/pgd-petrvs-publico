import { Base } from './base.model';
import { Cidade } from './cidade.model';
import { Entidade } from './entidade.model';

export class Feriado extends Base {
    public cidade?: Cidade;
    public entidade?: Entidade;

    public nome: string = ""; //Descrição do feriado;
    public dia: number = 1; //Dia do mês (1~31) ou dia da semana (1-7)");
    public mes: number = 1; //Mês
    public ano: number | null = null; // Ano do feriado caso seja data não recorrente");
    public recorrente: number = 1; // Se é uma data única ou repete todos os anos");
    public abrangencia: string = "NACIONAL"; // "NACIONAL", "ESTADUAL", "MUNICIPAL" Abrangência do feriado");
    public codigo_ibge: string | null = null; // Código da UF ou do município (IBGE)")
    public entidade_id: string | null = null;
    public cidade_id: string | null = null;
    public uf: string | null = null; /* UF para abrangencia estadual */

    public constructor(data?: any) { super(); this.initialization(data); }
}
