import {Base} from './base.model';
import {Entidade} from './entidade.model';
import {Unidade} from './unidade.model';
import {Documento} from "./documento.model";
import {Usuario} from "./usuario.model";
import { TemplateDataset } from '../components/input/input-editor/input-editor.component';

export class Template extends Base {

  public unidade?: Unidade;
  public usuario?: Usuario;

  public conteudo: string = "";
  public numero: number = 0;
  public tipo: string = "TCR";
  public data_set: TemplateDataset[] = [];
  public data_inicio = new Date();
  public titulo: string = "";
  public usuario_id: string = "";
  public unidade_id: string = "";

  public constructor(data?: any) {super();this.initialization(data);}
}
