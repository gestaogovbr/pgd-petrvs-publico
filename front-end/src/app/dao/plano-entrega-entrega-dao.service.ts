import { Injectable, Injector } from '@angular/core';
import { PlanoEntregaEntrega } from '../models/plano-entrega-entrega.model';
import { DaoBaseService } from './dao-base.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';
import { TreeNode } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class PlanoEntregaEntregaDaoService extends DaoBaseService<PlanoEntregaEntrega> {

  constructor(protected injector: Injector) {
    super("PlanoEntregaEntrega", injector);
    this.inputSearchConfig.searchFields = ["descricao","destinatario"];
  }

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "descricao", label: "Descrição da entrega" },
      { field: "data_inicio", label: "Data início" },
      { field: "data_fim", label: "Data fim" },
      { field: "homologado", label: "Se a entrega já foi homologada" },
      { field: "progresso_esperado", label: "Percentual de progesso esperado da entrega" },
      { field: "progresso_realizado", label: "Percentual de progesso realizado da entrega" },
      { field: "destinatario", label: "Destinatário da entrega" }
    ], deeps);
  }

  public hierarquia(PlanoEntregaEntregaId: string): Promise<TreeNode[]>{
    return new Promise<any>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/hierarquia', {
        entrega_id: PlanoEntregaEntregaId
      }).subscribe(response => {
        resolve(this.loadHierarquiaDados(response.hierarquia, PlanoEntregaEntregaId));
      }, error => {
        console.log("Erro ao montar a hierarquia da entrega!", error);
        resolve([]);
      });
    });
  }

  private loadHierarquiaDados(data: any, entrega_id: string): TreeNode[] {
    const entregaAtual: TreeNode = this.mapHierarquia(data, entrega_id);
    const children = data.filhos ? data.filhos.flatMap((filho: any) => this.loadHierarquiaDados(filho, entrega_id)) : [];
  
    if (data.pai) {
      const pai: TreeNode = this.mapHierarquia(data.pai, entrega_id);
      return [ { ...pai, children: [ { ...entregaAtual, children } ] } ];
    } 
  
    return [ { ...entregaAtual, children } ];
  }
  
  private mapHierarquia(data: any, entrega_id: string): TreeNode {
    return {
      label: data.descricao,
      key: data.id,
      data: data,
      expanded: true,
      styleClass: entrega_id == data.id ? 'bg-primary text-white' : '',
      children: [],
    };
  }

  public possuiVinculosExcluidos(entregaIds: string[]): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      this.server.post('api/' + this.collection + '/possui-vinculos-excluidos', {
        entregaIds: entregaIds
      }).subscribe({
        next: (response) => {
          resolve(response?.vinculos_excluidos || []);
        },
        error: (error) => {
          console.error("Erro ao verificar vínculos excluídos da entrega:", error);
          resolve([]);
        }
      });
    })
  }

}

