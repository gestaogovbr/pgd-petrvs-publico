import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { Usuario } from './usuario.model';

export type AtribuicaoTipo = "AVALIADOR_PLANO_ENTREGA" | "AVALIADOR_PLANO_TRABALHO" | "HOMOLOGADOR_PLANO_ENTREGA" | "LOTADO" | "COLABORADOR" | "GESTOR" | "GESTOR_SUBSTITUTO";

export class Atribuicao extends Base {
    public atribuicao: AtribuicaoTipo = "COLABORADOR";

    public unidade_usuario_id: string = ""; /* ID da Unidade x Usuário */

    public constructor(data?: any) { super(); this.initialization(data); }
}