import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { GridComponent } from '../components/grid/grid.component';
import { DaoBaseService } from '../dao/dao-base.service';
import { Base } from '../models/base.model';
import { Comentario } from '../models/comentario';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    public util: UtilService, 
    public auth: AuthService,
    public dao: DaoBaseService<Base>
  ) { }

  public comentarioLevel(comentario: Comentario): string[] {
    return (comentario.path || "").split("").filter(x => x == "/");
  }

  public orderComentarios(comentarios?: Comentario[]) {
    let ordered = comentarios?.sort((a: Comentario, b: Comentario) => {
      if(a.path == b.path) { /* Situação 1: Paths iguais */
        return a.data_hora.getTime() < b.data_hora.getTime() ? -1 : 1;
      } else { /* Situação 2: Paths diferentes, deverá ser encontrado o menor nível comum entre eles para poder comparar */
        let pathA = a.path.split("/");
        let pathB = b.path.split("/");
        let common = this.util.commonBegin(pathA, pathB);
        let dataHoraA = (comentarios.find(x => x.id == (pathA[common.length] || a.id)) || a).data_hora.getTime();
        let dataHoraB = (comentarios.find(x => x.id == (pathB[common.length] || b.id)) || b).data_hora.getTime();
        return dataHoraA == dataHoraB ? 0 : (dataHoraA < dataHoraB ? -1 : 1);
      }
    }) || [];
    return ordered;
  }

  public newComentario(control: AbstractControl, grid: GridComponent, pai?: Comentario) {
    const comentario = new Comentario();
    const comentarios = control.value || [];
    comentario.id = this.dao!.generateUuid();
    comentario.path = pai ? pai.path + "/" + pai.id : "";
    comentario.data_hora = this.auth.hora;
    comentario.usuario_id = this.auth.usuario!.id;
    comentario.comentario_id = pai?.id || null;
    comentario.usuario = this.auth.usuario;
    comentario._status = "ADD";
    comentarios.push(comentario);
    control.setValue(this.orderComentarios(comentarios));
    grid.adding = true;
    grid.edit(comentario);
    return comentario;
  }

}
