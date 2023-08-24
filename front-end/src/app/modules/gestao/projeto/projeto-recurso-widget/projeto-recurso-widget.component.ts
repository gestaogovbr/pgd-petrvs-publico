import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { SeparatorComponent } from 'src/app/components/separator/separator.component';
import { MaterialServicoDaoService } from 'src/app/dao/material-servico-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ProjetoRecurso, ProjetoRecursoTipo } from 'src/app/models/projeto-recurso.model';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { ProjetoService } from '../projeto.service';

@Component({
  selector: 'projeto-recurso-widget',
  templateUrl: './projeto-recurso-widget.component.html',
  styleUrls: ['./projeto-recurso-widget.component.scss']
})
export class ProjetoRecursoWidgetComponent implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("novoRecurso", { static: false }) public novoRecurso?: SeparatorComponent;
  @ViewChild("selectRecurso", { static: false }) public selectRecurso?: InputSelectComponent;
  @ViewChild("usuario", { static: false }) public usuario?: InputSearchComponent;
  @ViewChild("unidade", { static: false }) public unidade?: InputSearchComponent;
  @ViewChild("materialServico", { static: false }) public materialServico?: InputSearchComponent;
  @ViewChild("tipoRecurso", { static: false }) public tipoRecurso?: InputSelectComponent;
  @Input() control: FormControl = new FormControl();
  @Input() recursos: LookupItem[] = [];
  @Input() change?: (tipo: ProjetoRecursoTipo | undefined) => void;

  public form: FormGroup;
  public fh: FormHelperService;
  public cdRef: ChangeDetectorRef;
  public lookup: LookupService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public projetoService: ProjetoService;
  public materialServicoDao: MaterialServicoDaoService;

  constructor(public injector: Injector) {
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.lookup = injector.get<LookupService>(LookupService);
    this.fh = injector.get<FormHelperService>(FormHelperService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.materialServicoDao = injector.get<MaterialServicoDaoService>(MaterialServicoDaoService);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      tipo: { default: "MATERIAL" },
      unidade_medida: { default: "UNIDADE" },
      material_servico_id: { default: null },
      usuario_id: { default: null },
      unidade_id: { default: null },
      valor: { default: 0 }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    const tipo = this.form?.controls.tipo.value;
    if (tipo == "HUMANO" && controlName == "usuario_id" && !control.value?.length) return "Obrigatório";
    if (tipo == "DEPARTAMENTO" && controlName == "unidade_id" && !control.value?.length) return "Obrigatório";
    if (controlName == "material_servico_id" && this.materialServico?.selectedItem && this.materialServico?.selectedItem!.entity.tipo != tipo) return "Tipo diferente";
    return null;
  }

  public onRecursoChange() {
    const tipo = this.novoRecurso?.collapsed ? this.selectRecurso?.selectedItem?.data?.tipo : this.form.controls.tipo.value;
    if(this.change) this.change(tipo);
    this.cdRef.detectChanges();
  }

  public get collapsed(): boolean {
    return !!this.novoRecurso?.collapsed;
  }

  public get recurso(): ProjetoRecurso | undefined {
    let result = this.novoRecurso?.collapse ? this.selectRecurso?.selectedItem?.data : undefined;
    this.form!.markAllAsTouched();
    if (!this.novoRecurso?.collapse && this.form!.valid) {
      result = new ProjetoRecurso({
        id: "NEW",
        nome: this.form.controls.nome.value,
        tipo: this.form.controls.tipo.value,
        unidade_medida: this.form.controls.unidade_medida.value,
        material_servico_id: ["MATERIAL", "SERVICO"].includes(this.form.controls.tipo.value) ? this.form.controls.material_servico_id.value : null,
        usuario_id: this.form.controls.tipo.value == "HUMANO" ? this.form.controls.usuario_id.value : null,
        unidade_id: this.form.controls.tipo.value == "DEPARTAMENTO" ? this.form.controls.unidade_id.value : null,
        valor: this.form.controls.valor.value,
        usuario: this.usuario?.selectedEntity,
        unidade: this.unidade?.selectedEntity,
        material_servico: this.materialServico?.selectedEntity
      });
    }
    return result;
  }

  ngOnInit(): void { }

}
