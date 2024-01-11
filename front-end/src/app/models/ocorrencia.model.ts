import { Base } from './base.model';
import { PlanoTrabalho } from './plano-trabalho.model';
import { Usuario } from './usuario.model';

export class Ocorrencia extends Base {
    public usuario?: Usuario;
    public plano_trabalho?: PlanoTrabalho;

    public data_inicio: Date = new Date();
    public data_fim: Date = new Date();
    public descricao: string = "";

    public usuario_id: string = "";
    public plano_trabalho_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}