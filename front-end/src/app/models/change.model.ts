import { Base } from './base.model';

export class Change extends Base {

    public date_time: string = "";      //Data e Hora em que o registro foi criado
    public table_name: string = "";     //Nome da tabela
    public row_id: string = "";         //ID do registro alterado
    public type: string = "";           //Tipo de Operação realizada no registro ["ADD", "EDIT", "DELETE"]
    public delta: any[] = [];          //Alterações realizadas

    constructor(){
        super();
    }
}
