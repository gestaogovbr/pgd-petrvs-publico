import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PlanoEntregaService = class PlanoEntregaService {
    constructor(lookup) {
        this.lookup = lookup;
    }
    getValorMeta(entrega) {
        let result = "";
        switch (entrega.entrega?.tipo_indicador) {
            case "PORCENTAGEM":
                result = entrega.meta.porcentagem + " %";
                break;
            case "QUANTIDADE":
                result = entrega.meta.quantitativo + "";
                break;
            case "VALOR":
                result = entrega.meta.valor + "";
                break;
            case "QUALITATIVO":
                result = this.lookup.getValue(entrega.entrega.lista_qualitativos || [], entrega.meta.qualitativo);
                break;
            default: result = "Indicador desconhecido";
        }
        return result;
    }
    getValorRealizado(entrega) {
        let result = "";
        switch (entrega.entrega?.tipo_indicador) {
            case "PORCENTAGEM":
                result = entrega.realizado.porcentagem + " %";
                break;
            case "QUANTIDADE":
                result = entrega.realizado.quantitativo + "";
                break;
            case "VALOR":
                result = entrega.realizado.valor + "";
                break;
            case "QUALITATIVO":
                result = this.lookup.getValue(entrega.entrega.lista_qualitativos || [], entrega.realizado.qualitativo);
                break;
            default: result = "Indicador desconhecido";
        }
        return result;
    }
    getValor(entregaValor) {
        return typeof entregaValor.porcentagem != "undefined" ? entregaValor.porcentagem :
            typeof entregaValor.qualitativo != "undefined" ? entregaValor.qualitativo :
                typeof entregaValor.quantitativo != "undefined" ? entregaValor.quantitativo :
                    typeof entregaValor.valor != "undefined" ? entregaValor.valor : 0;
    }
    getEntregaValor(entrega, valor) {
        let result = {};
        if (entrega.tipo_indicador == "PORCENTAGEM")
            result.porcentagem = valor;
        if (entrega.tipo_indicador == "QUALITATIVO")
            result.qualitativo = valor;
        if (entrega.tipo_indicador == "QUANTIDADE")
            result.quantitativo = valor;
        if (entrega.tipo_indicador == "VALOR")
            result.valor = valor;
        return result;
    }
    isPorcentagem(entrega) {
        return entrega.entrega?.tipo_indicador == "PORCENTAGEM";
    }
    /**
     * Informa se o plano de entregas recebido como parâmetro está ativo, ou seja: é um plano válido (não foi deletado, não foi cancelado,
     * não foi arquivado) e possui o status ATIVO.
     * @param planoEntrega
     * @returns
     */
    isAtivo(planoEntrega) {
        return this.isValido(planoEntrega) && planoEntrega.status == 'ATIVO';
    }
    /**
     * Informa se o plano de entregas recebido como parâmetro é válido, ou seja, não foi deletado, não foi cancelado nem foi arquivado.
     * @param planoEntrega
     * @returns
     */
    isValido(planoEntrega) {
        return !planoEntrega.deleted_at && planoEntrega.status != 'CANCELADO' && !planoEntrega.data_arquivamento;
    }
    /**
     * Informa a situação do plano de entregas recebido como parâmetro, ou seja, se foi EXCLUIDO ou ARQUIVADO, ou, caso contrário, o seu status atual.
     * @param planoEntrega
     * @returns
     */
    situacaoPlano(planoEntrega) {
        if (planoEntrega.deleted_at)
            return "EXCLUIDO";
        else if (planoEntrega.data_arquivamento)
            return "ARQUIVADO";
        else
            return planoEntrega.status;
    }
};
PlanoEntregaService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlanoEntregaService);
export { PlanoEntregaService };
//# sourceMappingURL=plano-entrega.service.js.map