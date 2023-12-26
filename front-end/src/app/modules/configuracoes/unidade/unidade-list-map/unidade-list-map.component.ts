import { Component, Injector } from '@angular/core';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { TreeNode } from 'primeng/api';
import { QueryContext } from 'src/app/dao/query-context';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { OrganizationChartNodeExpandEvent } from 'primeng/organizationchart';

@Component({
  selector: 'unidade-mapa',
  templateUrl: './unidade-list-map.component.html',
  styleUrls: ['./unidade-list-map.component.scss']
})
export class UnidadeListMapComponent extends PageListBase<Unidade, UnidadeDaoService>{
  public query?: QueryContext<Unidade>;
  public data: TreeNode[] = []

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.dao = injector.get<UnidadeDaoService>(UnidadeDaoService);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.carregaUnidades()
  }

  public async carregaUnidades(){
    let minhaUnidade = this.auth.usuario?.lotacao?.unidade_id
    let unidades = await this.dao!.hierarquiaUnidades(minhaUnidade);

    let caminhoAteARaiz: string[] = [];
    let unidadeAtualId = minhaUnidade;

    while (unidadeAtualId) {
        let unidadeAtual = unidades.find(x => x.id === unidadeAtualId);
        if (unidadeAtual) {
            caminhoAteARaiz.unshift(unidadeAtualId);
            unidadeAtualId = unidadeAtual.unidade_pai_id || undefined;
        } else {
            break;
        }
    }

    let filhos = (unidadeId: string | null): any => {
        return unidades
            .filter(x => x.unidade_pai_id === unidadeId)
            .map(x => ({
                type: 'unidade',
                label: x.sigla,                
                expanded: minhaUnidade === x.id ? false : caminhoAteARaiz.includes(x.id),
                styleClass: minhaUnidade == x.id ? 'text-bg-primary' : '',                
                data: {
                  hint: x.nome,
                  unidade: x,
                },
                children: temFilhos(x.id) ? filhos(x.id) : [{ type: 'fake', expanded: false, label: 'Carregando...' }]
            }));
    };
    let temFilhos = (unidadeId: string) => {
      return unidades.some(x => x.unidade_pai_id === unidadeId);
    };    
    
    this.data = filhos(null);
  }

  expandeUnidade(event: OrganizationChartNodeExpandEvent){   
    this.carregaFilhas(event.node.data.unidade.id, event.node)   
  }


  async carregaFilhas(unidade_id: string, node: TreeNode){
    let unidades = await this.dao!.unidadesFilhas(unidade_id);
    node.children = unidades.map(x => ({
      type: 'unidade',
      label: x.sigla,
      expanded: false,
      data: {
        unidade: x,
        hint: x.nome
      },
      children: [{ type: 'fake', expanded: false, label: 'Carregando...' }]
    }));
  }

}
