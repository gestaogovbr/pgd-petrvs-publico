import { Base } from './base.model';

export class RelatorioUnidade extends Base {
    public id: string = "";
    public unidadeHierarquia: string = "";
    public nome: string = "";
    public codigo: string = "";
    public instituidora: 'Sim' | 'Não' = 'Não';
    public executora: 'Sim' | 'Não' = 'Não';
    public peVigenteId: string | null = null;
    public peVigenteNome: string | null = null;
    public chefiaId: number | null = null;
    public chefiaNome: string | null = null;
    public totalVinculados: number = 0;
    public totalSubstitutos: number = 0;
    public totalDelegados: number = 0;

    public constructor(data?: any) { super(); this.initialization(data); }
}
