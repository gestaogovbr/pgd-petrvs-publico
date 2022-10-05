import { Injectable } from '@angular/core';
import { ProjetoRecurso } from 'src/app/models/projeto-recurso.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor() { }

  public getRecursoPicture(recurso: ProjetoRecurso): string {
    return (!recurso ? "assets/images/projetos/material.png" :
           (recurso.tipo == "HUMANO" ? recurso.usuario?.url_foto || "assets/images/projetos/usuario.png" :
           (recurso.tipo == "CUSTO" ? "assets/images/projetos/custo.png" :
           (recurso.tipo == "DEPARTAMENTO" ? "assets/images/projetos/unidade.png" :
           (recurso.tipo == "SERVICO" ? "assets/images/projetos/servico.png" : "assets/images/projetos/material.png")))));
  }
}
