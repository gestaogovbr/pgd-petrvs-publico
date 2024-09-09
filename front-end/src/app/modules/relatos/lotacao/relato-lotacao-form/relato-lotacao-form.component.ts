import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
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
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);

    
    this.form = this.fh.FormBuilder({
      situacao: { default: "" },
      usuario_id: { default: "" },
      unidade_id: { default: "" },
      nome: { default: "" },
      cpf: { default: "" },
      matricula: { default: "" },
      descricao: { default: "" },
    });
  }

  public async onSaveData() {

  }

  public onCancel() {
    this.close();
  }
}
