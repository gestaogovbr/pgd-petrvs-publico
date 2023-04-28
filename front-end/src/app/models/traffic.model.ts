import { Base } from './base.model';

export class Traffic extends Base {

    public user_id: string = "";      //ID do Usuário que criou o registro
    public date_time: string = "";    //Data e Hora que o registro foi criado
    public url: string = "";          //URL solicitada na requisição
    public request: string = "";      //Dados da requisição
    public response: string = "";     //Dados da resposta

    constructor(){
        super();
    }
}
