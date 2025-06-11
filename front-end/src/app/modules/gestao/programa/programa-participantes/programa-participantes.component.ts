import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { now } from 'moment';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { ProgramaParticipanteDaoService } from 'src/app/dao/programa-participante-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Programa } from 'src/app/models/programa.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-programa-participantes',
  templateUrl: './programa-participantes.component.html',
  styleUrls: ['./programa-participantes.component.scss']
})
export class ProgramaParticipantesComponent extends PageListBase<Usuario, UsuarioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild("programaSearch", { static: false }) public programaSearch?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;
  public programaParticipanteDao: ProgramaParticipanteDaoService;
  public usuarioDao: UsuarioDaoService;
  public programaDao: ProgramaDaoService;
  public multiselectMenu: ToolbarButton[] = [];
  public programa: Programa | null = null;
  public BOTAO_HABILITAR: ToolbarButton = { label: this.lex.translate("Habilitar"), hint: this.lex.translate("Habilitar"), icon: "bi bi-person-check-fill", color: "btn-outline-success", onClick: this.habilitarParticipante.bind(this) };
  public BOTAO_DESABILITAR: ToolbarButton = { label: this.lex.translate("Desabilitar"), hint: this.lex.translate("Desabilitar"), icon: "bi bi-person-x-fill", color: "btn-outline-danger", onClick: this.desabilitarParticipante.bind(this) };

  public BOTAO_PEDAGIO: ToolbarButton;
  public BOTAO_REMOVE_PEDAGIO: ToolbarButton;

  public condicoes: LookupItem[] = [
    {
      key: '1',
      value: this.lex.translate('Habilitados')
    },
    {
      key: '0',
      value: this.lex.translate('Desabilitados')
    }
  ]

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaParticipanteDao = injector.get<ProgramaParticipanteDaoService>(ProgramaParticipanteDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    /* Inicializações */
    this.code = "MOD_PART";
    this.filter = this.fh.FormBuilder({
      programa_id: { default: this.programa?.id },
      unidade_id: { default: this.auth.unidade?.id },
      nome_usuario: { default: "" },
      habilitados: { default: null },
    }, this.cdRef, this.validate);
    if (this.auth.hasPermissionTo('MOD_PART_HAB')) this.multiselectMenu.push({
      icon: "bi bi-person-check-fill",
      label: this.lex.translate("Habilitar"),
      color: "btn-outline-success",
      onClick: this.habilitarParticipantes.bind(this)
    });
    if (this.auth.hasPermissionTo('MOD_PART_DESAB')) this.multiselectMenu.push({
      icon: "bi bi-person-x-fill",
      label: this.lex.translate("Desabilitar"),
      color: "btn-outline-danger",
      onClick: this.desabilitarParticipantes.bind(this)
    });


    this.BOTAO_PEDAGIO = { label: "Tornar teletrabalho indisponível", icon: "bi bi-ban", color: "btn-outline-danger", onClick: (usuario: Usuario) => {
      this.go.navigate(
        { 
          route: ['gestao', 'programa', 'pedagio', usuario.id] }, 
        {
          metadata: {'usuario': usuario},
          modalClose: async (modalResult) => {
            if (modalResult) {
              this.refresh(modalResult.id);
              this.cdRef.detectChanges();
            }
          }
        }
      ); 
    }};

    this.BOTAO_REMOVE_PEDAGIO = { label: "Tornar teletrabalho disponível novamente", icon: "bi bi-check2-circle", color: "btn-outline-primary", onClick: this.removePedagio.bind(this)};


    this.join = ["areasTrabalho.unidade:id,sigla", "planos_trabalho:id,status", "participacoes_programas.programa:id"];
    this.title = this.lex.translate("Habilitações");
    this.orderBy = [['nome', 'asc']];    
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(row.usuario_externo) return result;
    if (this.auth.hasPermissionTo('MOD_PART_HAB') && !this.isHabilitado(row)) result.push(this.BOTAO_HABILITAR);
    if (this.auth.hasPermissionTo('MOD_PART_DESAB') && this.isHabilitado(row)) result.push(this.BOTAO_DESABILITAR);
    if (this.auth.hasPermissionTo('MOD_PART_PEDAGIO') && !row.pedagio) result.push(this.BOTAO_PEDAGIO);
    if (this.auth.hasPermissionTo('MOD_PART_PEDAGIO') && row.pedagio) result.push(this.BOTAO_REMOVE_PEDAGIO);
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['programa_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.grid!.BUTTON_MULTISELECT_SELECIONAR = "Marcar";
    this.grid!.BUTTON_MULTISELECT_CANCELAR_SELECAO = "Cancelar Marcação";
    this.grid!.BUTTON_MULTISELECT.label = "Marcar";
    (async () => {
      this.loading = true;
      try {
        this.programa = this.metadata?.programa;        
        if (!this.programa) await this.programaDao.query({ 
          where: [['vigentesUnidadeExecutora', "==", this.auth.unidade!.id]],
          orderBy: [["unidade.path", "desc"]]
        }).asPromise().then(programas => {
          this.programa = programas[0];         
        });
      } finally {
        this.programaSearch?.loadSearch(this.programa);
        this.loading = false;
      }
    })();
  }

  public filterClear(filter: FormGroup<any>): void {
    filter.controls.unidade_id.setValue(undefined);
    filter.controls.nome_usuario.setValue('');
    filter.controls.habilitados.setValue('1');
  }

  public filterWhere = (filter: FormGroup) => {    
    let result: any[] = [];
    let form: any = filter.value;
    if (form.unidade_id?.length) result.push(["lotacao", "==", form.unidade_id]);
    if (form.nome_usuario?.length) result.push(["nome", "like", "%" + form.nome_usuario.trim().replace(" ", "%") + "%"]);
    result.push(["habilitado", '==', this.filter?.controls.habilitados.value]);
    result.push(["programa_id", "==", this.programa?.id || this.metadata?.programa.id ]);
    return result;
  }

  public async habilitarParticipante(row: any) {
    await this.programaParticipanteDao!.habilitar([row.id], this.programa!.id, 1, false).then(resposta => {
      (this.grid?.query || this.query!).refreshId(row.id);
      this.cdRef.detectChanges();
    }).catch((error) => {
      this.dialog.alert("Erro", error);
    });
    return false;
  }

  public async desabilitarParticipante(row: any) {
    let desabilitar = await this.dialog.confirm("Desabilitar ?", "Deseja DESABILITAR " + this.lex.translate("o servidor") + " " + (row.nome as string).toUpperCase() + " " + this.lex.translate("do programa") + " " + (this.programa?.nome as string).toUpperCase() + " ?");
    if (desabilitar) {
      let suspender: boolean = false;
      if (this.hasPlanoTrabalhoAtivo(row)) {
        suspender = await this.dialog.confirm("ATENÇÃO", this.lex.translate("O servidor") + " possui " + this.lex.translate("Plano de Trabalho") + " ativo vinculado a " + this.lex.translate("este Programa") + "!" + " Deseja continuar com a desabilitação, suspendendo o seu " + this.lex.translate("Plano de Trabalho" + " ?"));
      }
      if (!this.hasPlanoTrabalhoAtivo(row) || suspender) {
        await this.programaParticipanteDao!.habilitar([row.id], this.programa!.id, 0, suspender).then(resposta => {
          (this.grid?.query || this.query!).refreshId(row.id);
          this.cdRef.detectChanges();
        }, error => {
          this.dialog.alert("Erro", error);
        });
      }
    }
  }

  public async habilitarParticipantes() {
    if (!this.grid!.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum participante selecionado para a habilitação");
    } else {
      const self = this;
      this.dialog.confirm("Habilitar Participantes ?", "Confirma a habilitação de todos esses participantes?").then(habilitar_todos => {
        if (habilitar_todos) {
          const idsUsuarios = Object.values(this.grid!.multiselected).map(x => x.id);
          this.programaParticipanteDao!.habilitar(idsUsuarios, this.programa!.id, 1, false).then(()=> {
            self.dialog.topAlert("Participantes habilitados com sucesso!", 5000);
            (self.grid?.query || self.query!).refresh();
          }).catch(error => {
            self.dialog.alert("Erro", error);
          });
          this.grid?.enableMultiselect(false);
          self.cdRef.detectChanges();
        }
      });
    }
  }

  public async desabilitarParticipantes() {
    let idsProgramasParticipantes = Object.keys(this.grid!.multiselected);
    this.dialog.confirm("Desabilitar ?", "Deseja DESABILITAR, " + this.lex.translate("do programa") + " " + (this.programa?.nome as string).toUpperCase() + " todos " + this.lex.translate("os usuários") + " selecionados ?").then(async desabilitar => {
      if (desabilitar) {
        const self = this;
        let qde_usuarios_com_plano_trabalho_ativo: number = 0;
        await this.programaParticipanteDao!.quantidadePlanosTrabalhoAtivos(idsProgramasParticipantes).then(resposta => {
          qde_usuarios_com_plano_trabalho_ativo = resposta;
        });
        let suspender: boolean = false;
        if (!!qde_usuarios_com_plano_trabalho_ativo) {
          await this.dialog.confirm("ATENÇÃO", "Há " + qde_usuarios_com_plano_trabalho_ativo + this.lex.translate(qde_usuarios_com_plano_trabalho_ativo == 1 ? " usuário" : " usuários") + " com " + this.lex.translate("Plano de Trabalho") + " ativo vinculado a " + this.lex.translate("este Programa") + "!" + " Deseja continuar com a desabilitação, suspendendo " + (qde_usuarios_com_plano_trabalho_ativo == 1 ? "o seu " : "todos ") + this.lex.translate(qde_usuarios_com_plano_trabalho_ativo == 1 ? "Plano de Trabalho" : "os Planos de Trabalho") + " ?").then(resposta => {
            suspender = resposta;
          });
        }
        if (!qde_usuarios_com_plano_trabalho_ativo || suspender) {
          const idsUsuarios = Object.values(this.grid!.multiselected).map(x => x.id);
          this.programaParticipanteDao!.habilitar(idsUsuarios, this.programa!.id, 0, suspender).then(resposta => {
            self.dialog.topAlert("Participantes desabilitados com sucesso!", 5000);
            (this.grid?.query || this.query!).refresh();
          }).catch(function (error) {
            if (self.grid) self.grid.error = error;
          });
          this.grid?.enableMultiselect(false);
          this.cdRef.detectChanges();
        }
      }
    });
  }

  public onProgramaChange() {
    this.programa = this.programaSearch?.selectedItem?.entity;
    if (this.programa) this.grid?.reloadFilter();
  }

  public isHabilitado(row: Usuario): boolean {
    return !!row.participacoes_programas.find(x => x.habilitado == 1 && x.programa_id == this.programa?.id);
  }

  public hasPlanoTrabalhoAtivo(row: Usuario): boolean {
    return !!row.planos_trabalho?.find(x => x.status == "ATIVO" && this.util.between(now(), { start: x.data_inicio, end: x.data_fim }));
  }

  public async removePedagio(row: any) {
    this.dialog.confirm("Remover teletrabalho indisponível ?", "Deseja tornar a modalidade teletrabalho disponível para o participante " + (row.nome as string).toUpperCase() + " ?").then(async confirm => {
      if (confirm) {
        await this.usuarioDao!.removePedagio(row.id).then(resposta => {
          (this.grid?.query || this.query!).refreshId(row.id);
          this.cdRef.detectChanges();
        }, error => {
          this.dialog.alert("Erro", error);
        });
      }
    });
  }

}

