import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { PlanejamentoListObjetivoComponent } from '../planejamento-list-objetivo/planejamento-list-objetivo.component';

@Component({
  selector: 'app-planejamento-form',
  templateUrl: './planejamento-form.component.html',
  styleUrls: ['./planejamento-form.component.scss']
})
export class PlanejamentoFormComponent extends PageFormBase<Planejamento, PlanejamentoDaoService> {
    @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
    @ViewChild(GridComponent, { static: true }) public grid?: GridComponent;
    @ViewChild('objetivos', { static: false }) public objetivos?: PlanejamentoListObjetivoComponent;

    public unidadeDao: UnidadeDaoService;
    public planejamentosSuperiores: LookupItem[] = [];
    public hasPermissionToUNEX: boolean = false;
    public form: FormGroup;
    
    constructor(public injector: Injector) {
      super(injector, Planejamento, PlanejamentoDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.hasPermissionToUNEX = this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_LOTPRI') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QQLOT') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_SUBORD') || this.auth.hasPermissionTo('MOD_PLAN_INST_INCL_UNEX_QUALQUER');
      this.join = [
        'objetivos',
        'objetivos.objetivo_pai:id,nome',
        'objetivos.eixo_tematico:id,nome',
        'planejamento_superior:id,nome',
        'planejamento_superior.objetivos'
      ];
      this.form = this.fh.FormBuilder({
        nome: {default: ""},
        unidade_id: {default: null},
        entidade_id: {default: null},
        planejamento_superior_id: {default: null},
        data_inicio: {default: new Date()},
        data_fim: {default: null},
        missao: {default: ""},
        visao: {default: ""},
        valores: { default: []},
        valor_texto: {default: ""}
      }, this.cdRef, this.validate);
    }
  
    public validate = (control: AbstractControl, controlName: string) => {
      let result = null;
      if(['nome','missao','visao'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if(['data_inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      if(controlName == 'data_fim' && control.value && !this.dao?.validDateTime(control.value)){
        result = "Inválido";
      }
      return result;
    }
  
    public formValidation = (form?: FormGroup) => {
      if(this.form!.controls.data_fim.value && this.form!.controls.data_inicio.value > this.form!.controls.data_fim.value) return "A data do início não pode ser maior que a data do fim!";
      if(this.form!.controls.valores.value.length == 0) return "É obrigatória a inclusão de ao menos um valor institucional!";
      if(this.isPlanejamentoUNEXEC() && !this.form.controls.planejamento_superior_id.value?.length) return "Quando o Planejamento é de uma Unidade Executora, é obrigatória a definição do Planejamento superior ao qual ele será vinculado!";
      return undefined;
    }
  
    public loadData(entity: Planejamento, form: FormGroup) {
      let formValue = Object.assign({}, form.value);
      form.patchValue(this.util.fillForm(formValue, entity));
    }

    public initializeData(form: FormGroup) {
      this.entity = new Planejamento();
      this.loadData(this.entity, form); 
    }

    public async saveData(form: IIndexable): Promise<Planejamento> {
      return new Promise<Planejamento>((resolve, reject) => {
        this.objetivos!.grid!.confirm();
        let planejamento = this.util.fill(new Planejamento(), this.entity!);
        planejamento = this.util.fillForm(planejamento, this.form!.value);
        planejamento.objetivos = this.objetivos!.items;
        resolve(planejamento);
      });
    }
   
    public titleEdit = (entity: Planejamento): string => {
      return "Editando " + this.lex.translate("Planejamento Institucional") + ': ' + (entity?.nome || "");
    }

    public addValorHandle(): LookupItem | undefined {
      let result = undefined;
      const value = this.form.controls.valor_texto.value;
      const key = this.util.textHash(value);
      if(value?.length && this.util.validateLookupItem(this.form.controls.valores.value, key)) {
        result = {
          key: key,
          value: this.form.controls.valor_texto.value
        };
        this.form.controls.valor_texto.setValue("");
      }
      return result;
    }; 
    
    public onUnidadeChange(event: Event){
      if(this.entity!.unidade_id != this.form.controls.unidade_id.value){
        this.dao?.query({where: [['unidade_executora_id', '==', this.form.controls.unidade_id.value], ['manut_planej_unidades_executoras','==',true]]}).getAll().then((pls) => {
          this.planejamentosSuperiores = pls.map(x => Object.assign({},{key: x.id, value: x.nome}) as LookupItem);
          this.planejamentosSuperiores.unshift({key: null, value: 'Escolha um Planejamento superior...'});
          this.objetivos!.loadData(this.entity!, this.form!);
          this.cdRef.detectChanges();
        });
      };
    }

    /**
     * @param event 
     * Se o planejamento superior for alterado, e já houver objetivos na lista, avisar que eles serão desvinculados dos objetivos do planejamento anterior,
     * para que novos objetivos superiores sejam selecionados.
     */
    public async onPlanejamentoChange(event: Event){
      if(this.form.controls.planejamento_superior_id.value != this.entity?.planejamento_superior_id && this.entity?.objetivos?.length) {
        let confirm = await this.dialog.confirm("Alteração de Planejamento superior", "Como já existem objetivos neste Planejamento, eles serão desvinculados dos objetivos do Planejamento anterior, para que novos objetivos sejam selecionados! Deseja continuar?");
        if(confirm) {
          this.entity?.objetivos?.forEach(obj => obj.objetivo_pai_id = null); 
          //atualizar a lista de objetivos superiores
        } else {
          this.form.controls.planejamento_superior_id.setValue(this.entity?.planejamento_superior_id);
        };
      };
    }

    /**
     * 
     * @returns boolean Informa se o planejamento é da Unidade Instituidora ou não.
     */
    public isPlanejamentoUNINST(): boolean {
      return !this.form.controls.unidade_id.value?.length
    }

    /**
     * 
     * @returns boolean Informa se o planejamento é da Unidade Executora ou não.
     */
    public isPlanejamentoUNEXEC(): boolean {
      return !this.isPlanejamentoUNINST();
    }
}
  
  
