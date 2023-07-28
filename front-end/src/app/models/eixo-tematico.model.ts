import { Base } from './base.model';
export class EixoTematico extends Base {
    public nome: string = ""; //Nome do eixo temático;
    public icone: string = ""; /* Classe do icone relacionado ao eixo temático */
    public cor: string = ""; /* Código da cor em hex */
    public descricao: string = ""; /* Descrição do eixo temático */

    public constructor(data?: any) { super(); this.initialization(data); }
}