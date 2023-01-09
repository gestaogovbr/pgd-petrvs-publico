import { Component, Injector, OnInit } from '@angular/core';
import { TipoProcessoDaoService, TipoProcessoSei } from 'src/app/dao/tipo-processo-dao.service';
import { ListenerBase } from '../listener-base';

@Component({
  selector: 'app-procedimento-escolher-tipo',
  templateUrl: './procedimento-escolher-tipo.component.html',
  styleUrls: ['./procedimento-escolher-tipo.component.scss']
})
export class ProcedimentoEscolherTipoComponent extends ListenerBase implements OnInit {

  public tipoProcessoDao: TipoProcessoDaoService;

  constructor(public injector: Injector) {
    super(injector, "procedimento_escolher_tipo");
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public async loadToolbarButtons() {
    this.gb.toolbarButtons = [{
      icon: "bi bi-folder-check",
      color: "btn-outline-primary",
      hint: "Atualizar tipos de processos",
      onClick: this.atualizarTiposProcessos.bind(this) 
    }];
  }

  public async atualizarTiposProcessos() {
    let tiposProcessos = await this.execute<TipoProcessoSei[]>("getTiposProcessos", []);
    if(await this.tipoProcessoDao.atualizar(tiposProcessos)) {
      this.dialog.alert("Atualização", "Atualização realizada com sucesso!");
    } else {
      this.dialog.alert("ERROR", "Aconteceu algum problema ao tentar realizar a atualização!");
    }
  }

}
