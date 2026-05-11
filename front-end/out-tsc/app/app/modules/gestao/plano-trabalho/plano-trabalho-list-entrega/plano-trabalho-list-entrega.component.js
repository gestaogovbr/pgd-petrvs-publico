import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { UnidadeService } from 'src/app/services/unidade.service';
let PlanoTrabalhoListEntregaComponent = class PlanoTrabalhoListEntregaComponent extends PageFrameBase {
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set disabled(value) { if (this._disabled != value)
        this._disabled = value; }
    get disabled() { return this._disabled; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    set planoTrabalhoEditavel(value) { if (this._planoTrabalhoEditavel != value)
        this._planoTrabalhoEditavel = value; }
    get planoTrabalhoEditavel() { return this._planoTrabalhoEditavel; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new PlanoTrabalho());
        if (!this.gridControl.value.entregas)
            this.gridControl.value.entregas = [];
        return this.gridControl.value.entregas;
    }
    //quando adiciona um novo e edita o mesmo, salva 2x no banco
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.atualizaPlanoTrabalhoEvent = new EventEmitter();
        this.options = [];
        this.totalForcaTrabalho = 0;
        this.entregas = [];
        this._disabled = false;
        this._planoTrabalhoEditavel = true;
        /**
         * Método chamado para a validação dos campos do formulário, por ocasião da edição ou inserção de itens.
         * @param control
         * @param controlName
         * @returns
         */
        this.validate = (control, controlName) => {
            let result = null;
            if (['forca_trabalho'].indexOf(controlName) >= 0 && control.value == 1)
                return result;
            if (['forca_trabalho'].indexOf(controlName) >= 0 && !control.value)
                result = "Obrigatório!";
            if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length)
                result = "Obrigatório!";
            if (['forca_trabalho'].indexOf(controlName) >= 0 && (control.value < 1))
                result = "Deve ser maior que 0 ";
            if (['plano_entrega_entrega_id'].indexOf(controlName) >= 0) {
                if (['PROPRIA_UNIDADE', 'OUTRA_UNIDADE'].includes(this.form?.controls.origem.value) && !control.value)
                    result = "Obrigatório!";
                if (!!this.entity?.entregas?.filter(e => !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id && e._status != "DELETE").find(x => x.plano_entrega_entrega_id == control.value))
                    result = "Esta entrega está em duplicidade!"; /* (*2) */
            }
            return result;
        };
        this.dao = injector.get(PlanoTrabalhoEntregaDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.planoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.planoEntregaDao = injector.get(PlanoEntregaDaoService);
        this.planoTrabalhoService = injector.get(PlanoTrabalhoService);
        this.peeDao = injector.get(PlanoEntregaEntregaDaoService);
        this.unidadeService = injector.get(UnidadeService);
        this.join = ["entrega", "plano_entrega_entrega.entrega", "plano_entrega_entrega.plano_entrega:id,unidade_id", "plano_entrega_entrega.plano_entrega.unidade:id,sigla"];
        this.form = this.fh.FormBuilder({
            origem: { default: null },
            orgao: { default: null },
            descricao: { default: "" },
            forca_trabalho: { default: 1 },
            plano_trabalho_id: { default: null },
            plano_entrega_id: { default: null },
            plano_entrega_entrega_id: { default: null }
        }, this.cdRef, this.validate);
    }
    validateEntregas() {
        let planoInterval = { start: this.entity.data_inicio, end: this.entity.data_fim };
        for (let entrega of this.items) {
            let entregaPlano = entrega.plano_entrega_entrega;
            // valida as datas das entregas quando vinculado a uma entrega do plano de entrega
            if (entregaPlano) {
                let entregaDataFim = entregaPlano.data_fim ? entregaPlano.data_fim : (entregaPlano.data_inicio.getTime() <= this.entity.data_fim.getTime() ? this.entity.data_fim : undefined);
                let entregaInterval = { start: entregaPlano.data_inicio, end: entregaPlano.data_fim || entregaPlano.data_inicio };
                if (!entregaDataFim || !this.util.intersection([entregaInterval, planoInterval])) {
                    return this.lex.translate("Entrega") + " " + entregaPlano.descricao + " possui datas incompatíveis (início " +
                        this.util.getDateFormatted(entregaPlano.data_inicio) + (entregaPlano.data_fim ? "e fim " + this.util.getDateFormatted(entregaPlano.data_fim) : "") + ")";
                }
            }
        }
        return undefined;
    }
    /**
     * Método chamado na inicialização do componente. Neste momento são carregadas as entregas do catálogo e as entregas da mesma unidade do plano de trabalho,
     * visto que esses itens não se alteram durante a vida do componente e poderão ser utilizados durante sua utilização.
     */
    async ngOnInit() {
        super.ngOnInit();
        this.entity = this.metadata?.entity || this.entity;
        this.totalForcaTrabalho = Math.round(this.somaForcaTrabalho(this.entity?.entregas) * 100) / 100;
        this.entity._metadata = this.entity._metadata || {};
        this.entity._metadata.novaEntrega = undefined;
    }
    /**
     * Método chamado para inserir uma entrega de plano de trabalho no grid, seja este componente persistente ou não.
     * @returns
     */
    async addEntrega() {
        return Object.assign(new PlanoTrabalhoEntrega(), {
            _status: "ADD",
            id: this.dao.generateUuid(),
            plano_trabalho_id: this.entity?.id
        });
    }
    /**
     * Método utilizado durante a inclusão/alteração de uma entrega de plano de trabalho no grid, seja este componente persistente ou não
     * @param form
     * @param row
     */
    async loadEntrega(form, row) {
        let entrega = row;
        form.controls.descricao.setValue(row.descricao);
        form.controls.forca_trabalho.setValue(row.forca_trabalho);
        form.controls.plano_trabalho_id.setValue(row.plano_trabalho_id);
        form.controls.orgao.setValue(null);
        form.controls.plano_entrega_entrega_id.setValue(null);
        if (row.plano_entrega_entrega) {
            form.controls.plano_entrega_id.setValue(row.plano_entrega_entrega.plano_entrega.id);
            form.controls.plano_entrega_entrega_id.setValue(row.plano_entrega_entrega_id);
        }
        if (entrega._status == "ADD" && !form.controls.plano_entrega_id.value) { // É uma nova entrega
            form.controls.origem.setValue('PROPRIA_UNIDADE');
            let planosEntregas = await this.planoEntregaDao.query({ where: [["unidade_id", "==", this.entity.unidade_id], ["status", "==", "ATIVO"]], orderBy: [['numero', 'desc']] }).asPromise(); //["data_inicio", "<=", this.entity!.data_fim], ["data_fim", ">=", this.entity!.data_inicio]
            form.controls.plano_entrega_id.setValue(planosEntregas[0].id);
        }
        else if (entrega.plano_entrega_entrega?.plano_entrega?.unidade_id == this.entity.unidade_id) {
            form.controls.origem.setValue('PROPRIA_UNIDADE');
            await this.carregarEntregas(entrega.plano_entrega_entrega.plano_entrega_id);
            form.controls.plano_entrega_entrega_id.setValue(entrega.plano_entrega_entrega_id);
        }
        else if (entrega.plano_entrega_entrega) {
            form.controls.origem.setValue('OUTRA_UNIDADE');
            await this.carregarEntregas(entrega.plano_entrega_entrega.plano_entrega_id);
            form.controls.plano_entrega_entrega_id.setValue(entrega.plano_entrega_entrega_id);
        }
        else if (!!entrega.orgao?.length) {
            form.controls.origem.setValue('OUTRO_ORGAO');
            form.controls.orgao.setValue(entrega.orgao);
        }
        else {
            form.controls.origem.setValue('SEM_ENTREGA');
        }
    }
    /**
     * Método chamado para a exclusão de uma entrega de plano de trabalho do grid, seja este componente persistente ou não.
     * @param row
     * @returns
     */
    async removeEntrega(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if (confirm) {
            this.loading = true;
            try {
                this.isNoPersist ? Object.assign(row, { _status: "DELETE" }) : await this.dao?.delete(row.id);
            }
            finally {
                this.loading = false;
                this.atualizaPlanoTrabalhoEvent.emit(this.entity.id);
            }
            this.totalForcaTrabalho = Math.round((this.totalForcaTrabalho - (row.forca_trabalho * 1)) * 100) / 100;
            return this.isNoPersist ? false : true; // (*3)
        }
        else {
            return false;
        }
    }
    /**
     * Método chamado no salvamento de uma entrega do plano de trabalho do grid, seja este componente persistente ou não.
     * @param form
     * @param row
     * @returns
     */
    async saveEntrega(form, row) {
        this.entity._metadata = this.entity._metadata || {};
        this.entity._metadata.novaEntrega = row;
        this.entity._metadata.novaEntrega.plano_entrega_entrega_id = this.form?.controls.plano_entrega_entrega_id.value;
        this.entity._metadata.novaEntrega.orgao = this.form?.controls.orgao.value;
        this.entity._metadata.novaEntrega.descricao = this.form?.controls.descricao.value;
        this.entity._metadata.novaEntrega.forca_trabalho = this.form?.controls.forca_trabalho.value;
        this.loading = true;
        try {
            if (!this.isNoPersist) /* persistente */ {
                await this.dao.save(this.entity._metadata.novaEntrega, this.join);
            }
        }
        catch (e) {
            this.error(e.message ? e.message : e.toString() || e);
        }
        finally {
            row.forca_trabalho = this.form?.controls.forca_trabalho.value * 1;
            row.plano_entrega_entrega = this.entrega?.selectedItem?.data || null;
            this.totalForcaTrabalho = Math.round(this.somaForcaTrabalho(this.entity?.entregas) * 100) / 100;
            this.loading = false;
        }
        return this.entity._metadata.novaEntrega;
    }
    /**
     *  Quando uma nova entrega de plano de trabalho é incluída no grid, o objeto '_metadata' é anexado em 'this.entity' para permitir a atualização do grid antes da atualização da página.
     *  Após a atualização do grid, este método é chamado para excluir o objeto '_metadata' e garantir que, no caso da inserção de várias entregas no grid, apenas a última seja lida a partir deste objeto.
     * @param row
     */
    saveEndEntrega(row) {
        this.entity._metadata = null;
        this.atualizaPlanoTrabalhoEvent.emit(this.entity.id);
    }
    /**
     * Método chamado para somar os percentuais das forças de trabalho do array de entregas passado como parâmetro.
     * @param entregas Array de entregas do plano de trabalho
     * @returns
     */
    somaForcaTrabalho(entregas = []) {
        return entregas.filter(x => x._status != "DELETE").map(x => x.forca_trabalho * 1).reduce((a, b) => a + b, 0);
    }
    /**
     * Método chamado para carregar as entregas da unidade
     * @param idPlanoOuPlano ID do plano de entregas ou o seu objeto completo.
     */
    async carregarEntregas(idPlanoOuPlano) {
        let planoEntrega = typeof idPlanoOuPlano == 'string' ? await this.planoEntregaDao.getById(idPlanoOuPlano, ["entregas.entrega:id,nome", "unidade"]) : idPlanoOuPlano;
        let planoEntregaComUnidade = { id: planoEntrega?.id, unidade_id: planoEntrega?.unidade_id, unidade: planoEntrega?.unidade };
        this.entregas = planoEntrega?.entregas.map(epe => Object.assign({}, { key: epe.id, value: epe.descricao || epe.entrega?.nome || "Desconhecido", data: Object.assign(epe, { plano_entrega: planoEntregaComUnidade }) })) || [];
        this.entregas.sort((a, b) => (a.value > b.value ? 1 : -1));
        if (!this.entregas.find(x => x.key == this.form.controls.plano_entrega_entrega_id.value))
            this.form.controls.plano_entrega_entrega_id.setValue(null);
    }
    /* ---------  TRATAMENTO DOS EVENTOS ----------- */
    async onOrigemChange(row) {
        let value = this.form.controls.origem.value;
        this.cdRef.detectChanges();
        if (value == 'OUTRO_ORGAO') {
            this.form?.controls.plano_entrega_entrega_id.setValue(null);
        }
        else if (value == 'SEM_ENTREGA') {
            this.form?.controls.orgao.setValue(null);
            this.form?.controls.plano_entrega_entrega_id.setValue(null);
        }
        else if (value == 'OUTRA_UNIDADE') { //if (value == 'PROPRIA_UNIDADE' || value == 'OUTRA_UNIDADE')
            this.form?.controls.orgao.setValue(null);
            if (!this.form?.controls.plano_entrega_id.value) {
                this.loading = true;
                this.planoEntrega?.onSelectClick(new Event("SELECT"));
                this.loading = false;
            }
        }
        /*      try {
           let planosEntregas = await this.planoEntregaDao!.query({where: [["unidade_id", "==", this.entity!.unidade_id], ["status", "==", "ATIVO"], ["data_inicio", "<=", this.entity!.data_fim], ["data_fim", ">=", this.entity!.data_inicio]]}).asPromise();
          if(planosEntregas.length == 1) {
            this.form?.controls.plano_entrega_id.setValue(planosEntregas[0].id);
          } else if(this.planoEntrega?.selectedEntity?.unidade_id != this.entity!.unidade_id) {
            this.planoEntrega?.onSelectClick(new Event("SELECT"));
          }
          this.planoEntrega?.onSelectClick(new Event("SELECT"));
        } finally {
          this.loading = false;
        }
      } if (value == 'OUTRA_UNIDADE') {
        this.form?.controls.orgao.setValue(null);
        this.planoEntrega?.onSelectClick(new Event("SELECT"));
      }*/
    }
    onPlanoEntregaChange(event) {
        let planoEntrega = this.planoEntrega?.selectedEntity;
        this.carregarEntregas(planoEntrega);
    }
    onEntregaChange(event) {
        /*let entrega = this.entrega!.selectedItem?.data as PlanoEntregaEntrega;
        if(!this.form!.controls.descricao.value?.length) {
          this.form!.controls.descricao.setValue(entrega?.descricao || "");
        }*/
    }
    onForcaTrabalhoChange(row) {
        let index = this.items.findIndex(x => x["id"] == row["id"]);
        this.totalForcaTrabalho = Math.round((this.somaForcaTrabalho(this.grid?.items) - (this.items[index].forca_trabalho * 1) + (this.form?.controls.forca_trabalho.value * 1)) * 100) / 100;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoTrabalhoListEntregaComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanoTrabalhoListEntregaComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('origem', { static: false })
], PlanoTrabalhoListEntregaComponent.prototype, "origem", void 0);
__decorate([
    ViewChild('planoEntrega', { static: false })
], PlanoTrabalhoListEntregaComponent.prototype, "planoEntrega", void 0);
__decorate([
    ViewChild('entrega', { static: false })
], PlanoTrabalhoListEntregaComponent.prototype, "entrega", void 0);
__decorate([
    Input()
], PlanoTrabalhoListEntregaComponent.prototype, "control", null);
__decorate([
    Input()
], PlanoTrabalhoListEntregaComponent.prototype, "entity", null);
__decorate([
    Input()
], PlanoTrabalhoListEntregaComponent.prototype, "disabled", null);
__decorate([
    Input()
], PlanoTrabalhoListEntregaComponent.prototype, "noPersist", null);
__decorate([
    Input()
], PlanoTrabalhoListEntregaComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], PlanoTrabalhoListEntregaComponent.prototype, "planoTrabalhoEditavel", null);
__decorate([
    Output()
], PlanoTrabalhoListEntregaComponent.prototype, "atualizaPlanoTrabalhoEvent", void 0);
PlanoTrabalhoListEntregaComponent = __decorate([
    Component({
        selector: 'plano-trabalho-list-entrega',
        templateUrl: './plano-trabalho-list-entrega.component.html',
        styleUrls: ['./plano-trabalho-list-entrega.component.scss'],
        standalone: false
    })
], PlanoTrabalhoListEntregaComponent);
export { PlanoTrabalhoListEntregaComponent };
/*
TESTES

                                                  GRID PERSISTENTE                      GRID NÃO-PERSISTENTE
                                              Fluxo Feliz    Validações                Fluxo Feliz    Validações
Inclusão Entrega Catálogo
Inclusão Entrega Mesma Unidade
Inclusão Entrega Outra Unidade
Alteração Entrega Catálogo
Alteração Entrega Mesma Unidade
Alteração Entrega Outra Unidade
Cancelamento Entrega Catálogo
Cancelamento Entrega Mesma Unidade
Cancelamento Entrega Outra Unidade
Exclusão Entrega Catálogo
Exclusão Entrega Mesma Unidade
Exclusão Entrega Outra Unidade

*/
/*
OBSERVAÇÕES:

(*2)  this.entity?.entregas?.filter(e => !!e.plano_entrega_entrega_id && e.id != this.grid?.editing?.id).find(x => x.plano_entrega_entrega_id == control.value)
Filtra as entregas da mesma unidade do plano de trabalho excluindo a entrega que está sendo editada. Em seguida conta aquelas que possuem o mesmo ID da que está sendo editada e dessa forma o resultado deve ser igual a 0, caso contrário a entrega editada
já existe no grid.

(*3)  return this.isNoPersist ? false : true;
Após confirmada a remoção pelo usuário, a entrega é setada com _status = "DELETE" e é excluída da tela e sua confirmação é retornada para o método onDeleteItem() do gridComponent, que a excluirá também dos items do grid.
Entretanto, quando se trata de um grid não persistente, ela não deve ser excluída dos items do grid, pois sua exclusão só se efetivará quando entity for salva, levando
todas as suas entregas para o back-end, que finalmente excluirá as que possuírem _status = "DELETE".

(*4)  if(this.grid?.adding) this.grid!.items[this.grid!.items.length-1].id = '';
No caso de o componente ser 'persistente', essa linha apaga o ID que foi criado pelo banco de dados permitindo ao método saveItem do grid.component localizá-lo na sua lista de items para atualizar suas informações na tela.

(*5)  if(!this.entity?.id?.length) return this.entregasPlanoEntrega;
Quando o componente for chamado por um plano de trabalho (entity) que já existe, não poderá haver alteração no seu plano de entregas, portanto as entregas da mesma unidade do plano de trabalho serão lidas
na própria entity. No entanto, quando o plano de trabalho (entity) ainda não existir (!this.entity?.id?.length), essas entregas vão variar de acordo com o plano de entregas
selecionado no inputSelectComponent, e portanto elas serão lidas na variável que reflete essa escolha (this.entregasPlanoEntrega), e essa reflexão ocorre por causa do bind @Input() set/get entregasPlanoEntrega.


----------------------+--------------------------------------+----------------------------+--------+------------------------------------
ID do Plano           |       Pode ser que a 'row'           |  Características           | inputs | entrega_id
de Trabalho           |                                      |                            | search | plano_entrega_entrega_id
----------------------+--------------------------------------+----------------------------+--------+------------------------------------
                      | - Já tenha vindo do banco (TIPO I)   |                            | nenhum | um dos dois
                      |   (foi carregada junto com o Plano)  |                            |        |
                      |--------------------------------------+----------------------------+--------+------------------------------------
  EXISTE              | - Tenho sido salva agora no banco    |                            | um dos | um dos dois
  - Então o Grid é    |   (TIPO II)                          |                            | três   |
    Persistente       |--------------------------------------+----------------------------+--------+------------------------------------
                      | - Esteja sendo criada agora          | addEntrega loadEntrega     | um dos | nenhum
                      |                                      |                            | três   |
                      |--------------------------------------+----------------------------+--------+------------------------------------
                      | - Seja do TIPO I e esteja sendo      | loadEntrega                | um dos | um dos dois
                      |   editada agora                      |                            | três   |
                      +--------------------------------------+----------------------------+--------+------------------------------------
                      | - Seja do TIPO II e esteja sendo     | loadEntrega                | um dos | um dos dois
                      |   editada agora                      |                            | três   |
----------------------+--------------------------------------+----------------------------+--------+------------------------------------
  NÃO                 | - Já exista nos itens do grid        |                            | nenhum | um dos dois
  EXISTE              |   (foi salva agora, não no banco)    | Possui _status == "ADD"    |        |
  - Então o Grid é    |--------------------------------------+----------------------------+--------+------------------------------------
    Não-persistente   | - Esteja sendo criada agora          | Possui _status == "ADD"    | um dos | nenhum
                      |                                      | addEntrega loadEntrega     | três   |
                      |--------------------------------------+----------------------------+--------+------------------------------------
                      | - Tenha acabado de ser criada e      | Possui _status == "ADD"    | um dos | um dos dois
                      |   já está sendo editada              | loadEntrega                | três   |
------------------------------------------------------------------------------------------+--------+------------------------------------
(*) O ADD é inserido pelo método addEntrega e só sai quando persiste no banco e volta

*/ 
//# sourceMappingURL=plano-trabalho-list-entrega.component.js.map