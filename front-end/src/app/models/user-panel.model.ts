import { Base } from './base.model';

export class UserPanel extends Base {
  public email: string = "";
  public nome: string = "";
  public cpf: string = "";
  public nivel: number = 1;
  public email_verified_at?: Date;
}