import { Base } from './base.model';
import { Entidade } from './entidade.model';


export class EntidadeEmail extends Base {
    public entidade?: Entidade;
    public email: string = "";
  
    public constructor(data?: any) { super(); this.initialization(data); }
}