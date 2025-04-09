import { Base, IntegranteAtribuicao } from './base.model';
import { UnidadeIntegranteAtribuicao } from './unidade-integrante-atribuicao.model';
import { Unidade } from './unidade.model';
import { Usuario } from './usuario.model';

export class IntegranteConsolidado extends Base {
    public id: string = ""; /* Utilizado somente para garantir o funcionamento do grid */
    public usuario_id?: string;
    public usuario_nome?: string;
    public usuario_apelido?: string;
    public usuario_url_foto?: string;
    public unidade_id?: string;
    public unidade_nome?: string;
    public unidade_sigla?: string;
    public unidade_codigo?: string;
    public atribuicoes: IntegranteAtribuicao[] = [];
    public usuario_externo: boolean = false;

    public constructor(data?: any) { super(); this.initialization(data); }
};

export class UnidadeIntegrante extends Base {
    public unidade?: Unidade;
    public usuario?: Usuario;
    public lotado?: UnidadeIntegranteAtribuicao; 
    public gestor?: UnidadeIntegranteAtribuicao; 
    public gestor_substituto?: UnidadeIntegranteAtribuicao; 
    public gestor_delegado?: UnidadeIntegranteAtribuicao; 
    public homologador_plano_entrega?: UnidadeIntegranteAtribuicao; 
    public avaliador_plano_entrega?: UnidadeIntegranteAtribuicao; 
    public avaliador_plano_trabalho?: UnidadeIntegranteAtribuicao; 
    public atribuicoes: UnidadeIntegranteAtribuicao[] = [];
    
    public usuario_id: string = ""; /* Usuário vinculado */
    public unidade_id: string = ""; /* Unidade Vinculada */
    
    public constructor(data?: any) { super(); this.initialization(data); }
}


 