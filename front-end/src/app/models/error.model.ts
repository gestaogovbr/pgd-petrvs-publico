import { Base } from './base.model';

export class Error extends Base {

    public user: string = "";       //Dados do Usuário que criou o registro
    public date_time: string = "";  //Data e Hora que o registro foi criado
    public message: string = "";    //Mensagem da ocorrência
    public data: string = "";       //Dados da ocorrência
    public trace: string = "";      //Trace da ocorrência
    public type: string = "ERROR";  //Tipo da ocorrência ['ERROR', 'WARNING', 'FRONT-WARNING', 'FRONT-ERROR']


    constructor(){
        super();
    }
}
