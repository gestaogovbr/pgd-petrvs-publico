import { Base } from './base.model';
import { Unidade } from './unidade.model';

import { Adesao } from './adesao.model';


export class AdesaoUnidade extends Base {
    public adesao?: Adesao;
    public unidade?: Unidade;

    public unidade_id: string = "";
    public programa_adesao_id: string = "";
    
    public constructor(data?: any) { super(); this.initialization(data); }
}
