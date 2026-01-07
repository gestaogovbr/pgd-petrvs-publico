import { Base } from './base.model';

export class SiapeBlacklistUnidade extends Base {
  public codigo: string = '';
  public inativado: boolean = false;

  public constructor(data?: any) {
    super();
    this.initialization(data);
  }
}