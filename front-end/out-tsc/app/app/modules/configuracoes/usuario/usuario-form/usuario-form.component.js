import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UsuarioIntegranteComponent } from '../usuario-integrante/usuario-integrante.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
let UsuarioFormComponent = class UsuarioFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Usuario, UsuarioDaoService);
        this.injector = injector;
        this.canEditAtribuicoes = false;
        this.regramentos = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
                result = "Inválido";
            }
            if (controlName == 'data_nascimento' && control.value == null) {
                return result;
            }
            if (['data_nascimento'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.formValidation = (form) => {
            if (!this.unidadesIntegrantes?.formPerfil.controls.perfil_id.value?.length)
                return "É obrigatório a definição de um " + this.lex.translate("perfil") + " para " + this.lex.translate("o servidor") + ". Utilize a aba 'Atribuições'.";
            // if (!this.unidadesIntegrantes?.grid?.items.find((item, index, array) => item.atribuicoes.includes('LOTADO'))) {
            //   return "É obrigatória a definição " + this.lex.translate('da unidade') + " " + this.lex.translate('de lotação') + " " + this.lex.translate('do servidor') + "! Defina-a na aba 'Atribuições'.";
            // }
            if (this.action != 'new' && this.unidadesIntegrantes?.grid?.items.find((item, index, array) => !(item.unidade_id.length && item.usuario_id.length)))
                return "Na aba 'Atribuições' há " + this.lex.translate('unidade') + " com edição não concluída. Conclua-a antes de salvar " + this.lex.translate('o servidor') + "!";
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Usuário") + ': ' + (entity?.nome || "");
        };
        //this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.integranteDao = injector.get(UnidadeIntegranteDaoService);
        this.planoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.form = this.fh.FormBuilder({
            email: { default: "" },
            nome: { default: "" },
            cpf: { default: "" },
            apelido: { default: "" },
            participa_pgd: { default: "" },
            modalidade_pgd: { default: null },
            usuario_externo: { default: true },
            telefone: { default: "" },
            uf: { default: "" },
            sexo: { default: null },
            url_foto: { default: "" },
            texto_complementar_plano: { default: "" },
            data_nascimento: { default: null },
            situacao_siape: { default: 'ATIVO' },
        }, this.cdRef, this.validate);
        this.planoDataset = this.planoTrabalhoDao.dataset();
        this.join = [
            "auditsExterno",
            "ultimoPlanoTrabalhoAtivo.documentos"
        ];
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.regramentos = [];
        if (entity?.regramentos) {
            this.regramentos = entity.regramentos?.map((nome, index) => ({ id: index, nome }));
        }
        await this.unidadesIntegrantes?.loadData(entity);
    }
    initializeData(form) {
        this.entity = new Usuario();
        this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise(async (resolve, reject) => {
            this.unidadesIntegrantes.grid.confirm();
            let usuario = this.util.fill(new Usuario(), this.entity);
            // retira audits_externo do objeto
            delete usuario.audits_externo;
            usuario = this.util.fillForm(usuario, this.form.value);
            usuario.perfil_id = this.unidadesIntegrantes?.formPerfil.controls.perfil_id.value;
            let integrantesConsolidados = this.unidadesIntegrantes?.items || [];
            let indiceVinculoLotacao = integrantesConsolidados.findIndex(ic => ic.atribuicoes.includes("LOTADO"));
            integrantesConsolidados.forEach((item, index, array) => { if (index != indiceVinculoLotacao && item._status == 'DELETE')
                item.atribuicoes = []; });
            usuario.integrantes = integrantesConsolidados;
            resolve(usuario);
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.canEditAtribuicoes = this.snapshot?.data['canEditAtribuicoes'] ?? false;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], UsuarioFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(UsuarioIntegranteComponent, { static: false })
], UsuarioFormComponent.prototype, "unidadesIntegrantes", void 0);
__decorate([
    ViewChild('lotacao', { static: false })
], UsuarioFormComponent.prototype, "lotacao", void 0);
UsuarioFormComponent = __decorate([
    Component({
        selector: 'app-usuario-form',
        templateUrl: './usuario-form.component.html',
        styleUrls: ['./usuario-form.component.scss'],
        standalone: false
    })
], UsuarioFormComponent);
export { UsuarioFormComponent };
/*
TESTES MÍNIMOS RECOMENDADOS PARA A VALIDAÇÃO DO COMPONENTE - USUARIO-FORM

- Para verificar Lotação x Atribuições

CENÁRIO: CAMINHO FELIZ
Formulário completo do usuário
1. Incluir um usuário com lotação definida e sem atribuições.
2. Incluir um usuário com lotação definida e na mesma unidade inserir novas atribuições compatíveis (não deve estar disponível a atribuição 'LOTADO').
3. Incluir um usuário com lotação definida e na mesma unidade e em várias outras inserir atribuições compatíveis diversas.
4. Alterar um usuário, mudando sua lotação através da aba 'Principal', para uma unidade que não existe ainda na aba 'Atribuições'.
5. Alterar um usuário, mudando sua lotação através da aba 'Principal', para uma unidade que já existe na aba 'Atribuições'.
6. Alterar um usuário, apagando uma ou mais atribuições de uma mesma unidade.
7. Alterar um usuário, apagando o vínculo completo com uma unidade distinta da sua lotação.
8. Tentar incluir um usuário que já existe (mesmo e-mail funcional) e que foi desativado (apagado virtualmente).
9. Tentar incluir um usuário que já existe (mesmo cpf) e que foi desativado (apagado virtualmente).

CENÁRIO: CAMINHO ALTERNATIVO
Formulário completo do usuário
1. Incluir um usuário com lotação definida e com atribuições repetidas em uma mesma unidade.
2. Incluir um usuário com lotação definida e com atribuições incompatíveis em uma mesma unidade (mais de uma atribuição de gestor).
3. Alterar um usuário apagando sua atribuição de LOTADO na aba 'Atribuições'.
4. Alterar um usuário inserindo atribuições repetidas em uma mesma unidade.
5. Alterar um usuário inserindo atribuições incompatíveis em uma mesma unidade.
6. Alterar um usuário apagando o vínculo completo com a unidade de sua lotação.
7. Alterar um usuário apagando vários vínculos completos com diversas unidades, sem incluir a unidade de lotação.
8. Alterar um usuário apagando vários vínculos completos com diversas unidades, incluindo sua unidade de lotação.
9. Alterar um usuário inserindo a atribuição de 'Gestor' a mais de uma unidade.

CENÁRIO: CAMINHO ALTERNATIVO
Formulário de 'Atribuições' (menu de opções: ...)
1. Alterar um usuário apagando sua atribuição de LOTADO.
2. Alterar um usuário inserindo atribuições repetidas em uma mesma unidade.
3. Alterar um usuário inserindo atribuições incompatíveis em uma mesma unidade.
4. Alterar um usuário apagando o vínculo completo com a unidade de sua lotação.
5. Alterar um usuário apagando vários vínculos completos com diversas unidades, sem incluir a unidade de lotação.
6. Alterar um usuário apagando vários vínculos completos com diversas unidades, incluindo sua unidade de lotação.
7. Alterar um usuário inserindo a atribuição de 'Gestor' a mais de uma unidade.


 */
//# sourceMappingURL=usuario-form.component.js.map