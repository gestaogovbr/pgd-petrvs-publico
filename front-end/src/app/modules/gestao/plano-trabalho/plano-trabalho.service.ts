import { Injectable } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Template } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { LookupItem } from 'src/app/services/lookup.service';

export type badgeEntrega = {
  titulo: string,
  cor: string,
  nome: string
}

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoService {

  constructor(
    public auth: AuthService,
    public planoTrabalhoDao: PlanoTrabalhoDaoService
  ) { }

  public template(plano: PlanoTrabalho): Template | undefined {
    return plano.programa?.template_tcr;
  }

  public metadados(plano: PlanoTrabalho) {
    return {
      needSign: this.needSign.bind(this),
      extraTags: this.extraTags.bind(this),
      especie: "TCR",
      titulo: "Termo de Ciência e Responsabilidade",
      dataset: this.planoTrabalhoDao.dataset(),
      datasource: this.planoTrabalhoDao.datasource(plano),
      template: plano.programa?.template_tcr,
      template_id: plano.programa?.template_tcr_id
    };
  }

  public needSign(parent?: HasDocumentos, item?: Documento): boolean {
    const plano = parent as PlanoTrabalho;
    const documento = item || (plano?.documentos || []).find(x => plano?.documento_id?.length && x.id == plano?.documento_id) || plano?.documento;
    if (parent && documento && !documento.assinaturas?.find(x => x.usuario_id == this.auth.usuario!.id)) {
      const tipoModalidade = plano.tipo_modalidade;
      const entidade = this.auth.entidade!;
      let ids: string[] = [];
      if (tipoModalidade?.plano_trabalho_assinatura_participante) ids.push(plano.usuario_id);
      if (tipoModalidade?.plano_trabalho_assinatura_gestor_unidade) ids.push(plano.unidade?.gestor?.id || "", plano.unidade?.gestor_substituto?.id || "");
      if (tipoModalidade?.plano_trabalho_assinatura_gestor_entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
      return !!tipoModalidade && ids.includes(this.auth.usuario!.id);
    }
    return false;
  }

  public extraTags(parent: HasDocumentos, documento: Documento, metadado: any): LookupItem[] {
    const plano = parent as PlanoTrabalho;
    let tags: LookupItem[] = [];
    if (plano?.documento_id == documento.id) tags.push({ key: documento.id, value: "Vigente", icon: "bi bi-check-all", color: "primary" })
    if (JSON.stringify(metadado.tags) != JSON.stringify(tags)) metadado.tags = tags;
    return metadado.tags;
  }

  /**
   * Método retorna um badge de acordo com o tipo de entrega recebida no parâmetro 'planoTrabalhoEntrega': entrega associada a uma entrega do catálogo, entrega associada a uma entrega 
   * da mesma unidade, ou entrega associada a uma entrega de outra unidade.
   * @param planoTrabalhoEntrega  Entrega do Plano de Trabalho cujo tipo será analisado.
   * @param planoTrabalho         Plano de Trabalho ao qual pertence a entrega a ser analisada. Se não for informado, o método tentará obtê-lo diretamente da própria entrega recebida.
   * @returns 
   */
  public tipoEntrega(planoTrabalhoEntrega: PlanoTrabalhoEntrega, planoTrabalho?: PlanoTrabalho): badgeEntrega {
    /* Se row for uma entrega vinda do banco de dados, ela já deve trazer consigo um dos seus relacionamentos: 'entrega' ou 'plano_entrega_entrega', que serão lidos diretamente de row quando necessário. 
        Se row não vier do banco, ela passou pelo método saveEntrega() e lá um desses objetos, escolhido em um dos 3 inputSearch, foi anexado à variável this.novaEntrega, que originalmente é vazia. Sendo assim,
        quando necessário, os dados serão lidos em this.novaEntrega.entrega ou em this.novaEntrega.plano_entrega_entrega. */
    let plano = planoTrabalho || planoTrabalhoEntrega.plano_trabalho;
    if (!!planoTrabalhoEntrega.entrega_id?.length) return { titulo: 'Catálogo', cor: 'secondary', nome: !!plano?._metadata.novaEntrega?.entrega?.id?.length ? plano._metadata.novaEntrega?.entrega?.nome || "Desconhecido" : planoTrabalhoEntrega.entrega?.nome || "Desconhecido1" };
    let IdDoPlanoEntregaDoPlanoTrabalho: string, IdDoPlanoEntregaDaEntrega: string, badge: string, nome: string, cor: string;
    IdDoPlanoEntregaDoPlanoTrabalho = plano?.plano_entrega_id || plano?._metadata.idPlanoEntregas || 'Desconhecido2';
    IdDoPlanoEntregaDaEntrega = !!plano?._metadata.novaEntrega?.plano_entrega_entrega?.id.length ? plano?._metadata.novaEntrega?.plano_entrega_entrega?.plano_entrega_id || "Desconhecido3" : planoTrabalhoEntrega.plano_entrega_entrega?.plano_entrega_id || "Desconhecido4";
    [badge, cor] = IdDoPlanoEntregaDoPlanoTrabalho == IdDoPlanoEntregaDaEntrega ? ['Mesma unidade', 'success'] : ['Outra unidade', 'primary'];
    nome = !!plano?._metadata.novaEntrega?.plano_entrega_entrega?.id.length ? plano?._metadata.novaEntrega?.plano_entrega_entrega?.entrega?.nome || "Desconhecido5" : planoTrabalhoEntrega.plano_entrega_entrega?.entrega?.nome || "Desconhecido6";
    return { titulo: badge, cor: cor, nome: nome };
  }

}
