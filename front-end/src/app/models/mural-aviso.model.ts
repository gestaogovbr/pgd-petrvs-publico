import { Base } from './base.model';

export class MuralAviso extends Base {
  public titulo: string = "";
  public conteudo: string = "";
  public destinatario: string = "TODOS";
  public tenant_id: string | null = null;
  public remetente_tipo: string = "";
  public remetente_tenant_id: string | null = null;
  public publicado_por_user_panel_id: number = 0;
  public data_publicacao: Date = new Date();
  public data_expiracao: Date;

  public constructor(data?: any) {
    super();
    let expiracao = new Date(this.data_publicacao);
    expiracao.setDate(expiracao.getDate() + 30);
    this.data_expiracao = expiracao;
    this.initialization(data);
  }

  [key: string]: any;
}
