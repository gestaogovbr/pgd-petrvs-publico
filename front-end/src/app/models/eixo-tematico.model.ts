import { Base } from './base.model';

export class EixoTematico extends Base {
    public nome: string = ""; //Nome do eixo temático;

    public constructor(data?: any) { super(); this.initialization(data); }
}