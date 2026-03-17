import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { NavigateResult } from 'src/app/services/navigate.service';

@Component({
    selector: 'app-planejamento-form-objetivo',
    templateUrl: './planejamento-form-objetivo.component.html',
    styleUrls: ['./planejamento-form-objetivo.component.scss'],
    standalone: false
})
export class PlanejamentoFormObjetivoComponent extends PageFormBase<PlanejamentoObjetivo, PlanejamentoObjetivoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('planejamentoSuperiorNome', {static: false}) public planejamentoSuperiorNome?: InputTextComponent;
  @ViewChild('eixoTematico', {static: false}) public eixoTematico?: InputSearchComponent;

  public planejamento?: Planejamento;
  public objetivos: LookupItem[] = [];
  public objetivos_superiores: LookupItem[] = [];
  public planejamentoDao?: PlanejamentoDaoService;
  public eixoTematicoDao?: EixoTematicoDaoService;

  constructor(public injector: Injector) {
    super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.eixoTematicoDao = injector.get<EixoTematicoDaoService>(EixoTematicoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      fundamentacao: {default: ""},
      planejamento_id: {default: null},
      planejamento_superior_nome: {default: ""},
      eixo_tematico_id: {default: null},
      objetivo_superior_id: {default: null},
      objetivo_pai_id: {default: null},
      integra_okr: {default: true},
    }, this.cdRef, this.validate);
  }


  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome','fundamentacao'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório";
    if(['eixo_tematico_id'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório";
    return result;
  }

  public formValidation = (form?: FormGroup) =>{
    let result = null;
    return result;
  }

  public loadData(entity: PlanejamentoObjetivo, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.title = entity._status == 'ADD' ? 'Inclusão de Objetivo' : 'Editando objetivo...';
    this.planejamento = this.metadata?.planejamento as Planejamento;
    if(this.metadata?.planejamento_superior) this.planejamento.planejamento_superior = this.metadata.planejamento_superior as Planejamento;
    this.form?.controls.planejamento_superior_nome.setValue(this.planejamento?.planejamento_superior?.nome || '');
    const objetivosSuperioresRaw = this.planejamento?.planejamento_superior?.objetivos as PlanejamentoObjetivo[] || []; 
    const objetivosRaw = (this.metadata?.objetivos as PlanejamentoObjetivo[]) || [];

    let objetivosOrdenados = this.ordenarObjetivos(objetivosRaw);
    let objetivosSuperioresOrdenados = this.ordenarObjetivos(objetivosSuperioresRaw);
    
    objetivosOrdenados = this.filtrarObjetivos(objetivosOrdenados, entity.id);
    this.objetivos = this.montarListaObjetivos(objetivosOrdenados);
    this.objetivos_superiores = this.montarListaObjetivos(objetivosSuperioresOrdenados);

    (async () => {
        await this.eixoTematico?.loadSearch(entity.eixo_tematico || entity.eixo_tematico_id);
    })();
  }

  public filtrarObjetivos(objetivos: PlanejamentoObjetivo[], entityId?: string): PlanejamentoObjetivo[] {
    if (!entityId) return objetivos;

    const index = objetivos.findIndex(x => x.id === entityId);
    if (index >= 0) {
      const nivelRemover = (objetivos[index] as any)._nivel;
      let count = 1;
      while (index + count < objetivos.length) {
        const nextNivel = (objetivos[index + count] as any)._nivel;
        if (nextNivel > nivelRemover) {
          count++;
        } else {
          break;
        }
      }
      objetivos.splice(index, count);
    }
    return objetivos;
  }

  public montarListaObjetivos(objetivos: PlanejamentoObjetivo[]): LookupItem[] {
    return objetivos.map(x => {
      const nivel = (x as any)._nivel || 0;
      const prefixo = nivel > 0 ? '\u00A0\u00A0'.repeat(nivel) + '↳ ' : '';
      return {
        key: x.id,
        value: prefixo + x.nome,
        data: x
      };
    });
  }

  public ordenarObjetivos(objetivos: PlanejamentoObjetivo[]): PlanejamentoObjetivo[] {
    const ids = new Set(objetivos.map(o => o.id));
    const buildTree = (paiId: string | null = null, nivel: number = 0): PlanejamentoObjetivo[] => {
      const children = objetivos
        .filter(p => {
          if (paiId === null) {
            return !p.objetivo_pai_id || !ids.has(p.objetivo_pai_id);
          }
          return p.objetivo_pai_id === paiId;
        })
        .sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0));

      return children.flatMap(p => {
        (p as any)._nivel = nivel;
        return [p, ...buildTree(p.id, nivel + 1)];
      });
    };
    return buildTree(null);
  }

  public async initializeData(form: FormGroup) {
    this.entity = this.metadata?.objetivo as PlanejamentoObjetivo;
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>(async (resolve, reject) => {
      const objetivo = Object.assign({eixo_tematico: this.eixoTematico?.selectedItem?.entity}, this.entity!);
      resolve(new NavigateResult(this.util.fillForm(objetivo, this.form!.value)));
    });
  }

  public isPlanejamentoUNEX(): boolean {
    return this.planejamento?.unidade_id != null;
  }

  public onObjetivoPaiChange(row: any) {
    const objetivoPai = this.form!.controls.objetivo_pai_id.value;
    const eixoTematicoId = this.objetivos.find(x => x.key === objetivoPai)?.data.eixo_tematico_id;
    if (eixoTematicoId) this.form!.controls.eixo_tematico_id.setValue(eixoTematicoId);
    this.cdRef.detectChanges();
  }

  public onObjetivoSuperiorChange(row: any) {
    let idEixoTematicoObjetivoSuperior = this.objetivos_superiores.find(x => x.key === this.form?.controls.objetivo_superior_id.value)?.data.eixo_tematico_id;  
    if (!this.form!.controls.eixo_tematico_id.value) this.form!.controls.eixo_tematico_id.setValue(idEixoTematicoObjetivoSuperior);
    this.cdRef.detectChanges();
  }
}
