import { Base } from './base.model';
import { Entidade } from './entidade.model';
import { Unidade } from './unidade.model';
import { DocumentoEspecie } from "./documento.model";
import { TemplateDataset } from '../modules/uteis/templates/template.service';

export type TemplateEspecie = DocumentoEspecie;

export class Template extends Base {
  public entidade?: Entidade;
  public unidade?: Unidade;

  public codigo: string | null = null;
  public numero: number = 0;
  public especie: TemplateEspecie = "OUTRO";
  public titulo: string = "";
  public conteudo: string = "";
  public dataset: TemplateDataset[] = [];

  public entidade_id: string | null = null;
  public unidade_id: string | null = null;

  public constructor(data?: any) { super(); this.initialization(data); }
}
