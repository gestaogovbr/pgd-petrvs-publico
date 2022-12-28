import { IIndexable } from "./base.model";

export type Turno = {
    data?: Date;
    sem?: boolean;
    inicio: string;
    fim: string;
}

export class Expediente {
    [key: string]: any; /* Permitir acesso como array indexavel */
    public domingo: Turno[] = [];
    public segunda: Turno[] = [];
    public terca: Turno[] = [];
    public quarta: Turno[] = [];
    public quinta: Turno[] = [];
    public sexta: Turno[] = [];
    public sabado: Turno[] = [];
    public especial: Turno[] = [];

    public constructor(value?: IIndexable) {
        if(value) Object.assign(this, value);
    }
}
