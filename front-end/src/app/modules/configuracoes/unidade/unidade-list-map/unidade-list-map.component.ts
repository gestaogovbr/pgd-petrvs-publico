import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { TreeNode } from 'primeng/api';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
    selector: 'unidade-mapa',
    templateUrl: './unidade-list-map.component.html',
    styleUrls: ['./unidade-list-map.component.scss'],
    standalone: false
})
export class UnidadeListMapComponent extends PageFrameBase {
  public data: TreeNode[] = [];
  private unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.carregaUnidades()
  }

  public async carregaUnidades(){
    let minhaUnidadeId = this.auth.usuario?.lotacao?.unidade_id;
    let todasUnidades = await this.unidadeDao!.hierarquiaUnidades(minhaUnidadeId);

    // Encontra as raízes (unidades sem pai ou cujo pai não está na lista)
    let idsNaLista = new Set(todasUnidades.map(u => u.id));
    let raizes = todasUnidades.filter(u => !u.unidade_pai_id || !idsNaLista.has(u.unidade_pai_id));

    this.data = raizes.map(raiz => this.montaNoRecursivo(raiz, todasUnidades, minhaUnidadeId));
    this.cdRef.detectChanges();
  }

  montaNoRecursivo(unidade: Unidade, lista: Unidade[], minhaUnidadeId?: string): TreeNode {
      let filhos = lista.filter(x => x.unidade_pai_id === unidade.id);
      
      // Expande se for a unidade do usuário ou um de seus ancestrais
      let expanded = false;
      if (minhaUnidadeId) {
          expanded = this.isAncestral(unidade.id, minhaUnidadeId, lista) || unidade.id === minhaUnidadeId;
      }

      return {
          type: 'unidade',
          label: unidade.sigla,
          expanded: expanded, 
          styleClass: minhaUnidadeId === unidade.id ? 'text-bg-primary' : '',
          data: {
              unidade: unidade,
              hint: unidade.nome
          },
          children: filhos.map(f => this.montaNoRecursivo(f, lista, minhaUnidadeId))
      };
  }

  isAncestral(possivelAncestralId: string, unidadeAlvoId: string, lista: Unidade[]): boolean {
      let atual = lista.find(x => x.id === unidadeAlvoId);
      while(atual && atual.unidade_pai_id) {
          if (atual.unidade_pai_id === possivelAncestralId) return true;
          atual = lista.find(x => x.id === atual!.unidade_pai_id);
      }
      return false;
  }
  
  public toggle(event: Event, node: TreeNode) {
      event.stopPropagation();
      node.expanded = !node.expanded;
  }

}
