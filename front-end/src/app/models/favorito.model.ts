import { Base } from './base.model';
import { Usuario } from './usuario.model';

export class Favorito extends Base {
    public usuario?: Usuario;

    public config: any[] = []; 
    public usuario_id: string = "" 

    public constructor(data?: any) { super(); this.initialization(data); }
}
