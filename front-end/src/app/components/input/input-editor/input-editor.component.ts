import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from "@angular/forms";
import { EditorComponent } from '@tinymce/tinymce-angular';
import { IIndexable } from 'src/app/models/base.model';
import { Editor } from 'tinymce';
import { InputBase, LabelPosition } from "../input-base";

export type TemplateFieldType = "VALUE" | "OBJECT" | "ARRAY";

export type TemplateDataset = {
  field: string,
  label: string,
  type?: TemplateFieldType,
  fields?: TemplateDataset[]
}

type TemplateTag = {
  before?: string | RegExp,
  tag: string | RegExp,
  after?: string | RegExp,
}

type SplitTag = {
  before: string,
  start: TemplateTag,
  content: string,
  end: TemplateTag,
  after: string 
}

@Component({
  selector: 'input-editor',
  templateUrl: './input-editor.component.html',
  styleUrls: ['./input-editor.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputEditorComponent extends InputBase implements OnInit {
  @ViewChild('editor') editor?: EditorComponent;
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Input() hostClass: string = "";
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() set value(value: string) {
    if (this._value != value) {
      this._value = value;
      this.valueChange.emit(value);
      if (this.control && this.control.value != value) {
        this.control.setValue(value);
      }
      this.cdRef.detectChanges();
    }
  };
  get value(): string {
    return this._value;
  }
  @Output() valueChange = new EventEmitter<string>();
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() template?: string;
  @Input() dataset?: TemplateDataset[];
  @Input() datasource?: any;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set size(value: number) {
    this.setSize(value);
  }
  get size(): number {
    return this.getSize();
  }

  /* 
  Valor:
    {{valor}}
    {{valor.contexto[x]}}
  For: 
    {{for:valor[0..x]}} ... {{end-for:valor[0..x]}}
    {{for:valor[t..x..0];drop=tr}} ... {{end-for:valor[t..x..0];drop=tr}}
  If:
    {{if:valor="Texto"}} ... {{end-if:valor="Texto"}}
    {{if:valor<>0}} ... {{end-if:valor<>0}}
  */
  public static OPEN_TAG = "{{";
  public static CLOSE_TAG = "}}";
  public static EXPRESSION_BOOLEAN = /^((true)|(false))$/;
  public static EXPRESSION_NUMBER = /^[0-9,\.]+$/;
  public static EXPRESSION_VAR = /^[a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*$/;
  public static EXPRESSION_FOR = /^for:([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*)\[((\d+\.\.[a-zA-Z]\w*?(\.\.[a-zA-Z]\w*?)?)|(([a-zA-Z]\w*?\.\.)?[a-zA-Z]\w*?\.\.\d+)|([a-zA-Z]\w*?))\](;.+?\=.+?)*$/;
  public static STATEMENT_FOR = /^for:(?<EXP>([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*))\[(((?<START>\w+?)\.\.(?<INDEX>\w*?)(\.\.(?<END>\w+?))?)|(%(?<EACH>\w+?)%))\](?<PARS>(;.+?\=.+?)*)$/;
  public static STATEMENT_FOR_WITHOUT_PARS = /^(?<STATMENT>for:\w+\[.+\])/;
  public static PARAMETER_DROP = "drop";

  public editorConfig = {
    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    toolbar: 'customRefreshTemplate | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    imagetools_cors_hosts: ['picsum.photos'],
    toolbar_sticky: true,
    image_advtab: true,
    menubar: false,
    statusbar: false,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    /*skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'*/
    setup: ((editor: Editor) => {
      editor.ui.registry.addButton('customRefreshTemplate', {
        text: 'Template',
        onAction: (_) => this.value = this.renderTemplate(this.template || "", this.datasource || {}) //;;editor.insertContent(`&nbsp;<strong>It's my button!</strong>&nbsp;`)
      });
    }).bind(this)
  };

  constructor(public injector: Injector) {
    super(injector);
    this._value = "";
  }

  public updateEditor() {

  }

  public getStrRegEx(expression: string | RegExp | undefined): string {
    return !expression ? "" : typeof expression == "string" ? 
      expression.split("").map(c => "<>/\\{}[]()-?*.!~".includes(c) ? "\\" + c : c).join("") : 
      (expression as RegExp).toString().replace(/^\//, "").replace(/\/.*?$/, "");
  }

  public tagSplit(template: string, startTag: TemplateTag | string, endTag: TemplateTag | string): SplitTag | undefined {
    /* Monta as RegExp start e end de modo a obter: /^(.*?)(BEFORE)(TAG)(AFTER)(.*?)$/ 
    [1] antes do before
    [2] before
    [3] tag
    [4] after
    [5] depois do after
    */
    let beforeAfterRegEx = (tag: TemplateTag) => "^([\\s\\S]*?)(" + this.getStrRegEx(tag.before) + "[\\s\\t\\n]*)(" + this.getStrRegEx(tag.tag) + ")([\\s\\t\\n]*" + this.getStrRegEx(tag.after) + ")([\\s\\S]*?)$";
    let startRegEx = beforeAfterRegEx(typeof startTag == "string" ? { tag: startTag } : startTag);
    let endRegEx = beforeAfterRegEx(typeof endTag == "string" ? { tag: endTag } : endTag);
    let start = template.match(new RegExp(startRegEx));
    if(start) {
      let end = (start[5] as string).match(new RegExp(endRegEx));
      if(end) {
        return {
          before: start[1],
          start: { before: start[2], tag: start[3], after: start[4] },
          content: end[1],
          end: { before: end[2], tag: end[3], after: end[4] },
          after: end[5]
        };
      } 
    }
    return undefined;
  }

  public getExpressionValue(expression: string, context: IIndexable): any {
    expression.match(/\[\w+\]/g)?.map(x => x.replace(/^\[/, "").replace(/\]$/, "")).forEach(x => expression = expression.replace("[" + x + "]", "[" + this.getExpressionValue(x, context).toString() + "]"));
    if(expression.toLowerCase().match(InputEditorComponent.EXPRESSION_BOOLEAN)) return expression.toLowerCase() == "true";
    if(expression.match(InputEditorComponent.EXPRESSION_NUMBER)) return +expression;
    if(expression.match(InputEditorComponent.EXPRESSION_VAR)) return this.util.getNested(context, expression);
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

  public renderTemplate(template: string, context: IIndexable): string {
    let tag: SplitTag | undefined = undefined;
    let next: string = template;
    let result: string = "";
   
    while(tag = this.tagSplit(next, InputEditorComponent.OPEN_TAG, InputEditorComponent.CLOSE_TAG)) {
      try {
        if(tag.content.match(InputEditorComponent.EXPRESSION_VAR)) {
          tag.content = (this.getExpressionValue(tag.content, context) + "").replace(/^undefined$/, "");
        } else if(tag.content.match(InputEditorComponent.EXPRESSION_FOR)) {
          let statement = tag.content.match(InputEditorComponent.STATEMENT_FOR); /* for:EXP[(t..)x..0|0..x(..t)|EACH];par=0;par=0... */
          let parameter: string[] = []; /* Usado penas para iterar os parametros */
          let forParameters = (statement?.groups?.PARS?.replace(/^;/, "") || "").split(";").reduce((a, v) => (parameter = v.split("="), a[parameter[0]] = parameter[1], a), {} as IIndexable);
          /* Caso tenho o parametro drop=TAG, atualiza o objeto tag para considerar as tags que contem o comando for */
          if(forParameters.drop && forParameters.drop.match(/^\w+$/)) {
            this.bondaryTag(tag, "<" + forParameters.drop + ">[\\s\\S]*?$", "^[\\s\\S]*?<\\/" + forParameters.drop + ">");
            tag.start.before = "";
            tag.end.after = "";
          }
          /* Encontra o end-for */
          let forWithoutPars = tag.content.match(InputEditorComponent.STATEMENT_FOR_WITHOUT_PARS)?.groups?.STATMENT || "";
          let endForTag = this.tagSplit(tag.after, InputEditorComponent.OPEN_TAG + "end-" + forWithoutPars, InputEditorComponent.CLOSE_TAG);
          if(endForTag) {
            let endForParameters = (endForTag.content.replace(/^;/, "") || "").split(";").reduce((a, v) => (parameter = v.split("="), a[parameter[0]] = parameter[1], a), {} as IIndexable);
            /* Caso tenho o parametro drop=TAG, atualiza o objeto tag para considerar as tags que contem o comando for */
            if(endForParameters.drop && endForParameters.drop.match(/^\w+$/)) this.bondaryTag(endForTag, "<" + endForParameters.drop + ">[\\s\\S]*?$", "^[\\s\\S]*?<\\/" + endForParameters.drop + ">");
            /* O content da tag será todo o conteúdo repetido do for e o after será o after do end-for */
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
            throw new Error("o for não possui um repectivo end-for com mesma configuração");
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

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.control) {
      this.control.valueChanges.subscribe(newValue => {
        if (this.value != newValue) {
          this.value = newValue;
          this.updateEditor();
        }
      });
      this.value = this.control.value;
    }
    this.updateEditor();
  }

}
