import { Base } from './base.model';
import { UnidadeIntegranteAtribuicao } from './unidade-integrante-atribuicao.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class UnidadeIntegranteConsolidado {
    public usuario?: Usuario;
    public id: string = ""; /* Utilizado somente para garantir o funcionamento do grid */
    public usuario_id: string = "";
    public atribuicoes: string[] = [];
};

export class UsuarioIntegranteConsolidado {
    public unidade?: Unidade;
    public id: string = ""; /* Utilizado somente para garantir o funcionamento do grid */
    public unidade_id: string = "";
    public atribuicoes: string[] = [];
};

export class UnidadeIntegrante extends Base {
    public unidade?: Unidade;
    public usuario?: Usuario;
    
    public usuario_id: string = ""; /* Usuário vinculado */
    public unidade_id: string = ""; /* Unidade Vinculada */
    public atribuicoes: UnidadeIntegranteAtribuicao[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }

}


 