import { Injectable } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { Template } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { LookupItem } from 'src/app/services/lookup.service';

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
      titulo_documento: "Termo de Ciência e Responsabilidade",
      dataset: this.planoTrabalhoDao.dataset(),
      datasource: this.planoTrabalhoDao.datasource(plano),
      template: plano.programa?.template_tcr,
      template_id: plano.programa?.template_tcr_id
    };
  }

  public needSign(parent?: HasDocumentos, item?: Documento): boolean {
    const plano = parent as PlanoTrabalho;
    const documento = item || (plano?.documentos || []).find(x => plano?.documento_id?.length && x.id == plano?.documento_id) || plano?.documento;
    if(parent && documento && !documento.assinaturas?.find(x => x.usuario_id == this.auth.usuario!.id)) {
      const tipoModalidade = plano.tipo_modalidade; 
      const entidade = this.auth.entidade!;
      let ids: string[] = [];
      if (tipoModalidade?.plano_trabalho_assinatura_participante) ids.push(plano.usuario_id);
      if (tipoModalidade?.plano_trabalho_assinatura_gestor_unidade) ids.push(plano.unidade?.gestor_id || "", plano.unidade?.gestor_substituto_id || "");
      if (tipoModalidade?.plano_trabalho_assinatura_gestor_entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
      return !!tipoModalidade && ids.includes(this.auth.usuario!.id);
    }
    return false;
  }

  public extraTags(parent: HasDocumentos, documento: Documento, metadado: any): LookupItem[] {
    const plano = parent as PlanoTrabalho;
    let tags: LookupItem[] = [];
    if(plano?.documento_id == documento.id) tags.push({ key: documento.id, value: "Vigente", icon: "bi bi-check-all", color: "primary" }) 
    if(JSON.stringify(metadado.tags) != JSON.stringify(tags)) metadado.tags = tags;
    return metadado.tags;
  }
}
