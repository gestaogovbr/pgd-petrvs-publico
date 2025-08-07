import { Injectable } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { PlanoTrabalhoEntrega, PlanoTrabalhoEntregaTipo } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Template } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { TemplateService } from '../../uteis/templates/template.service';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { Programa } from 'src/app/models/programa.model';
import { UtilService } from 'src/app/services/util.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { PageBase } from '../../base/page-base';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';

export type RefreshConsolidacao = (consolidacao: PlanoTrabalhoConsolidacao) => void;

export type BadgeTrabalho = {
  titulo: string,
  cor: string,
  nome: string,
  descricao: string,
  tipo: PlanoTrabalhoEntregaTipo
}

export type AssinaturaList = { 
  "participante": string[], 
  "gestores_unidade_executora": string[], 
  "gestores_unidade_lotacao": string[], 
  "gestores_entidade": string[], 
  "todas"?: string[]
};

@Injectable({
  providedIn: 'root'
})
export class PlanoTrabalhoService {

  constructor(
    public auth: AuthService,
    public util: UtilService,
    public go: NavigateService,
    public lookup: LookupService,
    public dao: PlanoTrabalhoDaoService,
    public avaliacaoDao: AvaliacaoDaoService,
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
      if (programa?.plano_trabalho_assinatura_gestor_lotacao) ids.push(...this.auth.gestoresLotacao.map(x => x.id));
      if (programa?.plano_trabalho_assinatura_gestor_unidade) ids.push(plano.unidade?.gestor?.id || "", ...plano.unidade?.gestores_substitutos?.map(x => x.id) || "");
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
   * Método retorna um badge de acordo com o tipo de entrega recebida no parâmetro 'planoTrabalhoEntrega'. Esse tipo poderá ser 'entrega associada a uma entrega da própria unidade', 
   * 'entrega associada a uma entrega de outra unidade', 'entrega associada a outro órgão/entidade', ou ainda 'entrega não vinculada'.
   * @param planoTrabalhoEntrega  Entrega do Plano de Trabalho cujo tipo será analisado.
   * @param planoTrabalho         Plano de Trabalho ao qual pertence a entrega a ser analisada. Se não for informado, o método tentará obtê-lo diretamente da própria entrega recebida.
   * @returns 
   */
  public tipoEntrega(planoTrabalhoEntrega: PlanoTrabalhoEntrega, planoTrabalho?: PlanoTrabalho): BadgeTrabalho {
    /* Se planoTrabalhoEntrega for uma entrega vinda do banco de dados, e pertencer a alguma unidade (seja ela a própria do plano de trabalho, ou outra), ela traz consigo planoTrabalhoEntrega.plano_entrega_entrega?.plano_entrega?.unidade_id,
       que será usado para definir a qual tipo de unidade ela está vinculada (própria ou outra). Se planoTrabalhoEntrega não estiver vinculada a nenhuma unidade, ela poderá possuir planoTrabalhoEntrega.orgao 
       (caso em que estará 'vinculada a outro órgão/entidade'), ou não (caso em que será uma 'entrega não vinculada').
       Se planoTrabalhoEntrega não vier do banco, ou seja, acabou de ser incluída no grid, ela passou pelo método saveEntrega() e lá foi anexado o objeto 'plano?._metadata?.novaEntrega'. */
    let plano = planoTrabalho || planoTrabalhoEntrega.plano_trabalho;
    let key: PlanoTrabalhoEntregaTipo = planoTrabalhoEntrega.plano_entrega_entrega?.plano_entrega?.unidade_id == plano!.unidade_id ? "PROPRIA_UNIDADE" :
      (planoTrabalhoEntrega.plano_entrega_entrega ? "OUTRA_UNIDADE" : 
      (!!planoTrabalhoEntrega.orgao?.length ? "OUTRO_ORGAO" : "SEM_ENTREGA"));
    let result = this.lookup.ORIGENS_ENTREGAS_PLANO_TRABALHO.find(x => x.key == key) || {key: "", value: "Desconhecido1"};
    let nome = plano?._metadata?.novaEntrega?.plano_entrega_entrega?.entrega?.nome || planoTrabalhoEntrega.plano_entrega_entrega?.entrega?.nome || "Desconhecido2";
    let descricao = plano?._metadata?.novaEntrega?.plano_entrega_entrega?.descricao || planoTrabalhoEntrega.plano_entrega_entrega?.descricao || "";
    return { titulo: result.value, cor: result.color || "danger", nome: nome, tipo: key, descricao: descricao};
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
    if (planoNovo.usuario && planoNovo.unidade) {
      let dsReferencia = this.dao!.datasource(planoReferencia);
      let dsNovo = this.dao!.datasource(planoNovo);
      let programa = planoNovo.programa;      
      /* Atualiza os campos de texto complementar do usuário e da unidade */
      dsNovo.usuario.texto_complementar_plano = textUsuario || planoNovo.usuario?.texto_complementar_plano || "";
      dsNovo.unidade.texto_complementar_plano = textUnidade || planoNovo.unidade?.texto_complementar_plano || "";
      /* Se tiver modificações e o termo for obrigatório ou já exista um documento */
      if ((programa?.termo_obrigatorio || planoNovo.documento_id?.length) && JSON.stringify(dsNovo) != JSON.stringify(dsReferencia) && programa?.template_tcr) {
        let documento = planoNovo.documentos?.find((x: Documento) => x.id == planoNovo.documento_id);
        if (!planoNovo.documento_id?.length || !documento || documento.assinaturas?.length || documento.tipo == "LINK") {          
          documento = new Documento({
            id: this.dao?.generateUuid(),
            tipo: "HTML",
            especie: "TCR",
            titulo: "Termo de Ciência e Responsabilidade",
            conteudo: this.templateService.renderTemplate(planoReferencia.documento?.conteudo || programa?.template_tcr?.conteudo || "", dsNovo),
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
          documento.conteudo = this.templateService.renderTemplate(planoReferencia.documento?.conteudo || "", dsNovo);
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

  /**
   * Informa a situação do plano de trabalho recebido como parâmetro, ou seja, se foi EXCLUIDO ou ARQUIVADO, ou, caso contrário, o seu status atual.
   * @param planoTrabalho 
   * @returns 
   */
  public situacaoPlano(planoTrabalho: PlanoTrabalho): string {
    if (planoTrabalho.deleted_at) return "EXCLUIDO";
    else if (planoTrabalho.data_arquivamento) return "ARQUIVADO";
    else return planoTrabalho.status!;
  }

  /**
   * Informa se o plano de trabalho recebido como parâmetro é válido, ou seja, não foi deletado, não foi cancelado nem foi arquivado.
   * @param planoTrabalho 
   * @returns 
   */
    public isValido(planoTrabalho: PlanoTrabalho): boolean {
      return !planoTrabalho.deleted_at && planoTrabalho.status != 'CANCELADO' && !planoTrabalho.data_arquivamento;
    }

    public estaVigente(planoTrabalho: PlanoTrabalho): boolean {
      let hoje = new Date();
      return planoTrabalho.status == 'ATIVO' && planoTrabalho.data_inicio <= hoje && planoTrabalho.data_fim >= hoje
    }

  /**
   * Calcula a quantidade de dias para concluir a consolidação considerando a tolerância configurada no programa.
   * @param consolidacao  Consolidacao do plano de trabalho
   * @param programa      Programa
   * @returns             Quantidade de dias para conclusão (Retorna números negativos caso tenha passado o prazo)
   */
  public diasParaConcluirConsolidacao(consolidacao?: PlanoTrabalhoConsolidacao, programa?: Programa): number {
    return !consolidacao || !programa ? -1 : this.util.daystamp(consolidacao.data_fim) + programa.dias_tolerancia_avaliacao - this.util.daystamp(this.auth.hora);
  }

  /**
   * Faz avaliação da consolidação
   * @param consolidacao 
   * @param programa
   * @param refresh
   */
  public avaliar(consolidacao: PlanoTrabalhoConsolidacao, programa: Programa, refresh: RefreshConsolidacao) {
    this.go.navigate({route: ['gestao', 'plano-trabalho', 'consolidacao', consolidacao.id, 'avaliar']}, {
      modal: true, 
      metadata: {
        consolidacao: consolidacao,
        programa: programa
      },
      modalClose: (modalResult?: Avaliacao) => {
        if(modalResult) {
          consolidacao.status = "AVALIADO";
          consolidacao.avaliacao_id = modalResult.id;
          consolidacao.avaliacao = modalResult;
          refresh(consolidacao); 
        }
      }
    });
  }

  /**
   * Visualiza avaliações da consolidação
   * @param consolidacao 
   */
  public visualizarAvaliacao(consolidacao: PlanoTrabalhoConsolidacao) {
    this.go.navigate({route: ['gestao', 'plano-trabalho', 'consolidacao', consolidacao.id, 'verAvaliacoes']}, {
      modal: true, 
      metadata: {
        consolidacao: consolidacao,
      }
    });
  }

  /**
   * Fas recurso contra avaliação
   * @param consolidacao 
   * @param programa
   * @param refresh
   */
  public fazerRecurso(consolidacao: PlanoTrabalhoConsolidacao, programa: Programa, refresh: RefreshConsolidacao) {
    this.go.navigate({route: ['gestao', 'plano-trabalho', 'consolidacao', consolidacao.id, 'recurso']}, {
      modal: true, 
      metadata: {
        recurso: ['Inadequado', 'Não executado'].includes(consolidacao!.avaliacao?.nota),
        consolidacao: consolidacao,
        programa: programa
      },
      modalClose: (modalResult?: Avaliacao) => {
        if(modalResult) {
          consolidacao.avaliacao = modalResult;
          refresh(consolidacao);
        }
      }
    });
  }

  public async cancelarAvaliacao(consolidacao: PlanoTrabalhoConsolidacao, page: PageBase, refresh: RefreshConsolidacao) {
    page.submitting = true;
    try {
      let response = await this.avaliacaoDao!.cancelarAvaliacao(consolidacao.avaliacao!.id);
      if(response) {
        consolidacao.status = "CONCLUIDO";
        consolidacao.avaliacao_id = null;
        consolidacao.avaliacao = undefined;
        refresh(consolidacao);
      }
    } catch (error: any) {
      page.error(error.message || error);
    } finally {
      page.submitting = false;
    }
  }

  public usuarioAssinou(assinaram: AssinaturaList, usuarioId?: string): boolean {
    usuarioId = usuarioId || this.auth.usuario!.id;
    return Object.values(assinaram).some(arrayAssinaturas => (arrayAssinaturas || []).includes(usuarioId!));
  }

  public assinaturasFaltantes(exigidas: AssinaturaList, assinaram: AssinaturaList): AssinaturaList {
    return {
      "participante": exigidas.participante.filter(x => !assinaram.participante.includes(x)),
      "gestores_unidade_executora": !exigidas.gestores_unidade_executora.length ? [] : (exigidas.gestores_unidade_executora.filter(x => assinaram.gestores_unidade_executora.includes(x)).length ? [] : exigidas.gestores_unidade_executora),
      "gestores_unidade_lotacao": !exigidas.gestores_unidade_lotacao.length ? [] : (exigidas.gestores_unidade_lotacao.filter(x => assinaram.gestores_unidade_lotacao.includes(x)).length ? [] : exigidas.gestores_unidade_lotacao),
      "gestores_entidade": !exigidas.gestores_entidade.length ? [] : (exigidas.gestores_entidade.filter(x => assinaram.gestores_entidade.includes(x)).length ? [] : exigidas.gestores_entidade),
    };
  }


}
