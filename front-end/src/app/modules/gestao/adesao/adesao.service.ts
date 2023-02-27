import { Injectable } from '@angular/core';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { AdesaoDaoService } from 'src/app/dao/adesao-dao.service';
import { Adesao } from 'src/app/models/adesao.model';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { Template } from 'src/app/models/template.model';
import { TipoModalidade } from 'src/app/models/tipo-modalidade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { AuthService } from 'src/app/services/auth.service';
import { LookupItem } from 'src/app/services/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class AdesaoService {
  
  constructor(
    public auth: AuthService,
    public adesaoDao: AdesaoDaoService
  ) { }

  public metadados(adesao: Adesao) {
    return {
      needSign: this.needSign.bind(this),
      extraTags: this.extraTags.bind(this),
      especie: "TCR",
      dataset: this.adesaoDao.dataset(),
      datasource: this.adesaoDao.datasource(adesao),
      template: this.auth.unidade?.entidade?.template_adesao,
      template_id: this.auth.unidade?.entidade?.template_adesao_id
    };
  }

  public needSign(adesao: Adesao, documento: Documento): boolean {
    const tipoModalidade = adesao.tipo_modalidade; 
    const entidade = this.auth.unidade?.entidade;
    const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
    let ids: string[] = [];
    if (tipoModalidade?.exige_assinatura) ids.push(...adesao.usuarios!.map(x => x.id));
    if (tipoModalidade?.exige_assinatura_gestor_unidade) ids.push(...adesao.unidades!.map(x => x.unidade?.gestor_id || ""), ...adesao.unidades!.map(x => x.unidade?.gestor_substituto_id || ""));
    if (tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    return !alredySigned && !!tipoModalidade && ids.includes(this.auth.usuario!.id);
  }

  public extraTags(adesao: Adesao, documento: Documento, metadado: any): LookupItem[] {
    let tags: LookupItem[] = [];
    if(adesao.documento_id == documento.id) tags.push({ key: documento.id, value: "Vigente", icon: "bi bi-check-all", color: "primary" }) 
    if(JSON.stringify(metadado.tags) != JSON.stringify(tags)) metadado.tags = tags;
    return metadado.tags; 
  }
}
