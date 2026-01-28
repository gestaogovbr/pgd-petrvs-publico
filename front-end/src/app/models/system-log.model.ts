import { Base } from './base.model';

export class SystemLog extends Base {
  public filename?: string;
  public size?: number;
  public last_modified?: Date;
  public path?: string;

  public constructor(data?: any) {
    super();
    this.initialization(data);
  }
}
