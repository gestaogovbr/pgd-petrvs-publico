var TemplateService_1;
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Template } from 'src/app/models/template.model';
import { Notificar } from '../notificacoes/notificacoes-config/notificacoes-config.component';
let TemplateService = class TemplateService {
    static { TemplateService_1 = this; }
    static { this.OPEN_TAG = "{{"; }
    static { this.CLOSE_TAG = "}}"; }
    static { this.EXPRESSION_BOOLEAN = /^(true|false)$/; }
    static { this.EXPRESSION_NUMBER = /^[0-9,\.]+$/; }
    static { this.EXPRESSION_STRING = /^".*"$/; }
    static { this.EXPRESSION_VAR = /^[a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*$/; }
    static { this.EXPRESSION_IF = /^if:(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(\s*)(=|==|\>|\>=|\<|\<=|\<\>|\!=)(\s*)(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(;.+?\=.+?)*$/; }
    static { this.EXPRESSION_FOR = /^for:([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*)\[((\d+\.\.[a-zA-Z]\w*?(\.\.[a-zA-Z]\w*?)?)|(([a-zA-Z]\w*?\.\.)?[a-zA-Z]\w*?\.\.\d+)|([a-zA-Z]\w*?))\](;.+?\=.+?)*$/; }
    static { this.STATEMENT_FOR = /^for:(?<EXP>([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*))\[(((?<START>\w+?)\.\.(?<INDEX>\w*?)(\.\.(?<END>\w+?))?)|(%(?<EACH>\w+?)%))\](?<PARS>(;.+?\=.+?)*)$/; }
    static { this.STATEMENT_IF = /^if:(?<EXP_A>.+?)(\s*)(?<OPER>=|==|\>|\>=|\<|\<=|\<\>|\!=)(\s*)(?<EXP_B>.+?)(?<PARS>(;.+?\=.+?)*)$/; }
    static { this.STATEMENT_FOR_WITHOUT_PARS = /^(?<STATMENT>for:\w+\[.+\])/; }
    static { this.PARAMETER_DROP = "drop"; }
    constructor(planoTrabalhoDao, templateDao, auth, dialog, util) {
        this.planoTrabalhoDao = planoTrabalhoDao;
        this.templateDao = templateDao;
        this.auth = auth;
        this.dialog = dialog;
        this.util = util;
        this.notificacoes = [];
        this.notifica = { petrvs: false, email: false, whatsapp: false };
    }
    selectRoute(especie, selectId) {
        return Object.assign({ route: ['uteis', 'templates', especie] }, selectId?.length ? { params: { selectId: selectId } } : {});
    }
    details(data) {
        const template = data.entity;
        this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, template.conteudo, []);
    }
    async dataset(especie, codigo) {
        let result = [];
        if (["TCR"].includes(especie)) {
            result = await this.planoTrabalhoDao.dataset();
        }
        else if (especie == "NOTIFICACAO") {
            result = await this.notificacoes.find(x => x.codigo == codigo)?.dataset || [];
        }
        else if (especie == "RELATORIO") {
            result = await this.templateDao.getDataset("REPORT", codigo);
        }
        return result;
    }
    titulo(especie) {
        return especie == "TCR" ? "Termo de ciência e responsabilidade" : "";
    }
    template(especie, extra) {
        return undefined; //especie == "TCR" ? this.auth.entidade?.template_adesao : undefined;
        /* Continuar aqui */
    }
    prepareDatasetToSave(dataset) {
        let result = [];
        for (let item of dataset) {
            let { dao: _, ...newItem } = item; // equivalente a newItem.dao = undefined;
            if (["OBJECT", "ARRAY"].includes(newItem.type || "") || newItem.fields?.length)
                newItem.fields = this.prepareDatasetToSave(newItem.fields || []);
            result.push(newItem);
        }
        return result;
    }
    async loadNotificacoes(entidadeId, unidadeId) {
        let result = [];
        if (entidadeId || unidadeId || !this.notificacoes?.length) {
            let where = [["especie", "==", "NOTIFICACAO"]];
            where.push(entidadeId?.length ? ["entidade_id", "==", entidadeId] : (unidadeId?.length ? ["unidade_id", "==", unidadeId] : ["id", "==", null]));
            let query = this.templateDao.query({
                where: where,
                orderBy: [],
                join: [],
                limit: undefined
            });
            result = await query.asPromise();
            this.notificacoes = query.extra?.notificacoes?.sort((a, b) => a.codigo < b.codigo ? -1 : 1) || [];
            this.notifica = Object.assign(this.notifica, query.extra?.notifica_enviroment || {});
        }
        return result;
    }
    async loadRelatorios(entidadeId) {
        let result = [];
        if (entidadeId) {
            let query = this.templateDao.query({
                where: [["especie", "==", "RELATORIO"], ["entidade_id", "==", entidadeId]],
                orderBy: [],
                join: [],
                limit: undefined
            });
            result = (await query.asPromise())?.sort((a, b) => (a.codigo || '') < (b.codigo || '') ? -1 : 1) || [];
        }
        return result;
    }
    buildItems(source, value, naoNotificar) {
        return this.notificacoes.map(x => {
            let v = value?.find(y => y.codigo == x.codigo);
            let s = source.filter(y => y.codigo == x.codigo && y.id != v?.id).reduce((a, v) => a = (!a ? v : (a.unidade_id?.length ? a : v)), undefined);
            let result = (v?._status != "DELETE" ? v : undefined) || s || new Template({
                id: x.codigo,
                conteudo: x.template,
                especie: "NOTIFICACAO",
                codigo: x.codigo,
                titulo: x.descricao,
                dataset: x.dataset,
                entidade_id: null,
                unidade_id: null,
            });
            return Object.assign(result, { _metadata: { notificar: !(naoNotificar || []).includes(x.codigo) } });
        });
    }
    buildNotificar(config) {
        //(a[v.codigo] = config.nao_notificar.includes(v.codigo), a)
        return this.notificacoes.map(x => new Notificar({
            codigo: x.codigo,
            descricao: x.descricao,
            notifica: !(config.nao_notificar || []).includes(x.codigo)
        })); //.reduce((a: IIndexable, v: TemplateNotificacao) => Object.assign(a, {[v.codigo]: config.nao_notificar.includes(v.codigo)}), {} as IIndexable)
    }
    /**************************************************************************************
     * Funções para renderizar template
     **************************************************************************************/
    getStrRegEx(expression) {
        return !expression ? "" : typeof expression == "string" ?
            expression.split("").map(c => "<>/\\{}[]()-?*.!~".includes(c) ? "\\" + c : c).join("") :
            expression.toString().replace(/^\//, "").replace(/\/.*?$/, "");
    }
    /* Monta as RegExp start e end de modo a obter: /^(BEFORE)(START)(TAG)(END)(AFTER)$/ */
    tagSplit(template, startTag, endTag) {
        let beforeAfterRegEx = (tag) => "^(?<BEFORE>[\\s\\S]*?)(?<START>" + this.getStrRegEx(tag.before) + "[\\s\\t\\n]*)(?<TAG>" + this.getStrRegEx(tag.tag) + ")(?<END>[\\s\\t\\n]*" + this.getStrRegEx(tag.after) + ")(?<AFTER>[\\s\\S]*?)$";
        let startRegEx = beforeAfterRegEx(typeof startTag == "string" ? { tag: startTag } : startTag);
        let endRegEx = beforeAfterRegEx(typeof endTag == "string" ? { tag: endTag } : endTag);
        let start = template.match(new RegExp(startRegEx))?.groups;
        if (start) {
            let end = start.AFTER.match(new RegExp(endRegEx))?.groups;
            if (end) {
                return {
                    before: start.BEFORE,
                    start: { before: start.START, tag: start.TAG, after: start.END },
                    content: end.BEFORE,
                    end: { before: end.STERT, tag: end.TAG, after: end.END },
                    after: end.AFTER
                };
            }
        }
        return undefined;
    }
    getExpressionValue(expression, context) {
        expression = expression.replace("[+]", ".length");
        expression.match(/\[\w+\]/g)?.map(x => x.replace(/^\[/, "").replace(/\]$/, "")).forEach(x => expression = expression.replace("[" + x + "]", "[" + this.getExpressionValue(x, context).toString() + "]"));
        if (expression.toLowerCase().match(TemplateService_1.EXPRESSION_BOOLEAN))
            return expression.toLowerCase() == "true";
        if (expression.match(TemplateService_1.EXPRESSION_STRING))
            return expression.replace(/^\"/, "").replace(/\"$/, "");
        if (expression.match(TemplateService_1.EXPRESSION_NUMBER))
            return +expression;
        if (expression.match(TemplateService_1.EXPRESSION_VAR))
            return this.util.getNested(context, expression);
        return undefined;
    }
    bondaryTag(tag, regStrBefore, regStrAfter) {
        let start = tag.before.match(new RegExp("(?<BEFORE>[\\s\\S]*)(?<CONTENT>" + regStrBefore + ")"));
        let end = tag.after.match(new RegExp("(?<CONTENT>" + regStrAfter + ")(?<AFTER>[\\s\\S]*)"));
        tag.start.before = start?.groups?.CONTENT || "";
        tag.before = start?.groups?.BEFORE || "";
        tag.after = end?.groups?.AFTER || "";
        tag.end.after = end?.groups?.CONTENT || "";
    }
    evaluateOperator(a, operator, b) {
        switch (operator) {
            case "==":
            case "=": return a == b;
            case "<>":
            case "!=": return a != b;
            case ">": return a > b;
            case ">=": return a >= b;
            case "<": return a < b;
            case "<=": return a <= b;
        }
        return false;
    }
    splitEndTag(after, startTag, endTag) {
        let before = "";
        let level = 1;
        let next = undefined;
        while (next = this.tagSplit(after, { tag: new RegExp(this.getStrRegEx(TemplateService_1.OPEN_TAG) + "((" + startTag + ")|(" + endTag + "))") }, TemplateService_1.CLOSE_TAG)) {
            level += next.start.tag.toString().indexOf(endTag) >= 0 ? -1 : 1;
            if (!level) { /* Level = 0; significa que o end-for é do respectivo for */
                next.before = before + next.before;
                return next;
            }
            after = next.after;
            before += next.before + next.start.tag + next.content + next.end.tag;
        }
        return undefined;
    }
    processParamDrop(tag, params) {
        let parameter = []; /* Usado penas para iterar os parametros */
        let parameters = (params?.replace(/^;/, "") || "").split(";").reduce((a, v) => (parameter = v.split("="), a[parameter[0]] = parameter[1], a), {});
        if (tag && parameters.drop && parameters.drop.match(/^\w+$/)) {
            this.bondaryTag(tag, "<" + parameters.drop + ">[\\s\\S]*?$", "^[\\s\\S]*?<\\/" + parameters.drop + ">");
            tag.start.before = "";
            tag.end.after = "";
        }
    }
    renderTemplate(template, context) {
        let tag = undefined;
        let statement = null;
        let next = template;
        let result = "";
        while (tag = this.tagSplit(next, TemplateService_1.OPEN_TAG, TemplateService_1.CLOSE_TAG)) {
            try {
                if (tag.content.match(TemplateService_1.EXPRESSION_VAR)) {
                    let content = (this.getExpressionValue(tag.content, context) + "").replace(/^undefined$/, "");
                    tag.content = this.renderTemplate(content, context);
                }
                else if (tag.content.match(TemplateService_1.EXPRESSION_IF)) {
                    statement = tag.content.match(TemplateService_1.STATEMENT_IF); /* if:OPER1=OPER2;par=0;par=0... */
                    let aValue = this.getExpressionValue(statement?.groups?.EXP_A || "", context);
                    let bValue = this.getExpressionValue(statement?.groups?.EXP_B || "", context);
                    let ifThen = this.evaluateOperator(aValue, statement?.groups?.OPER || "", bValue);
                    /* Processa o parametro drop caso ele exista, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                    this.processParamDrop(tag, statement?.groups?.PARS);
                    /* Encontra o end-if */
                    let endIfTag = this.splitEndTag(tag.after, "if:", "end-if");
                    if (endIfTag) {
                        /* Processa o parametro drop caso ele exista na tag de fechamento, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                        this.processParamDrop(endIfTag, endIfTag.content?.replace(/^;/, ""));
                        /* O content da tag só será renderizado caso ifThen seja true */
                        tag.content = ifThen ? this.renderTemplate(endIfTag.before, context) : "";
                        tag.after = endIfTag.after;
                    }
                    else {
                        throw new Error("o if não possui um repectivo end-if");
                    }
                }
                else if (tag.content.match(TemplateService_1.EXPRESSION_FOR)) {
                    statement = tag.content.match(TemplateService_1.STATEMENT_FOR); /* for:EXP[(t..)x..0|0..x(..t)|EACH];par=0;par=0... */
                    /* Processa o parametro drop caso ele exista, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                    this.processParamDrop(tag, statement?.groups?.PARS);
                    /* Encontra o end-for */
                    let endForTag = this.splitEndTag(tag.after, "for:", "end-for");
                    if (endForTag) {
                        /* Processa o parametro drop caso ele exista na tag de fechamento, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                        this.processParamDrop(endForTag, endForTag.content?.replace(/^;/, ""));
                        /* O content da tag será todo o conteúdo repetível do for e o after será o after do end-for */
                        tag.content = "";
                        tag.after = endForTag.after;
                        /* Verifica se a variável de iteração já existe no contexto */
                        if (context[statement?.groups?.EACH || statement?.groups?.INDEX || ""])
                            throw new Error("Variável de contexto já existe no contexto atual");
                        /* Itera os elementos do for */
                        let elements = this.getExpressionValue(statement?.groups?.EXP || "", context);
                        let each = !!statement?.groups?.EACH?.match(/^[a-zA-Z]\w+$/);
                        let asc = each || !!statement?.groups?.START?.match(/^\d+$/);
                        let startFor = each ? 0 : asc ? +statement.groups.START : elements.length;
                        let endFor = each ? elements.length : asc ? elements.length : +statement.groups.END;
                        for (let index = startFor; asc ? index < endFor : index > endFor; asc ? index++ : index--) {
                            let current = elements[index];
                            let forContext = Object.assign({}, context);
                            /* Alimenta contexto com variaveis do for */
                            if (each) {
                                forContext[statement.groups.EACH] = current;
                            }
                            else {
                                let total = asc && statement?.groups?.END ? statement.groups.END : !asc && statement?.groups?.START ? statement.groups.START : undefined;
                                if (total)
                                    forContext[total] = elements.length;
                                forContext[statement.groups.INDEX] = index;
                            }
                            tag.content += this.renderTemplate(endForTag.before, forContext);
                        }
                    }
                    else {
                        throw new Error("o for não possui um repectivo end-for");
                    }
                }
            }
            catch (error) {
                tag.content = "(ERRO)";
            }
            finally {
                tag.start.tag = "";
                tag.end.tag = "";
            }
            /* Incrementa o result e prepara o next */
            result += tag.before + (tag.start.before || "") + tag.start.tag + (tag.start.after || "") + tag.content + (tag.end.before || "") + tag.end.tag + (tag.end.after || "");
            next = tag.after;
        }
        result += next;
        return result;
    }
};
TemplateService = TemplateService_1 = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TemplateService);
export { TemplateService };
//# sourceMappingURL=template.service.js.map