import { Base } from './base.model';
export class Cidade extends Base {
    constructor(data) {
        super();
        this.codigo_ibge = ""; //Código IBGE
        this.nome = ""; //Nome da cidade;
        this.tipo = "MUNICIPIO"; //Tipo: MUNICIPIO, DISTRITO, CAPITAL");
        this.uf = "AC"; //Unidade da federação
        this.timezone = 0; //Timezone da cidade
        this.initialization(data);
    }
}
//# sourceMappingURL=cidade.model.js.map