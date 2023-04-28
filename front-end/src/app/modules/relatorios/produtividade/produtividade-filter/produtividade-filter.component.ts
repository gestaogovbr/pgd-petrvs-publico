import { FullRoute } from 'src/app/services/navigate.service';
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageReportFilterBase } from 'src/app/modules/base/page-report-filter-base';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { Unidade } from 'src/app/models/unidade.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { Plano } from 'src/app/models/plano.model';

@Component({
  selector: 'app-produtividade-filter',
  templateUrl: './produtividade-filter.component.html',
  styleUrls: ['./produtividade-filter.component.scss']
})
export class ProdutividadeFilterComponent extends PageReportFilterBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario') usuario?: InputSearchComponent;
  @ViewChild('unidade') unidade?: InputSelectComponent;

  public form: FormGroup;
  public usuarioDao: UsuarioDaoService;
  public reportRoute: FullRoute;
  //public plains: LookupItem[] = [];
  public planos: LookupItem[] = [];
  public unidades: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      inicio_periodo: {default: new Date()},
      fim_periodo: {default: new Date()},
      tipo_relatorio: {default: "POR_PERIODO"},
      plano_id: {default: null},
      unidade_id: {default: null},
      usuario_id: {default: null},
    }, this.cdRef, this.validate);
    this.reportRoute = {route: ["relatorios", "produtividade", "report"], params: {}};
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(["usuario_id", "unidade_id", "tipo_relatorio"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    } else if(["inicio_periodo", "fim_periodo"].includes(controlName) && this.form?.controls.tipo_relatorio.value == "POR_PERIODO") {
      if (!control.value) {
        result = "Obrigatório";
      } else if(!this.util.isDataValid(control.value)) {
        result = "Data inválida";
      }
    } else if(controlName == "plano_id" && !control.value?.length && this.form?.controls.tipo_relatorio.value == "POR_PLANO") {
      result = "Obrigatório";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    const values = form!.value;
    if(values.inicio_periodo > values.fim_periodo) {
      return "O início do período não pode ser maior que o final do período!";
    }
    return undefined;
  }

  public initializeData(form: FormGroup): void {
    form.patchValue({});
  }

  public onUsuarioSelect(item: SelectItem) {
    const usuario: Usuario | undefined = item.entity as Usuario;
    const planos = usuario?.planos || [];
    const unidades: LookupItem[] = [];
    this.planos = planos.map(x => {
      if(!unidades.find(y => y.key == x.unidade?.id)) {
        unidades.push({
          key: x.unidade?.id,
          value: (x.unidade?.nome || ""),
          data: x
        });
      }
      return {
        key: x.id,
        value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao!.getDateFormatted(x.data_inicio_vigencia) + " a " + this.usuarioDao!.getDateFormatted(x.data_fim_vigencia) + " (" + x.unidade!.sigla + ")",
        data: x
      };
    });
    this.unidades = unidades;
    this.cdRef.detectChanges();
    if(!this.form.controls.plano_id.value?.length && this.planos.length == 1) { //se o controle PLANO está em branco e o usuário só possui 1 plano, preenche o controle com este plano
      this.form.controls.plano_id.setValue(this.planos[0].key);
    } else { // caso contrário deixa o controle em branco para que o usuário selecione o valor desejado
      this.form.controls.plano_id.setValue(null);
    }
    if(!this.form.controls.unidade_id.value?.length && this.unidades.length == 1) { //se o controle UNIDADE está em branco e o usuário só está vinculado a 1 unidade, preenche o controle com esta unidade
      this.form.controls.unidade_id.setValue(this.unidades[0].key);
    } else { // caso contrário deixa o controle em branco para que o usuário selecione o valor desejado
      this.form.controls.unidade_id.setValue(null);
    }
  }

  public onPlanoChange(event: Event) {

  }

  public onUnidadeChange(event: Event){
    if (event) {
      const unidadeSelecionada = this.form.controls.unidade_id.value;
      const planoSelecionado = this.form.controls.plano_id.value;
      this.planos = ((this.usuario?.searchObj as Usuario)?.planos || []).filter(x => x.unidade?.id == unidadeSelecionada).map(x => {
        return {
          key: x.id,
          value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao!.getDateFormatted(x.data_inicio_vigencia) + " a " + this.usuarioDao!.getDateFormatted(x.data_fim_vigencia) + " (" + x.unidade!.sigla + ")",
          data: x
        };
      });
      if(!this.planos.find(x => (x.data as Plano).id == planoSelecionado)) this.form.controls.plano_id.setValue(null);
      this.cdRef.detectChanges();
    }
  }

  public selecionaUnidade(event: Event) {

  }


}

