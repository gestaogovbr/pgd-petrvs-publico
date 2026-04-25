import { Base } from './base.model';
export class TipoMotivoAfastamento extends Base {
    constructor(data) {
        super();
        this.codigo = null; /* Código do afastamento */
        this.nome = ""; /* Nome do motivo de afastamento */
        this.sigla = ""; /* Sigla do afastamento */
        this.icone = ""; /* Class do icone relacionado ao afastamento // class="fa fa-icone"  */
        this.cor = ""; /* Código da cor em formato hex // style="color: #AABBCC00" */
        this.horas = 0; /* Se o afastamento é medido em horas */
        this.integracao = 0; /* Se o tipo de motivo de afastamento é integrado a outro sistema */
        this.data_inicio = new Date(); /* Início do afastamento  */
        this.data_fim = new Date(); /* Fim do afastamento */
        this.situacao = "S"; /* Situação do afastamento */
        this.calculo = ""; /* Tipo de cálculo do afastamento */
        this.initialization(data);
    }
}
//# sourceMappingURL=tipo-motivo-afastamento.model.js.map