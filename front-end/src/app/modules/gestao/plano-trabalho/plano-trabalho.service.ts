import { Injectable } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { PlanoTrabalhoEntrega, PlanoTrabalhoEntregaTipo } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Template } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { TemplateService } from '../../uteis/templates/template.service';

export type BadgeEntrega = {
  titulo: string,
  cor: string,
  nome: string,
  tipo: PlanoTrabalhoEntregaTipo
}

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoService {

  constructor(
    public auth: AuthService,
    public lookup: LookupService,
    public dao: PlanoTrabalhoDaoService,
    public templateService: TemplateService,
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
      const programa = plano.programa;
      const entidade = this.auth.entidade!;
      let ids: string[] = [];
      if (programa?.plano_trabalho_assinatura_participante) ids.push(plano.usuario_id);
      if (programa?.plano_trabalho_assinatura_gestor_unidade) ids.push(plano.unidade?.gestor?.id || "", plano.unidade?.gestor_substituto?.id || "");
      if (programa?.plano_trabalho_assinatura_gestor_entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
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
  public tipoEntrega(planoTrabalhoEntrega: PlanoTrabalhoEntrega, planoTrabalho?: PlanoTrabalho): BadgeEntrega {
    /* Se row for uma entrega vinda do banco de dados, ela já deve trazer consigo um dos seus relacionamentos: 'entrega' ou 'plano_entrega_entrega', que serão lidos diretamente de row quando necessário. 
        Se row não vier do banco, ela passou pelo método saveEntrega() e lá um desses objetos, escolhido em um dos 3 inputSearch, foi anexado à variável this.novaEntrega, que originalmente é vazia. Sendo assim,
        quando necessário, os dados serão lidos em this.novaEntrega.entrega ou em this.novaEntrega.plano_entrega_entrega. */
    let plano = planoTrabalho || planoTrabalhoEntrega.plano_trabalho;
    let key: PlanoTrabalhoEntregaTipo = planoTrabalhoEntrega.plano_entrega_entrega?.plano_entrega?.unidade_id == plano!.unidade_id ? "PROPRIA_UNIDADE" :
      (planoTrabalhoEntrega.plano_entrega_entrega ? "OUTRA_UNIDADE" : 
      (!!planoTrabalhoEntrega.orgao?.length ? "OUTRO_ORGAO" : "SEM_ENTREGA"));
    let result = this.lookup.ORIGENS_ENTREGAS_PLANO_TRABALHO.find(x => x.key == key) || {key: "", value: "Desconhecido"};
    let nome = plano?._metadata?.novaEntrega?.plano_entrega_entrega?.entrega?.nome || planoTrabalhoEntrega.plano_entrega_entrega?.entrega?.nome || "Desconhecido";
    return { titulo: result.value, cor: result.color || "danger", nome: nome, tipo: key};
  }

  /**
   * Método atualiza o TCR caso ele exista (possivelmente obrigatório pelo programa), e caso ele não esteja assinado. 
   * Em caso de estar assinado ou ser obrigatório e não exista ainda, será gerado um novo documento.
   * @param planoReferencia  Plano de trabalho para comparação (contendo as entregas)
   * @param planoNovo        Plano de trabalho modificado, com as novas informações (contendo as entregas, programa.template_tcr e documentos)
   * @param ?textUsuario     Texto complementar do usuário, caso não seja informado, irá utilizar o do planoNovo.usuario.texto_complementar_plano
   * @param ?textUnidade     Texto complementar da unidade, caso não seja informado, irá utilizar o do planoNovo.unidade.texto_complementar_plano
   * @returns                Documento gerado ou modificado (observar o _status)
   */
  public atualizarTcr(planoReferencia: PlanoTrabalho, planoNovo: PlanoTrabalho, textUsuario?: string, textUnidade?: string) {
    if(planoNovo.usuario && planoNovo.unidade) {
      let dsReferencia = this.dao!.datasource(planoReferencia);
      let dsNovo = this.dao!.datasource(planoNovo);
      let programa = planoNovo.programa;
      /* Atualiza os campos de texto complementar do usuário e da unidade */
      dsNovo.usuario.texto_complementar_plano = textUsuario || planoNovo.usuario?.texto_complementar_plano || "";
      dsNovo.unidade.texto_complementar_plano = textUnidade || planoNovo.unidade?.texto_complementar_plano || "";
      /* Se tiver modificações e o termo for obrigatório ou já exista um documento */
      if((programa?.termo_obrigatorio || planoNovo.documento_id?.length) && JSON.stringify(dsNovo) != JSON.stringify(dsReferencia) && programa?.template_tcr) {
        let documento = planoNovo.documentos?.find((x: Documento) => x.id == planoNovo.documento_id);
        if(!planoNovo.documento_id?.length || !documento || documento.assinaturas?.length || documento.tipo == "LINK") {
          documento = new Documento({
            id: this.dao?.generateUuid(), 
            tipo: "HTML",
            especie: "TCR",
            titulo: "Termo de Ciência e Responsabilidade",
            conteudo: this.templateService.renderTemplate(programa?.template_tcr?.conteudo || "", dsNovo),
            status: "GERADO",
            _status: "ADD",
            template: programa?.template_tcr?.conteudo,
            dataset: this.dao!.dataset(),
            datasource: dsNovo,
            entidade_id: this.auth.entidade?.id,
            plano_trabalho_id: planoNovo.id,
            template_id: programa?.template_tcr_id
          });
          planoNovo.documentos.push(documento);
        } else {
          documento.conteudo = this.templateService.renderTemplate(programa?.template_tcr?.conteudo || "", dsNovo);
          documento.dataset = this.dao!.dataset();
          documento.datasource = dsNovo;
          documento._status = documento._status == "ADD" ? "ADD" : "EDIT"; 
        }
        planoNovo.documento = documento;
        planoNovo.documento_id = documento?.id || null;
      }
    }
    return planoNovo.documento;
  }
}
