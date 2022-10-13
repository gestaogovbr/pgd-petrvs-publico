export type Turno = {
    data?: Date;
    inicio: string;
    fim: string;
}

export class Expediente {
    public domingo: Turno[] = [];
    public segunda: Turno[] = [];
    public terca: Turno[] = [];
    public quarta: Turno[] = [];
    public quinta: Turno[] = [];
    public sexta: Turno[] = [];
    public sabado: Turno[] = [];
    public especial: Turno[] = [];
}
