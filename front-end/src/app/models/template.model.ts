import { Base } from './base.model';
import { Entidade } from './entidade.model';
import { Unidade } from './unidade.model';
import { Documento, DocumentoEspecie } from "./documento.model";
import { Usuario } from "./usuario.model";
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';

export type TemplateEspecie = DocumentoEspecie;

export class Template extends Base {

  public conteudo: string = "";
  public numero: number = 0;
  public especie: TemplateEspecie = "OUTRO";
  public titulo: string = "";
  public dataset: TemplateDataset[] = [];
  public data_inicio: Date = new Date();
  public data_fim: Date | null = null;

  public constructor(data?: any) { super(); this.initialization(data); }
}
