import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { IIndexable } from 'src/app/models/base.model';
import { DialogService } from 'src/app/services/dialog.service';
import { Editor, EditorEvent, RawEditorOptions } from 'tinymce';
import { InputBase, LabelPosition } from "../input-base";
import { TemplateDataset, TemplateService, VariableTemplate } from 'src/app/modules/uteis/templates/template.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { TreeNode } from 'primeng/api';
import { TreeNodeSelectEvent } from 'primeng/tree';
import { GlobalsService } from 'src/app/services/globals.service';

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
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() canEditTemplate: boolean = false;
  @Input() dataset?: TemplateDataset[];
  @Input() required?: string;
  @Input() set template(value: string | undefined) {
    if(this._template != value) {
      this._template = value;
      if(this.viewInit) this.updateEditor();
    }
  }
  public gb: GlobalsService = this.injector.get(GlobalsService);
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
  @Input() set value(newValue: string) {
    if(this.isEditingTemplate) {
      this._editingTemplate = newValue;
    } else if (this._value != newValue) {
      this._value = newValue;
      this.valueChange.emit(this._value);
      if (this.control && this.control.value != this._value) {
        this.control.setValue(this._value);
      }
      this.detectChanges();
    }
  };
  get value(): string {
    return this.isEditingTemplate ? (this._editingTemplate || '') : (this._value || '');
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

  public toolbars: string[] = [
    'customEditTemplateButton',
    'customDoneEditTemplateButton customCancelEditTemplateButton | customAddMacroTemplate customHelpTemplate | undo redo | bold italic underline strikethrough | fontselect fontsize formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample templates | ltr rtl visualblocks code',
    // restore lock/unlock buttons in dataset toolbar
    'customAddMacroTemplate customHelpTemplate | undo redo | customLockTemplate customUnlockTemplate | bold italic underline strikethrough | fontselect fontsize formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample templates | ltr rtl visualblocks code',
    'undo redo | bold italic underline strikethrough | fontselect fontsize formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media link anchor codesample templates | ltr rtl visualblocks code'
  ];

  public editor?: Editor;
  public dialog: DialogService;
  public templateService: TemplateService;
  public lookup: LookupService;
  public plugins: string = 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons';
  public editorConfig: RawEditorOptions = {
    imagetools_cors_hosts: ['picsum.photos'],
    toolbar_sticky: true,
    image_advtab: true,
    base_url: this.gb.baseURL + '/tinymce',
    suffix: '.min',
    zindex: 500001,
    /*toolbar: [
      'customEditTemplateButton',
      'customDoneEditTemplateButton customCancelEditTemplateButton | customAddMacroTemplate customHelpTemplate | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media templates link anchor codesample | ltr rtl visualblocks',
      'customAddMacroTemplate customHelpTemplate | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media templates link anchor codesample | ltr rtl visualblocks',
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media templates link anchor codesample | ltr rtl visualblocks'
    ],*/
    menubar: false,
    statusbar: false,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
    table_class_list: [
      {title: 'Sem classe', value: ''},
      {title: 'Padrão', value: 'table table-sm'},
      {title: 'Sem bordas', value: 'table table-borderless table-sm'},
      {title: 'Com bordas', value: 'table table-sm table-bordered'},
      {title: 'Zebrada', value: 'table table-striped table-sm'}
    ],
    setup: ((editor: Editor) => {
      this.editor = editor;
      editor.on('init', () => {
        if (this.isDisabled) editor.mode.set("readonly");  
      }),
      /* Hack para manter compatibilidade entre o @tinymce/tinymce-angular 4.2.4 e o tinymce 6.3.2 */
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
      /* Botões de bloqueio e desbloqueio de conteúdo */
      editor.ui.registry.addButton('customLockTemplate', {
        icon: 'lock',
        tooltip: "Bloqueia a região selecionada",
        onAction: (_) => {
          let content = editor.selection.getContent({'format':'html'});
          let timestamp = (new Date()).getTime(); 
          let key = this.util.md5("" + content + timestamp);
          let new_selection_content = '<div class="mceNonEditable" style="display:inline-block;" data-lock-timestamp="' + timestamp + '" data-lock-key="' + key + '">' + content + '</div>';
          editor.execCommand('insertHTML', false, new_selection_content);
        },
        onSetup: (buttonApi) => {
          //@ts-ignore
          const editorEventCallback = (eventApi: EditorEvent<NodeChangeEvent>) => buttonApi.setEnabled(eventApi.element.className != 'mceNonEditable');
          editor.on('NodeChange', editorEventCallback);
          return (buttonApi) => editor.off('NodeChange', editorEventCallback);
        }
      });
      editor.ui.registry.addButton('customUnlockTemplate', {
        icon: 'unlock',
        tooltip: "Desbloqueia a região selecionada",
        onAction: (_) => {
          let lockOpen = /^<div\sclass="mceNonEditable".*?>/;
          let lockClose = /<\/div>$/;
          let content = editor.selection.getContent({'format':'html'});
          let new_selection_content = content.replace(lockOpen, '').replace(lockClose, '');
          editor.execCommand('insertHTML', false, new_selection_content);
        },
        onSetup: (buttonApi) => {
          //@ts-ignore
          const editorEventCallback = (eventApi: EditorEvent<NodeChangeEvent>) => buttonApi.setEnabled(eventApi.element.className == 'mceNonEditable');
          editor.on('NodeChange', editorEventCallback);
          return (buttonApi) => editor.off('NodeChange', editorEventCallback);
        }
      });
    }).bind(this),
    /*init_instance_callback: ((editor: Editor) => {
      this.updateToolbars();
    }).bind(this)*/
  };

  public listas: LookupItem[] = [];
  public variaveis: TreeNode[] = [];
  public tipoComparadorUm: string | null = '';
  public tipoComparadorDois: string | null = '';


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
  public operatorForm: FormGroup;
  public blockForForm: FormGroup;
  public selectedVariable!: TreeNode;
  public expressaoIf: string = "{{if}}{{end-if}}"
  public expressaoFor: string = "{{for}}{{end-for}}"
  

  constructor(public injector: Injector) {
    super(injector);
    this.lookup = this.injector.get<LookupService>(LookupService);
    this.dialog = injector.get<DialogService>(DialogService);
    this.templateService = injector.get<TemplateService>(TemplateService);
    this._value = "";

    this.operatorForm = this.fb.group({
      operador: [''],
      comparadorUmTipo: ['', [Validators.required]],
      comparadorUmValor: [''],
      comparadorDoisTipo: ['', [Validators.required]],
      comparadorDoisValor: [''],
    }, this.cdRef);

    this.blockForForm = this.fb.group({
      tipo: ['indice'],
      variavel: ['item'],
      variavelIndice: ['x'],
      lista: ['', [Validators.required]],
    }, this.cdRef );
  }

  validarVariaveis(formGroup: FormGroup) {
    const tipo = formGroup.get('tipo')?.value;
    const variavel = formGroup.get('variavel');
    const variavelIndice = formGroup.get('variavelIndice');
  
    if (tipo === 'variavel') {
      variavel?.setValidators([Validators.required]);
    } else {    
      variavel?.clearValidators();
    }
  
    if (tipo === 'indice') {
      variavelIndice?.setValidators([Validators.required]);
    } else {
      variavelIndice?.clearValidators();
    }  
    variavel?.updateValueAndValidity();
    variavelIndice?.updateValueAndValidity();
  }

  public onEditTemplateClick() {
    this._editingTemplate = this.template;
    this.cdRef.detectChanges();
    //this.updateToolbars();
  }

  public onDoneTemplateClick() {
    this.template = this._editingTemplate;
    this._editingTemplate = undefined;
    this.updateEditor();
    this.cdRef.detectChanges();
    //this.updateToolbars();
  }

  public onCancelTemplateClick() {
    this._editingTemplate = undefined;
    this.updateEditor();
    this.cdRef.detectChanges();
    //this.updateToolbars();
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

  public get toolbar(): string {
    if(this.isEditingTemplate) {
      return this.toolbars[1];
    } else if(this.hasTemplate && this.canEditTemplate) {
      return this.toolbars[0];
    } else if(this.hasDataset) {
      return this.toolbars[2];
    } else if(!this.hasTemplate && !this.disabled) {
      return this.toolbars[3];
    } else {
      return "";
    }
  }

  public get isEditingTemplate(): boolean {
    return this._editingTemplate != undefined;
  }

  public get isDisabled(): boolean {
    //tinyMCE.activeEditor.controlManager.get('disable_save').setDisabled(true) ;
    return this.disabled != undefined || (this.canEditTemplate && this.template != undefined && !this.isEditingTemplate);
  }

  public updateEditor(text?: string) {
    this.value = this.template != undefined && this.datasource != undefined ? 
      this.templateService.renderTemplate(this.template, this.datasource) : 
      text || "";
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    super.ngOnInit();    
    if(this.dataset) this.variaveis = this.convertArrayToTreeNodes(this.dataset)
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.control) {
      this.control.valueChanges.subscribe(newValue => {
        if (this.value != newValue) this.updateEditor(newValue);
      });
      this.value = this.control.value;
    }
    this.updateEditor();
    this.operatorForm.valueChanges.subscribe(o => {
      const tipoUm = o.comparadorUmTipo;
      const tipoDois = o.comparadorDoisTipo;
      let valorUm = '';
      let valorDois = '';
      if(tipoUm == 'list') valorUm = `${o.comparadorUmValor}[+]`;
      if(tipoUm == 'string') valorUm = `"${o.comparadorUmValor}"`;
      if(tipoUm == 'number' || tipoUm == 'boolean') valorUm = `${o.comparadorUmValor}`;
      if(tipoUm == 'variable') valorUm = `${o.comparadorUmValor.data?.path}`;
      if(tipoDois == 'list') valorDois = `${o.comparadorDoisValor}[+]`;
      if(tipoDois == 'string') valorDois = `"${o.comparadorDoisValor}"`;
      if(tipoDois == 'number' || tipoDois == 'boolean') valorDois = `${o.comparadorDoisValor}`;
      if(tipoDois == 'variable') valorDois = `${o.comparadorDoisValor.data?.path}`;
      this.expressaoIf = `{{if:${valorUm}${o.operador}${valorDois}}}{{end-if}}`;
    });
    this.blockForForm.valueChanges.subscribe(b => {        
      if(b.tipo == 'indice'){
        this.expressaoFor = `{{for:${b.lista}[0..${b.variavelIndice}..t]}} {{end-for}}`;
      } else {
        this.expressaoFor = `{{for:${b.lista}[${b.variavel}]}} {{end-for}}`;
      }
    })
  }

  getVariableString(): string {
    return this.selectedVariable ? `{{${this.selectedVariable.data?.path}}}` : '';
  }

  insertVariable() {
    this.editor?.insertContent(`{{${this.selectedVariable.data.path}}}`); 
    this.dialog.close();   
  }

  nodeSelect(event: any) {
    this.selectedVariable = event.node
  }

  insertBlockFor(){
    this.editor?.insertContent(this.expressaoFor);   
    this.dialog.close();   
  }

  insertOperator(){
    this.editor?.insertContent(this.expressaoIf);   
    this.dialog.close();   
  }
  
  convertToTreeNode(templateDataset: TemplateDataset, parentPath?: string): TreeNode {
    const currentPath = parentPath ? parentPath + "." + templateDataset.field : templateDataset.field;
    const treeNode: TreeNode = {
      label: templateDataset.label,
      data: {path: currentPath},
      type: templateDataset.type,
      children: [],
      selectable: templateDataset.type && !["ARRAY", "OBJECT"].includes(templateDataset.type)
    };
  
    if (templateDataset.fields) {
      treeNode.children = this.convertArrayToTreeNodes(templateDataset.fields, currentPath);
    }
    if (templateDataset.type === "ARRAY") this.listas.push({ key: templateDataset.field, value: templateDataset.label });

  
    return treeNode;
  }

  convertArrayToTreeNodes(templateDatasets: TemplateDataset[], parentPath?: string): TreeNode[] {
    return templateDatasets.map(dataset => this.convertToTreeNode(dataset, parentPath));
  }

  changeTypeOperator(comparador: number){
    if(comparador == 1) this.tipoComparadorUm = this.operatorForm.controls.comparadorUmTipo.value;
    if(comparador == 2) this.tipoComparadorDois = this.operatorForm.controls.comparadorDoisTipo.value;
  }

  selectVariable(event: TreeNodeSelectEvent, input: number){
    if(input == 1) this.operatorForm.controls.comparadorUmValor.patchValue(event.node);
    if(input == 2) this.operatorForm.controls.comparadorDoisValor.patchValue(event.node);     
  }
}
