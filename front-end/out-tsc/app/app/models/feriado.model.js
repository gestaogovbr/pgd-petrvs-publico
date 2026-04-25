import { Base } from './base.model';
export class Feriado extends Base {
    constructor(data) {
        super();
        this.nome = ""; //Descrição do feriado;
        this.dia = 1; //Dia do mês (1~31) ou dia da semana (1-7)");
        this.mes = 1; //Mês
        this.ano = null; // Ano do feriado caso seja data não recorrente");
        this.recorrente = 1; // Se é uma data única ou repete todos os anos");
        this.abrangencia = "NACIONAL"; // "NACIONAL", "ESTADUAL", "MUNICIPAL" Abrangência do feriado");
        this.codigo_ibge = null; // Código da UF ou do município (IBGE)")
        this.entidade_id = null;
        this.cidade_id = null;
        this.uf = null; /* UF para abrangencia estadual */
        this.initialization(data);
    }
}
//# sourceMappingURL=feriado.model.js.map