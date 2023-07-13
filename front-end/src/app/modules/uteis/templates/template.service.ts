import { Injectable } from '@angular/core';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { TemplateDaoService } from 'src/app/dao/template-dao.service';
import { NotificacoesConfig } from 'src/app/models/notificacao.model';
import { Template, TemplateEspecie } from 'src/app/models/template.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FullRoute } from 'src/app/services/navigate.service';
import { Notificar } from '../notificacoes/notificacoes-config/notificacoes-config.component';

export type TemplateNotificacao = {
  codigo: string,
  descricao: string,
  dataset: TemplateDataset[],
  template: string
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  public notificacoes: TemplateNotificacao[] = [];
  public notifica = { petrvs: false, email: false, whatsapp: false };

  constructor(
    public planoDao: PlanoTrabalhoDaoService,
    public templateDao: TemplateDaoService,
    public auth: AuthService,
    public dialog: DialogService
  ) { }

  public selectRoute(especie: TemplateEspecie): FullRoute {
    return {route: ['uteis', 'templates', especie]};
  }

  public details(data: any) {
    const template = data.entity as Template;
    this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, template.conteudo!, []);
  }

  public dataset(especie: TemplateEspecie, codigo?: string): TemplateDataset[] {
    let result: TemplateDataset[] = [];
    if(["TCR", "TERMO_ADESAO"].includes(especie)) {
      result = this.planoDao.dataset();
    } else if(especie == "NOTIFICACAO") {
      result = this.notificacoes.find(x => x.codigo == codigo)?.dataset || [];
    }
    return result; 
  }

  public titulo(especie: TemplateEspecie): string {
    return especie == "TCR" ? "Termo de ciência e responsabilidade" : "";
  }

  public template(especie: TemplateEspecie, extra?: any): Template | undefined {
    return undefined; //especie == "TCR" ? this.auth.entidade?.template_adesao : undefined;
    /* Continuar aqui */
  }

  public prepareDatasetToSave(dataset: TemplateDataset[]): TemplateDataset[] {
    for(let item of dataset) {
      item.dao = undefined;
      if(["OBJECT", "ARRAY"].includes(item.type || "")) this.prepareDatasetToSave(item.fields || []);
    }
    return dataset;
  }  

  public async loadNotificacoes(entidadeId?: string, unidadeId?: string) {
    let result: Template[] = [];
    if(entidadeId || unidadeId || !this.notificacoes?.length) {
      let where: any[] = [["especie", "==", "NOTIFICACAO"]];
      where.push(entidadeId?.length ? ["entidade_id", "==", entidadeId] : (unidadeId?.length ? ["unidade_id", "==", unidadeId] : ["id", "==", null]));
      let query = this.templateDao.query({
        where: where,
        orderBy: [],
        join: [],
        limit: undefined
      });
      result = await query.asPromise();
      this.notificacoes = (query.extra?.notificacoes as TemplateNotificacao[])?.sort((a, b) => a.codigo < b.codigo ? -1 : 1) || [];
      this.notifica = Object.assign(this.notifica, query.extra?.notifica_enviroment || {});
    }
    return result;
  }

  public buildItems(source: Template[], value?: Template[], naoNotificar?: string[]) {
    return this.notificacoes.map(x => {
      let v = value?.find(y => y.codigo == x.codigo);
      let s = source.filter(y => y.codigo == x.codigo && y.id != v?.id).reduce((a: Template | undefined, v: Template) => a = (!a ? v : (a.unidade_id?.length ? a : v)), undefined);
      let result = (v?._status != "DELETE" ? v : undefined) || s || new Template({
        id: x.codigo,
        conteudo: x.template,
        especie: "NOTIFICACAO",
        codigo: x.codigo,
        titulo: x.descricao,
        dataset: x.dataset,
        entidade_id: null,
        unidade_id: null,
      });
      return Object.assign(result, {_metadata: {notificar: !(naoNotificar || []).includes(x.codigo)}});
    });
  }

  public buildNotificar(config: NotificacoesConfig): Notificar[] {
    //(a[v.codigo] = config.nao_notificar.includes(v.codigo), a)
    return this.notificacoes.map(x => new Notificar({
      codigo: x.codigo,
      descricao: x.descricao,
      notifica: !(config.nao_notificar || []).includes(x.codigo)
    })); //.reduce((a: IIndexable, v: TemplateNotificacao) => Object.assign(a, {[v.codigo]: config.nao_notificar.includes(v.codigo)}), {} as IIndexable)
  }

}
