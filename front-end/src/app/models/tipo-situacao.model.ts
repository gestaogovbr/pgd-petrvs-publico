import { Base } from './base.model';

export class TipoSituacao extends Base {
    public nome: string = ""; /* Nome da situação */

    public constructor(data?: any) { super(); this.initialization(data); }
}
