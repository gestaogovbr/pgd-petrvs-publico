import { Base } from './base.model';
import { Adesao } from './adesao.model';
import { Usuario } from './usuario.model';


export class AdesaoUsuario extends Base {
    public adesao?: Adesao;
    public usuario?: Usuario;

    public usuario_id: string = "";
    public programa_adesao_id: string = "";
    
    public constructor(data?: any) { super(); this.initialization(data); }
}
