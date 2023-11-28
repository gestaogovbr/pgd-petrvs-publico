import { ExpressionStatement } from '@angular/compiler';
import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export type QuestionarioTipo = "INTERNO" | "PERSONALIZADO";

export class Questionario extends Base {
    public tipo: QuestionarioTipo = "INTERNO"; //Tipo interno | personalizado
    public nome: string = ""; //Nome do questionário
    public codigo: string = ""; // Código do questionario
    public versao: number | undefined; //Perguntas do questionário

    public constructor(data?: any) { super(); this.initialization(data); }
}
