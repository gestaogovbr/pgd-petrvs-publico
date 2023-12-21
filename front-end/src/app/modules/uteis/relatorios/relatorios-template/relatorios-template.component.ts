import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { TemplateDataset, TemplateService } from "../../templates/template.service";
import { HasRelatorio } from "src/app/models/relatorio.model";
import { Template } from "src/app/models/template.model";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'relatorios-template',
  templateUrl: './relatorios-template.component.html',
  styleUrls: ['./relatorios-template.component.scss']
})
export class RelatoriosTemplateComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() entidadeId?: string;
  @Input() set entity(value: HasRelatorio) { super.entity = value; } get entity(): HasRelatorio { return super.entity; }
  
  public templateService: TemplateService;
  public items: Template[] = [];
  public dataset?: TemplateDataset[];
  public form: FormGroup;
  public loadingRelatorios: boolean = false;
  public loadingDataset: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<TemplateDaoService>(TemplateDaoService);
    this.templateService = injector.get<TemplateService>(TemplateService);
    this.code = "MOD_REL_TEMP";
    this.form = this.fh.FormBuilder({
      codigo: { default: "" },
      titulo: { default: "" },
      conteudo: { default: "" }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.entidadeId = this.entidadeId || this.queryParams?.entidadeId;
  }
 
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadRelatorios(this.entity);
  }

  public loadRelatorios(entity: HasRelatorio) {
    (async () => {
      this.loadingRelatorios = true;
      this.cdRef.detectChanges();
      try {
        this.items = await this.templateService.loadRelatorios(this.entidadeId);
      } finally {
        this.loadingRelatorios = false;
        this.cdRef.detectChanges();
      }
    })();
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(this.entidadeId?.length) result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.grid?.onEditItem.bind(this.grid) });
    return result;
  }

  public async loadTemplate(form: FormGroup, row: any) {
    this.loadingDataset = true;
    this.dataset = await this.templateService.dataset("RELATORIO", row.codigo); 
    
    form.controls.codigo.setValue(row.codigo);
    form.controls.titulo.setValue(row.titulo);
    form.controls.conteudo.setValue(row.conteudo);
    this.loadingDataset = false;
    this.cdRef.detectChanges();
  }

 

  public async saveTemplate(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      let already = (this.entidadeId?.length && this.entidadeId == row.entidade_id);
      if(already) {
        row.codigo = form.controls.codigo.value;
        row.titulo = form.controls.titulo.value;
        row.conteudo = form.controls.conteudo.value;
        row.dataset = this.dataset;
        row._status = row._status == "ADD" ? "ADD" : "EDIT";
        await this.dao!.save(row, this.join);
      } else {
        let template = new Template({
          id: this.dao!.generateUuid(),
          codigo: form.controls.codigo.value,
          titulo: form.controls.titulo.value,
          conteudo: form.controls.conteudo.value,
          dataset: this.dataset,
          especie: "RELATORIO",
          entidade_id: this.entidadeId || null,
          _status: "ADD",
        });
        this.entity!.relatorios_templates = this.entity!.relatorios_templates || [];
        this.entity!.relatorios_templates!.push(template);
        this.cdRef.detectChanges();
      } 
    }
    return result;
  }
  
}