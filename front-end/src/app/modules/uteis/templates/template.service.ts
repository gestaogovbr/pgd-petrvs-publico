import { Injectable } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { TemplateDaoService } from 'src/app/dao/template-dao.service';
import { NotificacoesConfig } from 'src/app/models/notificacao.model';
import { Template, TemplateEspecie } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FullRoute } from 'src/app/services/navigate.service';
import { Notificar } from '../notificacoes/notificacoes-config/notificacoes-config.component';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';

export type TemplateNotificacao = {
  codigo: string,
  descricao: string,
  dataset: TemplateDataset[],
  template: string
}

export type TemplateFieldType = "VALUE" | "DATE" | "DATETIME" | "TEMPLATE" | "OBJECT" | "ARRAY";

export type TemplateDataset = {
  field: string,
  label: string,
  type?: TemplateFieldType,
  dao?: DaoBaseService<Base>,
  fields?: TemplateDataset[],
  lookup?: LookupItem[]
}

export type TemplateTag = {
  before?: string | RegExp,
  tag: string | RegExp,
  after?: string | RegExp,
}

export type SplitTag = {
  before: string,
  start: TemplateTag,
  content: string,
  end: TemplateTag,
  after: string 
}

export type VariableTemplate = { 
  level: number, 
  variable: string, 
  label: string
};

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  public static OPEN_TAG = "{{";
  public static CLOSE_TAG = "}}";
  public static EXPRESSION_BOOLEAN = /^(true|false)$/;
  public static EXPRESSION_NUMBER = /^[0-9,\.]+$/;
  public static EXPRESSION_STRING = /^".*"$/;
  public static EXPRESSION_VAR = /^[a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*$/;
  public static EXPRESSION_IF = /^if:(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(\s*)(=|==|\>|\>=|\<|\<=|\<\>|\!=)(\s*)(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(;.+?\=.+?)*$/;
  public static EXPRESSION_FOR = /^for:([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*)\[((\d+\.\.[a-zA-Z]\w*?(\.\.[a-zA-Z]\w*?)?)|(([a-zA-Z]\w*?\.\.)?[a-zA-Z]\w*?\.\.\d+)|([a-zA-Z]\w*?))\](;.+?\=.+?)*$/;
  public static STATEMENT_FOR = /^for:(?<EXP>([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*))\[(((?<START>\w+?)\.\.(?<INDEX>\w*?)(\.\.(?<END>\w+?))?)|(%(?<EACH>\w+?)%))\](?<PARS>(;.+?\=.+?)*)$/;
  public static STATEMENT_IF = /^if:(?<EXP_A>.+?)(\s*)(?<OPER>=|==|\>|\>=|\<|\<=|\<\>|\!=)(\s*)(?<EXP_B>.+?)(?<PARS>(;.+?\=.+?)*)$/;
  public static STATEMENT_FOR_WITHOUT_PARS = /^(?<STATMENT>for:\w+\[.+\])/;
  public static PARAMETER_DROP = "drop";

  public notificacoes: TemplateNotificacao[] = [];
  public notifica = { petrvs: false, email: false, whatsapp: false };

  constructor(
    public planoTrabalhoDao: PlanoTrabalhoDaoService,
    public templateDao: TemplateDaoService,
    public auth: AuthService,
    public dialog: DialogService,
    public util: UtilService
  ) { }

  public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates', especie]};
  }

  public details(data: any) {
    const template = data.entity as Template;
    this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, template.conteudo!, []);
  }

  public dataset(especie: TemplateEspecie, codigo?: string): TemplateDataset[] {
    let result: TemplateDataset[] = [];
    if(["TCR"].includes(especie)) {
      result = this.planoTrabalhoDao.dataset();
    } else if(especie == "NOTIFICACAO") {
      result = this.notificacoes.find(x => x.codigo == codigo)?.dataset || [];
    }
    return result; 
  }

  public titulo(especie: TemplateEspecie): string {
    return especie == "TCR" ? "Termo de ciência e responsabilidade" : "";
  }

  public template(especie: TemplateEspecie, extra?: any): Template | undefined {
    return undefined; //especie == "TCR" ? this.auth.entidade?.template_adesao : undefined;
    /* Continuar aqui */
  }

  public prepareDatasetToSave(dataset: TemplateDataset[]): TemplateDataset[] {
    let result: TemplateDataset[] = [];
    for(let item of dataset) {
      let {dao: _, ...newItem} = item; // equivalente a newItem.dao = undefined;
      if(["OBJECT", "ARRAY"].includes(newItem.type || "") || newItem.fields?.length) newItem.fields = this.prepareDatasetToSave(newItem.fields || []);
      result.push(newItem);

    }
    return result;
  }  

  public async loadNotificacoes(entidadeId?: string, unidadeId?: string) {
    let result: Template[] = [];
    if(entidadeId || unidadeId || !this.notificacoes?.length) {
      let where: any[] = [["especie", "==", "NOTIFICACAO"]];
      where.push(entidadeId?.length ? ["entidade_id", "==", entidadeId] : (unidadeId?.length ? ["unidade_id", "==", unidadeId] : ["id", "==", null]));
      let query = this.templateDao.query({
        where: where,
        orderBy: [],
        join: [],
        limit: undefined
      });
      result = await query.asPromise();
      this.notificacoes = (query.extra?.notificacoes as TemplateNotificacao[])?.sort((a, b) => a.codigo < b.codigo ? -1 : 1) || [];
      this.notifica = Object.assign(this.notifica, query.extra?.notifica_enviroment || {});
    }
    return result;
  }

  public buildItems(source: Template[], value?: Template[], naoNotificar?: string[]) {
    return this.notificacoes.map(x => {
      let v = value?.find(y => y.codigo == x.codigo);
      let s = source.filter(y => y.codigo == x.codigo && y.id != v?.id).reduce((a: Template | undefined, v: Template) => a = (!a ? v : (a.unidade_id?.length ? a : v)), undefined);
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
      return Object.assign(result, {_metadata: {notificar: !(naoNotificar || []).includes(x.codigo)}});
    });
  }

  public buildNotificar(config: NotificacoesConfig): Notificar[] {
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

  public getStrRegEx(expression: string | RegExp | undefined): string {
    return !expression ? "" : typeof expression == "string" ? 
      expression.split("").map(c => "<>/\\{}[]()-?*.!~".includes(c) ? "\\" + c : c).join("") : 
      (expression as RegExp).toString().replace(/^\//, "").replace(/\/.*?$/, "");
  }

  /* Monta as RegExp start e end de modo a obter: /^(BEFORE)(START)(TAG)(END)(AFTER)$/ */
  public tagSplit(template: string, startTag: TemplateTag | string, endTag: TemplateTag | string): SplitTag | undefined {
    let beforeAfterRegEx = (tag: TemplateTag) => "^(?<BEFORE>[\\s\\S]*?)(?<START>" + this.getStrRegEx(tag.before) + "[\\s\\t\\n]*)(?<TAG>" + this.getStrRegEx(tag.tag) + ")(?<END>[\\s\\t\\n]*" + this.getStrRegEx(tag.after) + ")(?<AFTER>[\\s\\S]*?)$";
    let startRegEx = beforeAfterRegEx(typeof startTag == "string" ? { tag: startTag } : startTag);
    let endRegEx = beforeAfterRegEx(typeof endTag == "string" ? { tag: endTag } : endTag);
    let start = template.match(new RegExp(startRegEx))?.groups;
    if(start) {
      let end = start.AFTER.match(new RegExp(endRegEx))?.groups;
      if(end) {
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

  public getExpressionValue(expression: string, context: IIndexable): any {
    expression = expression.replace("[+]", ".length");
    expression.match(/\[\w+\]/g)?.map(x => x.replace(/^\[/, "").replace(/\]$/, "")).forEach(x => expression = expression.replace("[" + x + "]", "[" + this.getExpressionValue(x, context).toString() + "]"));
    if(expression.toLowerCase().match(TemplateService.EXPRESSION_BOOLEAN)) return expression.toLowerCase() == "true";
    if(expression.match(TemplateService.EXPRESSION_STRING)) return expression.replace(/^\"/, "").replace(/\"$/, "");
    if(expression.match(TemplateService.EXPRESSION_NUMBER)) return +expression;
    if(expression.match(TemplateService.EXPRESSION_VAR)) return this.util.getNested(context, expression);
    return undefined;
  }

  public bondaryTag(tag: SplitTag, regStrBefore: string, regStrAfter: string) {
    let start = tag.before.match(new RegExp("(?<BEFORE>[\\s\\S]*)(?<CONTENT>" + regStrBefore + ")"));
    let end = tag.after.match(new RegExp("(?<CONTENT>" + regStrAfter + ")(?<AFTER>[\\s\\S]*)"));
    tag.start.before = start?.groups?.CONTENT || "";
    tag.before = start?.groups?.BEFORE || "";
    tag.after = end?.groups?.AFTER || "";
    tag.end.after = end?.groups?.CONTENT || "";
  }

  public evaluateOperator(a: any, operator: string, b: any): boolean {
    switch(operator) {
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

  public splitEndTag(after: string, startTag: string, endTag: string): SplitTag | undefined {
    let before: string = "";
    let level: number = 1;
    let next: SplitTag | undefined = undefined;
    while(next = this.tagSplit(after, { tag: new RegExp(this.getStrRegEx(TemplateService.OPEN_TAG) + "((" + startTag + ")|(" + endTag + "))") }, TemplateService.CLOSE_TAG)) {
      level += next.start.tag.toString().indexOf(endTag) >= 0 ? -1 : 1;
      if(!level) { /* Level = 0; significa que o end-for é do respectivo for */
        next.before = before + next.before;
        return next;
      }
      after = next.after;
      before += next.before + next.start.tag + next.content + next.end.tag;
    }
    return undefined;
  }

  public renderTemplate(template: string, context: IIndexable): string {
    let tag: SplitTag | undefined = undefined;
    let statement: RegExpMatchArray | null = null;
    let next: string = template;
    let result: string = "";
    let processParamDrop = (tag?: SplitTag, params?: string) => {
      let parameter: string[] = []; /* Usado penas para iterar os parametros */
      let parameters = (params?.replace(/^;/, "") || "").split(";").reduce((a, v) => (parameter = v.split("="), a[parameter[0]] = parameter[1], a), {} as IIndexable);
      if(tag && parameters.drop && parameters.drop.match(/^\w+$/)) {
        this.bondaryTag(tag, "<" + parameters.drop + ">[\\s\\S]*?$", "^[\\s\\S]*?<\\/" + parameters.drop + ">");
        tag.start.before = "";
        tag.end.after = "";
      }
    };

    while(tag = this.tagSplit(next, TemplateService.OPEN_TAG, TemplateService.CLOSE_TAG)) {
      try {
        if(tag.content.match(TemplateService.EXPRESSION_VAR)) {
          let content = (this.getExpressionValue(tag.content, context) + "").replace(/^undefined$/, "");
          tag.content = this.renderTemplate(content, context);
        } else if(tag.content.match(TemplateService.EXPRESSION_IF)) {
          statement = tag.content.match(TemplateService.STATEMENT_IF); /* if:OPER1=OPER2;par=0;par=0... */
          let aValue = this.getExpressionValue(statement?.groups?.EXP_A || "", context);
          let bValue = this.getExpressionValue(statement?.groups?.EXP_B || "", context);
          let ifThen = this.evaluateOperator(aValue, statement?.groups?.OPER || "", bValue);
          /* Processa o parametro drop caso ele exista, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
          processParamDrop(tag, statement?.groups?.PARS);
          /* Encontra o end-if */
          let endIfTag = this.splitEndTag(tag.after, "if:", "end-if");
          if(endIfTag) {
            /* Processa o parametro drop caso ele exista na tag de fechamento, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
            processParamDrop(endIfTag, endIfTag.content?.replace(/^;/, ""));
            /* O content da tag só será renderizado caso ifThen seja true */
            tag.content = ifThen ? this.renderTemplate(endIfTag.before, context) : "";
            tag.after = endIfTag.after;
          } else {
            throw new Error("o if não possui um repectivo end-if");
          }
        } else if(tag.content.match(TemplateService.EXPRESSION_FOR)) {
          statement = tag.content.match(TemplateService.STATEMENT_FOR); /* for:EXP[(t..)x..0|0..x(..t)|EACH];par=0;par=0... */
          /* Processa o parametro drop caso ele exista, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
          processParamDrop(tag, statement?.groups?.PARS);
          /* Encontra o end-for */
          let endForTag = this.splitEndTag(tag.after, "for:", "end-for");
          if(endForTag) {
            /* Processa o parametro drop caso ele exista na tag de fechamento, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
            processParamDrop(endForTag, endForTag.content?.replace(/^;/, ""));
            /* O content da tag será todo o conteúdo repetível do for e o after será o after do end-for */
            tag.content = "";
            tag.after = endForTag.after;
            /* Verifica se a variável de iteração já existe no contexto */
            if(context[statement?.groups?.EACH || statement?.groups?.INDEX || ""]) throw new Error("Variável de contexto já existe no contexto atual");
            /* Itera os elementos do for */
            let elements = this.getExpressionValue(statement?.groups?.EXP || "", context) as any[];
            let each = !!statement?.groups?.EACH?.match(/^[a-zA-Z]\w+$/);
            let asc = each || !!statement?.groups?.START?.match(/^\d+$/);
            let startFor = each ? 0 : asc ? +statement!.groups!.START : elements.length;
            let endFor = each ? elements.length : asc ? elements.length : +statement!.groups!.END;
            for(let index = startFor; asc ? index < endFor : index > endFor; asc ? index++ : index--) {
              let current = elements[index];
              let forContext: IIndexable = Object.assign({}, context);
              /* Alimenta contexto com variaveis do for */
              if(each) {
                forContext[statement!.groups!.EACH] = current;
              } else {
                let total = asc && statement?.groups?.END ? statement.groups.END : !asc && statement?.groups?.START ? statement.groups.START : undefined;
                if(total) forContext[total] = elements.length;
                forContext[statement!.groups!.INDEX] = index;
              }
              tag.content += this.renderTemplate(endForTag.before, forContext);
            }
          } else {
            throw new Error("o for não possui um repectivo end-for");
          }
        }
      } catch (error) {
        tag.content = "(ERRO)";
      } finally {
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


}
