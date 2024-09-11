import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { RelatoDaoService } from 'src/app/dao/relato-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PageBase } from 'src/app/modules/base/page-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-relato-lotacao-form',
  templateUrl: './relato-lotacao-form.component.html',
  styleUrls: ['./relato-lotacao-form.component.scss']
})
export class RelatoLotacaoFormComponent extends PageBase implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;

  public form: FormGroup;
  public relatoDao: RelatoDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public mensagemCarregando = "Carregando dados do formulário...";
  public mensagemSalvando = "Salvando dados do formulário...";

  public OPTIONS: LookupItem[] = [
    { key: "1", value: "O agente público mudou de unidade dentro do próprio órgão/entidade e o Petrvs não atualizou sua lotação." },
    { key: "2", value: "O agente público está cedido para outro órgão/entidade e o Petrvs o mantém na base de dados deste órgão/entidade."  },
    { key: "3", value: "O agente público está cedido para este órgão/entidade, mas no Petrvs ainda não consta na base de dados."  },
    { key: "4", value: "Outros"  }
  ];

  constructor(public injector: Injector) {
    super(injector);
    this.relatoDao = injector.get<RelatoDaoService>(RelatoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);

    
    this.form = this.fh.FormBuilder({
      opcao: { default: "" },
      usuario_id: { default: "" },
      unidade_id: { default: "" },
      nome: { default: "" },
      cpf: { default: "" },
      matricula: { default: "" },
      descricao: { default: "" },
    });
  }

  public async onSaveData() {
    this.relatoDao.enviar(
      this.form.controls.opcao.value,
      this.form.controls.usuario_id.value,
      this.form.controls.unidade_id.value,
      this.form.controls.nome.value,
      this.form.controls.cpf.value,
      this.form.controls.matricula.value,
      this.form.controls.descricao.value
    ).subscribe({
      next: async(result) => {
        await this.dialog.alert('Problema relatado com sucesso', 'Obrigado por relatar este problema')
        this.close();
      },
      error: error => {
        this.editableForm!.error = error.message ? error.message : error;
        console.error('Erro:', error)
      }
    })
  }

  public onCancel() {
    this.close();
  }
}
