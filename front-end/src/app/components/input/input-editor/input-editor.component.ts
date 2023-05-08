import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from "@angular/forms";
import { EditorComponent } from '@tinymce/tinymce-angular';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { DialogService } from 'src/app/services/dialog.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { Editor } from 'tinymce';
import { InputBase, LabelPosition } from "../input-base";

export type TemplateFieldType = "VALUE" | "DATE" | "DATETIME" | "TEMPLATE" | "OBJECT" | "ARRAY";

export type TemplateDataset = {
  field: string,
  label: string,
  type?: TemplateFieldType,
  dao?: DaoBaseService<Base>,
  fields?: TemplateDataset[],
  lookup?: LookupItem[]
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

type VariableTemplate = { 
  level: number, 
  variable: string, 
  label: string
};

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
  @ViewChild('helpTemplate') helpTemplate?: TemplateRef<any>;
  @ViewChild('addMacroTemplate') addMacroTemplate?: TemplateRef<any>;
  @ViewChild('editor') editorComponent?: EditorComponent;
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() valueChange = new EventEmitter<string>();
  @Input() hostClass: string = "";
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() canEditTemplate: boolean = false;
  @Input() dataset?: TemplateDataset[];
  @Input() set template(value: string | undefined) {
    if(this._template != value) {
      this._template = value;
      if(this.viewInit) this.updateEditor();
    }
  }
  get template(): string | undefined {
    return this._template;
  }
  @Input() set datasource(value: any) {
    if(this._datasource != value) {
      this._datasource = value;
      if(this.viewInit) this.updateEditor();
    }
  }
  get datasource(): any {
    return this._datasource;
  }
  @Input() set value(value: string) {
    if(this.isEditingTemplate) {
      this._editingTemplate = value;
    } else if (this._value != value) {
      this._value = value;
      this.valueChange.emit(value);
      if (this.control && this.control.value != value) {
        this.control.setValue(value);
      }
      this.detectChanges();
    }
  };
  get value(): string {
    return this.isEditingTemplate ? this._editingTemplate : this._value;
  }
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

  public editor?: Editor;
  public dialog: DialogService;
  public editorConfig = {
    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    toolbar: [
      'customEditTemplateButton',
      'customDoneEditTemplateButton customCancelEditTemplateButton | customAddMacroTemplate customHelpTemplate | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl visualblocks',
      'customAddMacroTemplate customHelpTemplate | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl visualblocks',
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl visualblocks'
    ],
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
    setup: ((editor: Editor) => {
      this.editor = editor;
      /* Hack para manter compatibilidade entre o @tinymce/tinymce-angular 4.2.4 e o tinymce 6.3.2 */
      (editor as IIndexable)['setMode'] =  (mode: any) => editor.mode.set(mode);      
      /* Botões personalizados para edição do template */
      editor.ui.registry.addButton('customDoneEditTemplateButton', {
        icon: 'checkmark',
        text: 'Concluir',
        tooltip: "Concluir edição do template",
        onAction: (_) => this.onDoneTemplateClick()
      });
      editor.ui.registry.addButton('customCancelEditTemplateButton', {
        icon: 'close',
        text: 'Cancelar',
        tooltip: "Cancelar edição do template",
        onAction: (_) => this.onCancelTemplateClick()
      });
      editor.ui.registry.addButton('customEditTemplateButton', {
        icon: 'edit-block',
        text: 'Editar',
        tooltip: "Editar template",
        onAction: (_) => this.onEditTemplateClick()
      });
      /* Botoes especiais */
      editor.ui.registry.addButton('customAddMacroTemplate', {
        icon: 'code-sample',
        tooltip: "Inserir macro (valores dinâmicos)",
        onAction: (_) => (async () => (await this.dialog.template({ title: "Adicionar macro", modalWidth: 500 }, this.addMacroTemplate!, [{
          label: "Fechar",
          color: "btn btn-outline-danger",
        }]).asPromise()).dialog.close())()
      });
      editor.ui.registry.addButton('customHelpTemplate', {
        icon: 'info',
        tooltip: "Ajuda sobre como utilizar variáveis",
        onAction: (_) => (async () => (await this.dialog.template({ title: "Ajuda sobre variáveis", modalWidth: 800 }, this.helpTemplate!, [{
          label: "Fechar",
          color: "btn btn-outline-danger",
        }]).asPromise()).dialog.close())()
      });
    }).bind(this),
    init_instance_callback: ((editor: Editor) => {
      this.updateToolbars();
    }).bind(this)
  };
  public get variables(): VariableTemplate[] {
    let result: VariableTemplate[] = [];
    const recursive = (vars: TemplateDataset[], level: number, prefix: string) => {
      for(let variable of vars) {
        result.push({level: level, variable: prefix + variable.field + (variable.type == "ARRAY" ? "[]" : ""), label: variable.label});
        if(variable.type == "ARRAY") recursive(variable.fields || [], level+1, "[].");
        if(variable.type == "OBJECT") recursive(variable.fields || [], level+1, ".");
      }
    };
    recursive(this.dataset || [], 0, "");
    if(JSON.stringify(result) != JSON.stringify(this._variables)) this._variables = result;
    return result;
  }

  private _editingTemplate?: string;
  private _template?: string;
  private _datasource?: any; 
  private _variables: VariableTemplate[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dialog = injector.get<DialogService>(DialogService);
    this._value = "";
  }

  public onEditTemplateClick() {
    this._editingTemplate = this.template;
    this.cdRef.detectChanges();
    this.updateToolbars();
  }

  public onDoneTemplateClick() {
    this.template = this._editingTemplate;
    this._editingTemplate = undefined;
    this.updateEditor();
    this.cdRef.detectChanges();
    this.updateToolbars();
  }

  public onCancelTemplateClick() {
    this._editingTemplate = undefined;
    this.updateEditor();
    this.cdRef.detectChanges();
    this.updateToolbars();
  }

  public get hasTemplate(): boolean {
    return this.template != undefined;
  }

  public get hasDataset(): boolean {
    return this.dataset != undefined;
  }

  /*public get toolbarButtons(): ToolbarButton[] {
    return this.isEditingTemplate ? this.toolbarEditingTemplate : this.toolbarEditTemplate;
  }*/

  public updateToolbars() {
    const enable = (element: JQuery<HTMLElement>) => {
      element.removeClass('tox-tbtn--disabled');
      element.find(".tox-tbtn--disabled").removeClass('tox-tbtn--disabled');
      element.find("[aria-disabled=true]").attr("aria-disabled", "false");
    };
    let toolbarEdit = $(this.editor!.editorContainer).find(".tox-toolbar-overlord [role=group]:eq(0)").toggle();
    let toolbarEditing = $(this.editor!.editorContainer).find(".tox-toolbar-overlord [role=group]:eq(1)").toggle();
    let toolbarDataset = $(this.editor!.editorContainer).find(".tox-toolbar-overlord [role=group]:eq(2)").toggle();
    let toolbarDefault = $(this.editor!.editorContainer).find(".tox-toolbar-overlord [role=group]:eq(3)").toggle();
    toolbarEdit.hide();
    toolbarEditing.hide();
    toolbarDataset.hide();
    toolbarDefault.hide();
    if(this.isEditingTemplate) {
      toolbarEditing.show();
      enable(toolbarEditing);
    } else if(this.hasTemplate && this.canEditTemplate) {
      toolbarEdit.show();
      enable(toolbarEdit);
    } else if(this.hasDataset) {
      toolbarDataset.show();
    } else if(!this.hasTemplate && !this.disabled) {
      toolbarDefault.show();
    } 
  }

  public get isEditingTemplate(): boolean {
    return this._editingTemplate != undefined;
  }

  public get isDisabled(): boolean {
    //tinyMCE.activeEditor.controlManager.get('disable_save').setDisabled(true) ;
    return this.disabled != undefined || (this.template != undefined && !this.isEditingTemplate);
  }

  public updateEditor() {
    if(this.template != undefined && this.datasource != undefined) {
      this.value = this.renderTemplate(this.template, this.datasource);
      this.cdRef.detectChanges();
    }
  }

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
    if(expression.toLowerCase().match(InputEditorComponent.EXPRESSION_BOOLEAN)) return expression.toLowerCase() == "true";
    if(expression.match(InputEditorComponent.EXPRESSION_STRING)) return expression.replace(/^\"/, "").replace(/\"$/, "");
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
    while(next = this.tagSplit(after, { tag: new RegExp(this.getStrRegEx(InputEditorComponent.OPEN_TAG) + "((" + startTag + ")|(" + endTag + "))") }, InputEditorComponent.CLOSE_TAG)) {
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

    while(tag = this.tagSplit(next, InputEditorComponent.OPEN_TAG, InputEditorComponent.CLOSE_TAG)) {
      try {
        if(tag.content.match(InputEditorComponent.EXPRESSION_VAR)) {
          let content = (this.getExpressionValue(tag.content, context) + "").replace(/^undefined$/, "");
          tag.content = this.renderTemplate(content, context);
        } else if(tag.content.match(InputEditorComponent.EXPRESSION_IF)) {
          statement = tag.content.match(InputEditorComponent.STATEMENT_IF); /* if:OPER1=OPER2;par=0;par=0... */
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
        } else if(tag.content.match(InputEditorComponent.EXPRESSION_FOR)) {
          statement = tag.content.match(InputEditorComponent.STATEMENT_FOR); /* for:EXP[(t..)x..0|0..x(..t)|EACH];par=0;par=0... */
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
