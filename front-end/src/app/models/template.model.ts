import {Base} from './base.model';
import {Entidade} from './entidade.model';
import {Unidade} from './unidade.model';
import {Documento} from "./documento.model";

export type TemplateFieldType = "VALUE" | "OBJECT" | "ARRAY";

export type TemplateDataset = {
  field: string,
  label: string,
  type: TemplateFieldType,
  fields?: TemplateDataset[]
}



export class Template extends Base {

  public conteudo: string = "";
  public numero: number = 0;
  public tipo: string = "TCR";
  public data_set: TemplateDataset[] = [];
  public data_inicio = new Date();
  public titulo: string = "";

  public constructor(data?: any) {super();this.initialization(data);}
}
